import Image from "next/image";
import Dev from '../../public/assets/pictures/';
// interface App {
//   name:string,
//   id:number,
//   img:string,
//   tags:string
// }

export default function ProjectsMain(){
  const iconsArray = Object.entries(Dev).map(([key, value]) => ({ key, value }));
    return (
        <div className="w-full lg:h-screen p-2">
        <div className=" max-w-[1240px] mx-auto flex flex-col justify-center h-full mt-[8rem] text-center">
            <h1 className="uppercase text-4xl font-bold"> Proyectos</h1>
            <p className="my-4 p-5 text-lg">Mira mis proyectos realizados  y por realizar: </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-100 bg-[#0e122a]">
                    <div className='flex m-auto text-center justify-center'>
                      {iconsArray.map(icon =>
                      <div key={icon.key} className="justify-between">

                          
                          <Image src={icon.value} alt={icon.key}/>
                          <span className="mt-2">Title app</span>
                          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus non atque modi optio error assumenda nihil nemo accusamus libero sit! Nostrum harum nulla laborum quisquam! Ipsum officia eligendi illo ipsa!</p>
                        </div>
                        )
                      }
                    </div>
                  </div>
                  
                </div>
            </div>
    </div> 
    )
}