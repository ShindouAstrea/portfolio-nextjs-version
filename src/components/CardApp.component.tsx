import React from 'react';
import Image from 'next/image';
import { Aplication } from '@/models/interfaces';


function CardApp({ app }: { app: Aplication }) {
    return (
        <React.Fragment>
            <div className="p-6 shadow-xl rounded-xl bg-[#0e122a] hover:scale-105 ease-in duration-100 m-auto justify-center">
                <div className="flex flex-col h-full justify-between">
                    <div className="text-center">
                        <p className="my-1 text-white p-1 uppercase">{app.name}</p>
                        <Image src={app.imgSrc} alt={app.name} width={200} height={200} className="mx-auto p-2 mb-2" priority={true} />
                        {app['tags'].map((tag) => (
                            <span key={tag} className="bg-[#4a688c] rounded-lg text-white m-1 p-2">
                                {tag}
                            </span>
                        ))}
                        <p className="p-1 m-2">{app.description}</p>
                    </div>
                    <div className="text-center mb-2">
                        <a target="_blank"type="button" aria-label="Enlace de github"href={app.github}>
                            <button type="button" aria-label="Boton para enviar" className="w-52 rounded-md h-10 hover:scale-105 ease-in duration-100 bg-[#087EA4] justify-center text-center items-center mx-auto"> Ver Codigo</button>
                        </a>
                    </div>
                </div>
            </div>
        </React.Fragment>

    )

}
export default CardApp;