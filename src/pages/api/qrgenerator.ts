// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Decipher, createHash } from 'crypto';
import { decrypt } from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next'
import { textSpanOverlap } from 'typescript';


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') {
        res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
        return;
    }

    const body = req.body;
    const { type, text, env } = body;
    // if (!type || typeof type != "string" || !!text || typeof text != "string") {
    //     res.status(400).json({ error: 'Petición inválida. Verifica los campos enviados.' });
    //     return;
    // }
    //caso de pagina web
    const encrypted = createHash("sha256");
    encrypted.update(text);
    const textEncrypted = encrypted.digest('hex');
    const url = env == "dev" ? "localhost:3000" : "https://josesilvadev.vercel.app";
    if (type == '1') {
        const textSinEspacios = text.replace(/ /g, "%20");
        res.json(`${url}/qr?hash=${textEncrypted}&g=${textSinEspacios}`);
    } else {
        //TODO casos para crear pdfs
    }
}
