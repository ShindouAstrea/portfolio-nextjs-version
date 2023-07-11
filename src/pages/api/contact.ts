// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
    return;
  }
  const body = req.body;
  const{email,subject,message} = body ;
  if(!email || typeof email !== 'string' || !subject || typeof subject !== 'string' || !message || typeof message !== 'string')  { 
    res.status(400).json({ error: 'Petición inválida. Verifica los campos enviados.' });
    return;
  }
  res.status(200).json({succes:'aprobado'});


}
