// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const apps = [
        {
            "name":"Itsuki Engine",
            "id":1,
            "description":"App movil que ocupa api trace.moe para el reconocimiento de imágenes",
            "tags":["Android", "React Native"],
            "imgSrc":"/assets/pictures/portafolio.png"
        },
        {
            "name":"Todo List",
            "id":2,
            "description":"Web app sencilla que realiza una lista de tareas ,mostrando las pendientes y realizadas",
            "tags":["Express", "React"],
            "imgSrc":"/assets/pictures/portafolio.png"
        },
        {
            "name":"Portafolio personal",
            "id":3,
            "description":"Página web personal que muestra información sobre mi y de mis experiencia como desarrollador.",
            "tags":["Web", "NextJs","React"],
            "imgSrc":"/assets/pictures/portafolio.png"
        },
        {
            "name":"Todo List",
            "id":4,
            "description":"Web app sencilla que realiza una lista de tareas ,mostrando las pendientes y realizadas",
            "tags":["Express", "React"],
            "imgSrc":"/assets/pictures/portafolio.png"
        }
       
    ];
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido. Utiliza GET.' });
    return;
  }
  res.status(200).json({succes:'aprobado',apps: apps});


}
