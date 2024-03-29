import { NextApiRequest, NextApiResponse } from "next";
const $generationAccessToken = async() => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payuToken`, {
          method: 'POST',
        })
    
        const data = await response.json()
        return data.access_token
      } catch (err) {
        console.error('Error: ', err)
      }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const { orderId } = req.query
        const token = await $generationAccessToken()
        try {
            const response = await fetch(`https://secure.snd.payu.com/api/v2_1/orders/${orderId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                redirect: 'manual'
            })
            const data = await response.json()
            res.json(data)
        } catch(err) {
            console.error(`Error: `, err)
        }
    }else{
        res.setHeader('Allow', ['GET'])
        res.status(405).json({error: `Method ${req.method} Not Allowed`})
    }
}