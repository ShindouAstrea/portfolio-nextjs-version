import React  from 'react';

import Foto from '../../public/assets/pictures/dev.png';

import Modal from './Modal.component';
import Link from 'next/link';
export default  function Main(){

    // const InitialContext = {
    //     show:false,
    //     Xpos:0,
    //     Ypos:0
    // }
    //const [contextMenu,setContextMenu] = React.useState(InitialContext);
    const handlerContext = (event: React.MouseEvent<HTMLDivElement,globalThis.MouseEvent>)=>{
        event.preventDefault();
        const {pageX, pageY} = event;
        //setContextMenu({show:true,Xpos:pageX, Ypos:pageY});


    }
    
    const [showFoto,setShowFoto] =React.useState(true);
    const handleFoto =()=>{
        setShowFoto(!showFoto) ;
        
    }
    return(
        <div  className=' w-full lg:h-screen p-2 ' onContextMenu={handlerContext}>
            <div className='max-w-[1240px] mx-auto flex flex-col justify-center h-full mt-[8rem] text-center'>
                <div className='flex flex-col text-center items-center alig gap-8'>
                    <h1 className=' text-white text-4xl font-bold uppercase text-center min-[300px]:w-[20rem] px-2'>Acerca de mi</h1>
                   

                    <h2 className='text-white text-3xl text-center justify-center items-center '> Hola !  , soy <span className='text-[#85c1e9]'  onMouseOver={handleFoto} onMouseOut={handleFoto}>José Silva </span>un Ingeniero de Software.</h2>
                    <div className=' relative justify-center items-center z-10'>
                        <Modal imageRoute={Foto} state={showFoto} />
                    </div>
                    <p className="text-center justify-center text-gray-400 text-2xl lg:w-[80rem] px-1 ">
                        Soy ingeniero de ejecución en informática con principal experiencia en el desarrollo web.
                        Me considero alguien adaptable y con habilidades interpersonales sólidas, lo que me permite trabajar bien en equipo y con personas de diferentes
                        orígenes y habilidades.
                       
                        </p>
                        <p className="text-center justify-center text-gray-400 text-2xl lg:w-[80rem] px-1 ">
                        Algunas palabras que me describen son responsabilidad, flexibilidad, altruismo y paciencia.
                        Me apasiona aprender cosas nuevas y trabajar en proyectos que tengan un impacto positivo en la sociedad.
                        Además, tengo habilidades en diferentes FrameWorks de desarrollo web, las cuales he adquirido a través de mi experiencia en  mi práctica profesional , proyectos personales, proyectos acádemicos y proyectos colaborativos. En mi tiempo libre, disfruto de escuchar mis playlist de Spotify, ejercitarme, ver series , jugar algunos juegos y desarrollar algunos proyectos personales.
                        Estoy buscando oportunidades para trabajar en proyectos emocionantes que me permitan crecer profesionalmente y tener un impacto positivo en la sociedad. Si estás interesado en conocer más sobre mí o mi trabajo, no dudes en contactarme a través de <Link className='text-[#85c1e9] hover:underline' href="/contact ">mis diferentes redes sociales </Link>.
                        </p>
                </div>
            </div>
        </div>
    )
}