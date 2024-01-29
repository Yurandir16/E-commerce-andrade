import { paypalRepository } from "../../domain/respositories/paypalRepository";
import https from 'https';
import { query } from "../../../database/connection";

export class PaypalRepositoryr implements paypalRepository {
    async createPaypal(uuid:string): Promise<any | null> {
        const client = process.env.CLIENT_SECRET
        const secret = process.env.SECRET_KEY
        const host = process.env.HOST_API
    
        try {
            console.log("Conexión exitosa a la BD");
            if (uuid!=null) {
                const sql = `SELECT  SUM(p.price)
                FROM cartShopping cs JOIN user u ON cs.user_id = u.uuid JOIN products p ON cs.product_id = p.id
                WHERE u.uuid = ?;	
              `;
                const result = await query(sql, [uuid]);
                
                console.log(result)

                if (result.length > 0) {
                    const amount = result[0][0]['SUM(p.price)'];

                    if (typeof amount !== 'undefined') {
                        console.log(amount)
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
                                user_action: 'PAY_NOW',
                                return_url: `http://localhost:3000/paypal/extracter_payment/`,
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
                        console.error('Amount is undefined');
                        return null; 
                    }    
                } else {
                    return null;
                }
            }
        } catch (error) {
            console.log(error);
            return null;
        } 
    }

    async viewPaypal(token: string): Promise<any | null> {

        const client = process.env.CLIENT_SECRET
        const secret = process.env.SECRET_KEY
        const host = process.env.HOST_API

        console.log("entro en viewpaypal")

        try {
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
                        console.log(data)

                        try {
                            const orderData = JSON.parse(data);
                    
                            const customerId = orderData.payment_source.paypal.account_id;
                            const givenName = orderData.payment_source.paypal.name.given_name;
                            const surname = orderData.payment_source.paypal.name.surname;
                            const emailAddress = orderData.payment_source.paypal.email_address;
                            const countryCode = orderData.payment_source.paypal.address.country_code;
                            const addressLine1 = orderData.purchase_units[0].shipping.address.address_line_1;
                            const addressLine2 = orderData.purchase_units[0].shipping.address.address_line_2;
                            const adminArea1 = orderData.purchase_units[0].shipping.address.admin_area_1;
                            const adminArea2 = orderData.purchase_units[0].shipping.address.admin_area_2;
                            const postalCode = orderData.purchase_units[0].shipping.address.postal_code;
                            const currencyCode = orderData.purchase_units[0].payments.captures[0].amount.currency_code;
                            const amount = orderData.purchase_units[0].payments.captures[0].amount.value;
                    
                            const insertQuery = `
                                INSERT INTO customer_data (
                                    customer_id, given_name, surname, email_address, country_code,
                                    address_line_1, address_line_2, admin_area_1, admin_area_2,
                                    postal_code, currency_code, amount
                                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `;
                    
                            const values = [
                                customerId, givenName, surname, emailAddress, countryCode,
                                addressLine1, addressLine2, adminArea1, adminArea2,
                                postalCode, currencyCode, amount
                            ];
                    
                            query(insertQuery, values);
                    
                            console.log('Datos del cliente insertados correctamente.');
                        } catch (error) {
                            console.error('Error al insertar datos del cliente:', error);
                            return null;
                        }
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
        } catch (error) {
            console.log(error);
            return null
        }
      
    }
}
