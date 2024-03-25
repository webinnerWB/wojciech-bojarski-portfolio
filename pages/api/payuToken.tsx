import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const response = await fetch(`https://secure.snd.payu.com/pl/standard/user/oauth/authorize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID || '',
            client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
            grant_type: 'client_credentials',
          }).toString(),
        })
  
        const data = await response.json()
        res.status(200).json(data)
      } catch (error) {
        console.error('Error fetching PayU token:', error)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    }
  }
  