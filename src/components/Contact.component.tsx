import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';
import Icons from '../../public/assets/icons/rrss/';
import { toast } from 'react-toastify';
function bindLink(key: string) {
  switch (key) {


    case 'Gmail':
      return 'mailto:jose.silva.a@mail.pucv.cl'

    case 'Git':
      return 'https://github.com/ShindouAstrea';

    case 'Linkedin':
      return 'https://www.linkedin.com/in/josesilvaaraneda/';

    case 'X':
      return 'https://twitter.com/josebastian_';
  }
}
export default function ContactMain() {
  const [email, setEmail] = React.useState({});
  const iconsArray = Object.entries(Icons).map(([key, value]) => ({ key, value, link: bindLink(key) }));

  return (
    <div className="w-full lg:h-screen p-2">
      <div className='max-w-[1240px] mx-auto flex flex-col px-4 justify-center h-full mt-[8rem] text-center'>
        <h1 className="uppercase text-4xl font-bold"> Contacto</h1>
        <p className="my-4 p-5 text-2xl">Contáctame por medio de mis redes sociales:</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:mb-32 min-[300px]:mb-16">
          {iconsArray.map((icon, index) =>
            <React.Fragment key={icon.key}>
              <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-100 bg-[#1A1F36]">
                <div className='flex flex-col items-center justify-center text-center cursor-pointer ' >
                  <a href={icon.link} target="_blank" rel="noopener noreferrer">
                    <div key={index}>
                      <Image src={icon.value} alt={icon.key} className="min-[300px]:w-[80px] sm:w-[100px] lg:w-[200px]" />
                      <h3>{icon.key}</h3>
                    </div>
                  </a>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
