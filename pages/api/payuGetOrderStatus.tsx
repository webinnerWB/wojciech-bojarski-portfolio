import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
       try {
            const data = req.body.data
            res.json(data)
        } catch(err) {
            const data = req.body.data
            console.error(`Error: `, err)
            res.json(data)
        }
    }else{
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}