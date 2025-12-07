import Image from 'next/image';

import icons from '../../public/assets/icons/languages' ;

export default function SkillsMain(){
    const iconsArray = Object.entries(icons).map(([key, value]) => ({ key, value }));

    return(
        <div className="w-full min-h-screen p-2">
            <div className="max-w-[1240px] mx-auto flex flex-col justify-center min-h-screen py-20">
                <div className="text-center mb-16">
                    <h1 className='text-5xl font-bold mb-2'>
                        <span className='text-white'>Technical </span>
                        <span className='bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] bg-clip-text text-transparent'>Skills</span>
                    </h1>
                    <p className='text-gray-400 text-lg mt-4'>Tecnologías y herramientas que domino</p>
                    <div className='w-24 h-1 bg-gradient-to-r from-[#60D5FF] via-[#3B9DD9] to-[#2563EB] mx-auto mt-6'></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {iconsArray.map((icon) =>
                      <div 
                          key={icon.key}
                          className="group relative p-8 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#142847] border border-[#3B9DD9]/30 hover:border-[#60D5FF]/60 shadow-xl hover:shadow-[#60D5FF]/30 transition-all duration-300 cursor-pointer"
                      >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#60D5FF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                          
                          <div className='relative flex flex-col items-center justify-center text-center'>
                              <div className='w-24 h-24 mb-4 relative'>
                                  <Image  
                                      src={icon.value} 
                                      alt={icon.key}
                                      width={96}
                                      height={96}
                                      className='object-contain group-hover:scale-110 transition-transform duration-300' 
                                  />
                              </div>
                              <h3 className='text-lg font-semibold text-white group-hover:text-[#60D5FF] transition-colors'>
                                  {icon.key}
                              </h3>
                          </div>
                      </div>
                  )}
                </div>
            </div>
        </div>
    )
}
