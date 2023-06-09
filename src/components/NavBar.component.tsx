import Link from 'next/link';
import React from 'react';
import {TbWorld} from 'react-icons/Tb';
//Icon collapse
import {CgMenu} from 'react-icons/cg';
export default function NavBar(){
    const [isNavVisible, setNavVisible] =React.useState(false);
    //Collapse or extend the hamburger menu
    const handlerNavBar = () =>{
        setNavVisible(!isNavVisible);
    }
    return(
        <div className='fixed w-full h-20 shadow-xl z-[100] top-0 bg-[#1F2A44]' >
            <div className="flex justify-between items-center w-full h-full px-2xl:px-16 ">
                <Link href='/'>
                    <div className='ml-8 mt-2 mb-2 cursor-pointer  '>
                    <h3>Jose Silva Web Page</h3>
               </div>
                </Link>
               
               <div className='mr-8 mt-2 mb-2'>
                    <ul className='hidden md:flex '>
                        <Link href='/'>
                            <li className='ml-10 text-lg uppercase  hover:border-b hover:text-[#85c1e9]'>Inicio</li>
                        </Link>
                        <Link href='/projects'>
                            <li className='ml-10 text-lg uppercase hover:border-b hover:text-[#85c1e9] '>Proyectos</li>
                        </Link>
                        <Link href='/skills'>
                            <li className='ml-10 text-lg uppercase hover:border-b hover:text-[#85c1e9]'>Habilidades</li>
                        </Link>
                        <Link href='/contact'>
                            <li className='ml-10 text-lg uppercase hover:border-b hover:text-[#85c1e9]'>Contacto</li>
                        </Link>
                        <li className='ml-10 text-lg uppercase hover:border-b hover:text-[#85c1e9]'>
                            <TbWorld size={25}/>
                        </li>
                    </ul>
                    <div onClick={handlerNavBar} className='md:hidden cursor-pointer'>
                        <CgMenu size={25} />
                    </div>
                    <div id="navbar"className={ isNavVisible ? 'fixed right-0 top-0 w-full h-screen  bg-black/60': ''}  >
                        <div className= {isNavVisible ? 'fixed right-0 top-0 w-[50%] sm:w-[45%]  bg-[#1F2A44] p-10 ease-in duration-300' : 'fixed right-[-100%] top-0 w-[75%] sm:w-[60%] md:w-[45%] bg-[#1F2A44] p-10 ease-in duration-300'} >
                            <div>
                                <div className='flex w-full  justify-between'>
                                    <div onClick={handlerNavBar} className='rounded-full shadow-lg cursor-pointer p-3 shadow-gray-900 my-4 bg-[#087EA4]'>
                                        <CgMenu size={25}/>
                                    </div>
                                </div>
                                <div className='flex flex-col items-end'>
                                        <ul className='uppercase'>
                                            <li className='py-4 text-base'>
                                                <TbWorld size={25}/>
                                            </li>
                                            <Link href="/">
                                                <li className="py-4text-base">Inicio </li>
                                            </Link>
                                            <Link href="/projects">
                                                <li className="py-4 text-base">Proyectos</li>
                                            </Link>
                                            <Link href="/skills">
                                                <li className="py-4 text-base">Habilidades </li>
                                            </Link>
                                            <Link href="/contact">
                                                <li className="py-4 text-base">Contacto </li>
                                            </Link>
                                            
                                        </ul>
                                    </div>
                            </div>
                        </div>

                    </div>
               </div>
            </div>

        </div>
    )
}