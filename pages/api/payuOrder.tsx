import { NextApiRequest, NextApiResponse } from 'next'

const $generationAccessToken = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/payuToken', {
          method: 'POST',
        })
    
        const data = await response.json()
        console.log('TOKEN: ', data.access_token)
        return data.access_token
      } catch (err) {
        console.error('Error: ', err)
      }
}


const $getIPCustomer = async () => {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          return data.ip
        } catch (error) {
          console.error('Error fetching IP address:', error);
        }
}

export default async function handlerOrder(req: NextApiRequest, res: NextApiResponse) {
        if(req.method === 'POST') {
            try {
                const accessToken = await $generationAccessToken()
                const IP = await $getIPCustomer()
                    console.log(`accessToken22: `,accessToken)
                   if(accessToken) {
                    const response = await fetch(`https://secure.snd.payu.com/api/v2_1/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            totalAmount: 123000,
                            customerIp: '127.0.0.1',
                            merchantPosId: '477257',
                            currencyCode: 'PLN',
                            description: 'Zamówienie Testowe',
                            products: [
                                {
                                    name: 't1',
                                    unitPrice: '120',
                                    quantity: '1'
                                },
                                {
                                    name: 't2',
                                    unitPrice: '140',
                                    quantity: '2'
                                },
                                {
                                    name: 't3',
                                    unitPrice: '150',
                                    quantity: '3'
                                },
                            ]
                        }),
                        redirect: 'manual'
                    })
                    if(response.ok) {
                        console.log(`response: `, response.status)
                        const data = await response.json()
                        res.json(data.json())
                    }else if (response.status === 302) {
                        // W przypadku przekierowania, zwróć docelowy URL
                        const redirectUrl = response.headers.get('Location');
                        console.log('Redirect URL:', redirectUrl);
                        res.json({ redirectUrl });
                    }else{
                        console.log(`response: `, response.status)
                        res.status(response.status)
                        throw new Error('Failed to create order');
                    }

                   }
            } catch(err) {
                console.error(`Error: `, err)
                res.json({error: `${err}`})
            }
        }
}


// export default async function handlerOrder(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try {
//             const accessToken = await $generationAccessToken()

//           const response = await fetch('https://secure.payu.com/api/v2_1/orders', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify({
//             //   notifyUrl: 'http://localhost:3000/store',
//               customerIp: '127.0.0.1',
//               merchantPosId: '477257',
//               description: 'New order description TEST',
//               currencyCode: 'PLN',
//               totalAmount: '100', // Total amount in cents
//               products: [
//                 {
//                   name: 'Product 1',
//                   unitPrice: '100', // Unit price in cents
//                   quantity: '1',
//                 },
//               ],
//             //   continueUrl: 'http://localhost:3000/store',
//               buyer: {
//                 email: 'buyer@example.com',
//               },
//             }),
//           });
    
//           if (response.ok) {
//             const data = await response.json();
//             const orderId = data.orderId;
//             res.status(201).json({ orderId });
//           } else {
            // console.log(`response: `, response.status)
            // res.status(response.status)
            // throw new Error('Failed to create order');
//           }
//         } catch (error) {
//           console.error('Error creating order:', error);
//           res.json({ error: 'Error creating order' });
//         }
//       }
// }