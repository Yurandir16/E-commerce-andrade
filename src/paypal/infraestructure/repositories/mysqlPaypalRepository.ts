import { paypalRepository } from "../../domain/respositories/paypalRepository";
import https from 'https';
import { query } from "../../../database/connection";

export class PaypalRepositoryr implements paypalRepository {
    // async createPayment(payment: PaymentData): Promise<Payment | null> {
    //     let conn;
    //     try {
    //         conn = await pool.getConnection();

    //         const formattedDate = format(new Date(payment.payment_date), 'yyyy-MM-dd HH:mm:ss');
    //         console.log("Conexión exitosa a la BD");
    //         const query = "INSERT INTO Payment (id, amount, payment_date, status, token, metaData, id_contract, id_payment_method, id_card, id_user) VALUES (?,?,?,?,?,?,?,?,?,?)";
    //         const result = await conn.query(query, [payment.id, payment.amount, formattedDate, payment.status, payment.token, JSON.stringify(payment.metaData), payment.id_contract, payment.id_payment_method, payment.id_card, payment.id_user]);
    //         console.log(query);
    //         if (result.affectedRows > 0) {
    //             return payment;
    //         } else {
    //             return null;
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     } finally {
    //         if (conn) {
    //             conn.release(); // Devuelve la conexión al pool al finalizar
    //         }
    //     }
    // }

    async createPaypal(uuid:string): Promise<any | null> {
        const client = process.env.CLIENT_SECRET
        const secret = process.env.SECRET_KEY
        const host = process.env.HOST_API
        try {
            console.log("Conexión exitosa a la BD");
            if (uuid!=null) {
                const sql = `SELECT  p.price
                FROM cartShopping cs JOIN user u ON cs.user_id = u.uuid JOIN products p ON cs.product_id = p.id
                WHERE u.uuid = ?;	
              `;
                const result = await query(sql, [uuid]);
                console.log(query);

                if (result.length > 0) {
                    const amount = result[0].amount;
                    const body = {
                        intent: 'CAPTURE',
                        purchase_units: [{
                            amount: {
                                currency_code: 'MXN',
                                value: amount 
                            }
                        }],
                        application_context: {
                            brand_name: `ANDRADE TECNOLOGY THAT INSPIRES`,
                            landing_page: 'NO_PREFERENCE',
                            user_action: 'PAGO DE PRODUCTOS',
                            return_url: `http://localhost:3000/Paypal/extracter_payment`,
                            cancel_url: `http://localhost:3000/cancel-payment`
                        }
                    };

                    const options = {
                        hostname: host,
                        port: 443,
                        path: '/v2/checkout/orders',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic ' + Buffer.from(`${client}:${secret}`).toString('base64')
                        }
                    };
                    return new Promise((resolve, reject) => {
                        const req = https.request(options, (res) => {
                            let data = '';

                            res.on('data', (chunk) => {
                                data += chunk;
                            });

                            res.on('end', () => {
                                resolve(JSON.parse(data));
                            });
                        });

                        req.on('error', (error) => {
                            console.error(error);
                            reject(null);
                        });

                        req.write(JSON.stringify(body));
                        req.end();
                    });
                } else {
                    return null;
                }
            }
        } catch (error) {
            console.log(error);
            return null;
        } //finally {
        //     if (query) {
        //         query.release(); // Devuelve la conexión al pool al finalizar
        //     }
        // }

    }

    async getPaypal(token: string): Promise<any | null> {

        const client = process.env.CLIENT_SECRET
        const secret = process.env.SECRET_KEY
        const host = process.env.HOST_API

        const options = {
            hostname: host,
            port: 443,
            path: `/v2/checkout/orders/${token}/capture`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${client}:${secret}`).toString('base64')
            }
        };
        return new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            req.on('error', (error) => {
                console.error(error);
                reject(null);
            });

            req.write(JSON.stringify({}));
            req.end();
        });
    }
}
