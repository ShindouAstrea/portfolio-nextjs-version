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
            "imgSrc":"/assets/projects/itsukiEngine.png",
            "github":"https://github.com/ShindouAstrea/itsuki-engine-app"
        },
        {
            "name":"Todo List",
            "id":2,
            "description":"Web app sencilla que realiza una lista de tareas ,mostrando las pendientes y realizadas",
            "tags":["Redux", "React"],
            "imgSrc":"/assets/projects/picture.png",
            "github":"https://github.com/ShindouAstrea/frontend-junior-challenge-react"
        },
        {
            "name":"Portafolio personal",
            "id":3,
            "description":"Página web personal que muestra información sobre mi y de mis experiencia como desarrollador.",
            "tags":["Web", "NextJs","TypeScript"],
            "imgSrc":"/assets/projects/portafolio.png",
            "github":"https://github.com/ShindouAstrea/portfolio-nextjs-version"
        },   
        {
          "name": "Hanayome Chat",
          "id":4,
          "description":" Aplicación  móvil que simula el chat con ciertos personajes gracias a la API yesno.wtf , enviando si o no junto con un gif como respuesta",
          "tags":["Flutter","Dart","Android","App"],
          "imgSrc":"/assets/projects/hanayome_icon1.png",
          "github":"https://github.com/ShindouAstrea/hanayome_chat"
        }
    ];
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Método no permitido. Utiliza GET.' });
    return;
  }
  res.status(200).json({succes:'aprobado',apps: apps});


}
