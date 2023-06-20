import Image from "next/image";
import Icons from '../../public/assets/icons/rrss/';
export default function ContactMain(){
    const iconsArray = Object.entries(Icons).map(([key, value]) => ({ key, value }));
    return (
        <div className="w-full lg:h-screen p-2">
        <div className=" max-w-[1240px] mx-auto flex flex-col justify-center h-full mt-[8rem] text-center">
            <h1 className="uppercase text-4xl font-bold"> Contacto</h1>
            <p className="my-4 p-5 text-lg">Contáctame por medio de mis redes sociales:</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {iconsArray.map((icon)=>
                  <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-100 bg-[#0e122a]" key={icon.key}>
                      <div className='flex flex-col items-center justify-center text-center 'key={icon.key}>
                        <div key={icon.key}>
                          <Image  key={icon.key} src={icon.value} alt={icon.key} className="min-[300px]:w-[80px] sm:w-[100px] lg:w-[200px]"/>
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