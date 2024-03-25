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
                   if(accessToken && IP) {
                    const response = await fetch(`https://secure.snd.payu.com/api/v2_1/orders`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            totalAmount: 123000,
                            customerIp: `${IP}`,
                            merchantPosId: process.env.NEXT_PUBLIC_POSID || '',
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
                    if (response.status === 302) {
                        const data = await response.json()
                        console.log(`DATA: `, data)
                        res.json({ data })
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