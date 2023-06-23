import React from 'react';
import Image from "next/image";
import Icons from '../../public/assets/icons/rrss/';
function bindLink(key: string){
  console.log(key);
  switch(key){
    case 'Gmail':
      return 'mailto:jose.silva.a@mail.pucv.cl'
      
    case 'Git':
      return 'https://github.com/ShindouAstrea';
     
    case 'Linkedin':
      return 'https://www.linkedin.com/in/josesilvaaraneda/';
      
    case 'Twitter':
      return 'https://twitter.com/josebastian_';
  }
}
export default function ContactMain(){
    const formHandler = (event: React.MouseEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const form = event.currentTarget  ;
      const data = new FormData(form) ;
      const formJson = Object.fromEntries(data.entries());
      console.log(formJson);
    }
    const iconsArray = Object.entries(Icons).map(([key, value]) => ({ key, value,link:bindLink(key) }));
    return (
        <div className="w-full lg:h-screen p-2">
          <div className=" max-w-[1240px] mx-auto flex flex-col justify-center h-full mt-[8rem] text-center">
              <h1 className="uppercase text-4xl font-bold"> Contacto</h1>
          
           
            <p className="my-4 p-5 text-lg">Contáctame por medio de mis redes sociales:</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {iconsArray.map((icon,index)=>
                <>
                  
                  <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-100 bg-[#0e122a]" key={`${index}-${icon.key}`}>

                    <div className='flex flex-col items-center justify-center text-center cursor-pointer 'key={`${icon.key}-${index}-${index}`}>
                    <a  key={`${icon.key}-${icon.key}`} href={icon.link} target="_blank" rel="noopener noreferrer" >
                        <div key={icon.key}>
                          <Image  key={icon.key} src={icon.value} alt={icon.key} className="min-[300px]:w-[80px] sm:w-[100px] lg:w-[200px]"/>
                          <h3 key={`${icon.key}-${icon.key}-${icon.key}`}>{icon.key}</h3>
                        </div>
                    </a>
                     
                    </div>
                  </div>
                </>
                )}
              </div>
          <div className="my-4 flex flex-col justify-center items-center">
            <p className="my-4 p-5 text-lg"> o puedes escrbirme directamente y cuando sea posible te respondo :</p>
            <form method="Post" aria-labelledby='Formulario de contacto' onSubmit={formHandler}>
              <div className="my-4 lg:w-50 "aria-labelledby='formulario correo'>
                <input name="mailInput"type="email" autoComplete="FALSE" className="w-full h-14 "aria-label='entrada-correo'placeholder='Correo'/>
              </div>
              <div  className="my-4 lg:w-[500px]  "aria-labelledby="formulario-asunto">
                <input name="subjectInput"type="text"  autoComplete="TRUE"className="w-full h-14"aria-label='entrada-asunto'placeholder='Asunto'/>
              </div>
              <div  className="my-4 lg:w-[500px]"aria-labelledby='formulario mensaje'>
                <textarea name="messageInput"   rows={10} cols={10} autoComplete="FALSE"className="w-full bg-slate-800 border-b-2 border-slate-600 outline-none text-white p-6 resize-none"aria-label='entrada-mensaje'placeholder='Mensaje'/>
              </div>
              <div aria-labelledby="boton-envio-formulario" className='lg:w-50'>
                <button type="submit" aria-label="Boton para enviar" className="w-full h-14 bg-[#087EA4] "> Enviar</button>

              </div>
            </form>

          </div>
        </div>
    </div> 
    )
}