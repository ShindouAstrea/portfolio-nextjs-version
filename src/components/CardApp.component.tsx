import React from 'react';
import Image from 'next/image';
import { Aplication } from '@/models/interfaces';


function CardApp({app}:{app:Aplication}){
    return(
        <React.Fragment >
            <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-100 bg-[#0e122a]" >
            <div className='flex m-auto text-center justify-center'>
                <div className="justify-between">
                <p className="my-1 text-white p-1 uppercase">{app.name}</p>
                <Image src={app.imgSrc} alt={app.name} width={250} height={250} className="mb-1" priority={true} />
              
                {app["tags"].map((tag) =>
                  
                    <span key={tag} className=" bg-[#4a688c] rounded-lg text-white m-1 p-1">{tag}</span>
                   
                )}
                <p className='p-1 m-2'>{app.description}</p>
                </div>
            </div>
            </div>
      </React.Fragment>

    )

}
export default CardApp;