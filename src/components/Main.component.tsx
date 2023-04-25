import React  from 'react';
export default  function Main(){
    return(
        <div className=' w-full h-screen text center'>
            <div className='max-w-[1024] w-full h-full mx-auto p-2 flex justify-center items-center'>
                <div>
                    <h1 className='py-4 text-white text-xl text-center'> Hola !  , soy <span className='text-[#85c1e9]'>José Silva </span>un Ingeniero de Software.</h1>
                    <p className='py-4 text-center justify-center text-gray-400'>
                        Soy ingeniero de ejecución en informatica , con principal experiencia en desarrollo web.
                        
                    </p>
                </div>
            </div>
        </div>
    )
}