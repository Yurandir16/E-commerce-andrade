import { query } from "../../../database/connection";
import { ResponseLogin, User } from "../../domain/entities/user";
import { IUsuarioRepository } from "../../domain/repositories/userRepository";
import { compare, encrypt } from '../../../helpers/ashs';
import { tokenSigIn } from "../../../helpers/token";
import deleteFromFirebase from "../../../helpers/deleteImage";
import { MailNodemailerProvider } from "../../utils-adapters/nodemailer";

const mailProvider = new MailNodemailerProvider; 

export class MysqlUserRepository implements IUsuarioRepository {

    async registerUser(uuid: string, name: string, email: string, phone_number: string,password: string): Promise<User | null | string | Error> {
      
        try {
            // const hashPassword = await encrypt(password)
           
            let sql = "INSERT INTO user(uuid, name, email, phone_number , password ) VALUES (?, ?, ?, ?, ?)";
            const params: any[] = [uuid, name, email, phone_number, password];
            const [result]: any = await query(sql, params);
            return new User(uuid, name, email, phone_number , password,false);
        } catch (error) {
            console.error("Error adding review:", error);
            return error as Error;
        }
    }
    

    async getUserId(uuid:string): Promise<any> {
        try {
            console.log("Conexión exitosa a la BD");
            const sql = "SELECT * FROM user WHERE uuid = ?";
            const params: any[] = [uuid];
            console.log(sql);
            const [rows]: any = await query(sql, params);
            console.log(rows);
            if (rows[0]){
                return rows.map((row: any)=>({id:row.uuid,name:row.name, email:row.email, phone_number:row.phone_number, password:row.password}));

            }else{
                throw new Error('No se encontró ningún usuario');
            }
            

        } catch (error) {
            console.log("Error fetching restaurant:", (error as Error).message);
            throw new Error('Error al encontrar restaurant');
        }  
    }

    async loginUser(email: string, password: string): Promise<ResponseLogin  |string | null> {
        try {
            // Primero, obtener el usuario por email.
            const [users]: any = await query('SELECT * FROM user WHERE email = ? LIMIT 1', [email]);
          
            if (!users || users.length === 0) {
                return null
            }

            const user = users[0];
            console.log(user)
            // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos.
            const passwordMatches = await compare(password, user.password);
            console.log(passwordMatches) //pasar a la parte 
          

            if (!passwordMatches) {
                return 'Unauthorized'
            }
            const token:string = tokenSigIn(user.uuid,user.email)
            
            function hideEmail(email: string) {
                // Verifica que la cadena sea un email válida antes de realizar el reemplazo
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    const [username, domain] = email.split('@');
                    const hiddenUsername = username.slice(0, 2) + '*'.repeat(username.length - 4) + username.slice(-2);
                    return hiddenUsername + '@' + domain;
                } else {
                    // Si no es un email válido, devuelve la cadena original
                    return email;
                }
            }

            const hiddenemail:string = hideEmail(user.email)
            if(user.verified===0){
                // Envía el correo de bienvenida
                // Envía el correo de bienvenida
            const message = {
                to: {
                    name: user.name,
                    email: user.email,
                },
                from: {
                    name: 'Andrademex',
                    email: '193251@ids.upchiapas.edu.mx',
                },
                subject: 'Confirme su email',
                body: `
                    <p>Hola ${user.name},</p>
                    <p>Gracias por registrarte. Por favor, haga clic en el botón de abajo para verificar su dirección de correo electrónico:</p>
                    <a href="http://192.168.1.125:3000/user/verify/${user.uuid}">
                        <button style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">Verificar Email</button>
                    </a>
                    <p>Si el botón no funciona, también puede copiar y pegar el siguiente enlace en su navegador:</p>
                    <p>http://192.168.1.125:3000/user/verify/${user.uuid}</p>
                `,
            };

                await mailProvider.sendMail(message);

                return 'Verifique su email\nSe ha enviado un código de verificación a ' + hiddenemail;
                
                
            }

            const dataUser: ResponseLogin = new ResponseLogin(
                user.uuid,
                user.name,
                user.email,
                user.phone_number,
                token,
                user.verified
            )
           
            return dataUser;

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

 

    async updateUserById(uuid: string, name?: string, phone_number?: string, email?: string, img_url?:string): Promise<User | null> {
        const updates: { [key: string]: string } = {};
        console.log(img_url)
        if (name !== undefined) updates.name = name;
        if (phone_number !== undefined) updates.phone_number = phone_number;
        if (email !== undefined) updates.email = email;
        if (img_url !== undefined) {
            updates.img_url = img_url
        } 


        const keys = Object.keys(updates);
        if (keys.length === 0) return null; // No hay nada que actualizar.

        const sqlParts = keys.map(key => `${key} = ?`);
        const sql = `UPDATE users SET ${sqlParts.join(', ')} WHERE uuid = ?`;        
        try {
            const [imgUrlUser]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);
            console.log("imagen que se eliminara",imgUrlUser[0].img_url)
            const values = keys.map(key => updates[key]);
            values.push(uuid); // Añade el UUID al final del array de valores.
            await query(sql, values); // Ejecuta la consulta SQL.
          
            const [updatedRows]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);

            if (!updatedRows || updatedRows.length === 0) {
                throw new Error('No user found with the provided UUID.');
            }
            await deleteFromFirebase(imgUrlUser[0].img_url)
            const updatedUser = new User(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].email,
                updatedRows[0].phone_number,
                "",
                updatedRows[0].verified,
                
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }

    }

    async updatePassword(uuid: string, password: string): Promise<User | null> {
        try {
            // Asumiendo que 'password' ya está cifrado.
            const hashPassword = await encrypt(password)
            const sql = 'UPDATE user SET password = ? WHERE uuid = ?';
            const result: any = await query(sql, [hashPassword, uuid]);

            // Verificar si se actualizó alguna fila
            if (!result || result.affectedRows === 0) return null;

            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM user WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;

            const updatedUser = new User(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].phone_number,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].verified
            );

            return updatedUser;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    async verify(uuid:string): Promise<any | null> {
        try {
            // Asumiendo que 'password' ya está cifrado.
            const sql = 'UPDATE user SET verified = 1 WHERE uuid = ?';
            const result: any = await query(sql, [uuid]);

            // Verificar si se actualizó alguna fila
            if (!result || result.affectedRows === 0) return null;

            // Obtener el usuario actualizado
            const [updatedRows]: any = await query('SELECT * FROM user WHERE uuid = ?', [uuid]);
            if (updatedRows.length === 0) return null;

            const updatedUser = new User(
                updatedRows[0].uuid,
                updatedRows[0].name,
                updatedRows[0].phone_number,
                updatedRows[0].email,
                updatedRows[0].password,
                updatedRows[0].verified
            );

            return updatedUser;
        } catch (error) {
            console.error('Verifying error:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }


  



}