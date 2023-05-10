import Image from 'next/image';

import icons from '../../public/assets/icons/' ;

export default function SkillsMain(){
    const iconsArray = Object.entries(icons).map(([key, value]) => ({ key, value }));

    return(
        <div className="w-full lg:h-screen p-2">
            <div className=" max-w-[1240px] mx-auto flex flex-col justify-center h-full">
                <p> Habilidades</p>
                <h2>Con qué he trabajado?</h2>
                    <div className="grid md:grid-cols-2 my-5 lg:grid-cols-4 gap-8">
                    {iconsArray.map((icon)=>
                      <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-100 bg-[#0e122a]">
                          <div className='flex flex-col items-center justify-center text-center  '>
                            <div className='md:mx-2 max-w-[125px] max-h-[125px] ' >
                              <Image  key={icon.key} src={icon.value} alt={icon.key} />
                              <h2 className='p-5 mt-2 '>{icon.key}</h2>
                            </div>
                          </div>
                         
                      </div>
                  )}
                    </div>
                </div>
        </div>
    )
}