import Image from "next/image";
import Icons from '../../public/assets/icons/rrss/';
export default function ContactMain(){
    const iconsArray = Object.entries(Icons).map(([key, value]) => ({ key, value }));
    return (
        <div className="w-full lg:h-screen p-2">
        <div className=" max-w-[1240px] mx-auto flex flex-col justify-center h-full">
            <p> Contacto</p>
            <h2>Como puedes Contactarme?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {iconsArray.map((icon)=>
                  <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-100 bg-[#0e122a]">
                      <div className='flex flex-col items-center justify-center text-center '>
                        <div className='md:max-w-[100px]-max-h-[100px] lg:max-w-[250px]-max-h-[250px]'>
                          <Image  key={icon.key} src={icon.value} alt={icon.key} />
                          <h3>{icon.key}</h3>
                        </div>
                      </div>
                     
                  </div>
              )}
                </div>
            </div>
    </div> 
    )
}