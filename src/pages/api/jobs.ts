// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
require('dotenv').config()
const data: Array<object> = [
    {
        id: 1,
        title: "Práctica de desarrollador de Software",
        start: "Diciembre 2021",
        end: "Febrero 2022",
        tags: ["Javascript", "Php", "Laravel", "CodeIgniter 2", "Api Rest", "FTP"],
        description: "Implementación de botón de pago y gestor de archivos en CodeIgniter y Laravel respectivamente. Diseño e implementación del sitio web de la Consultora en Wordpress. Documentación de softwares de legado . Revisión de codigo y experiencia como consumidor de software ya existentes",
        company: "UAT PUCV"
    },
    {
        id: 2,
        title: "Asistente TI",
        start: "Marzo 2022",
        end: "Julio 2022",
        tags: ["Hardware", "Windows", "Software", "Mantenimiento"],
        description: "Gestión operacional de los servicios y productos TI al alcance de alumnado y profesorado.Mantenimiento de hardware de los equipos Ti. Configuración de red.Asistencia tecnica de los equipos Ti de la Facultad",
        company: "PUCV"
    },
    {
        id: 3,
        title: "Ingeniero de Desarrollo",
        start: "Agosto 2023",
        end: "Actualmente",
        tags: ["Javascript", "Php", "SQL", "Jquery", "Ajax", "Api Rest"],
        description: "Encargado del desarrollo de proyectos en Php junto con Javascript,Jquery y Ajax. Desarrollo y optimización de sentencias SQL para la interacción con la base de datos. Participación en actividades de revisión de codigo , para debugging y mejoras en el desarrollo de proyectos realizados",
        company: "CDGO"
    }
]
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'GET') {
        res.status(405).json({ error: 'Método no permitido. Utiliza GET.' });
        return;
    }


    res.status(200).json({ succes: 'aprobado', data: data });


}
