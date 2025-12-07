import React from 'react';
import Link from 'next/link';

export default function Main() {
    const handlerContext = (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        event.preventDefault();
    }
    
    return (
        <div className='w-full min-h-screen p-2' onContextMenu={handlerContext}>
            <div className='max-w-[1240px] mx-auto flex flex-col justify-center min-h-screen mt-[4rem] lg:mt-0'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
                    <div className='flex-1'>
                        <div className='mb-6'>
                            <span className='text-[#60D5FF] text-lg font-mono'>{'<'} developer {'>'} </span>
                        </div>
                        <h1 className='text-white text-5xl lg:text-6xl font-bold mb-4'>
                            José Silva
                        </h1>
                        <h2 className='bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] bg-clip-text text-transparent text-2xl lg:text-3xl font-semibold mb-6'>
                            Ingeniero de Software
                        </h2>
                        <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-2xl mb-8">
                            Desarrollador Full-Stack especializado en <span className='text-[#60D5FF] font-semibold'>JavaScript/TypeScript</span>, <span className='text-[#60D5FF] font-semibold'>React</span>, y <span className='text-[#60D5FF] font-semibold'>Node.js</span>. Apasionado por crear soluciones web escalables y de alto rendimiento.
                        </p>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                            <div className='flex items-start gap-3 p-4 bg-gradient-to-br from-[#1E3A5F] to-[#142847] rounded-lg hover:from-[#2A4A7F] hover:to-[#1A3860] transition-all border border-[#3B9DD9]/20 hover:border-[#60D5FF]/40'>
                                <div className='text-[#60D5FF] text-xl flex-shrink-0 mt-1'>💻</div>
                                <div>
                                    <p className='font-semibold text-white'>Front-End</p>
                                    <p className='text-gray-400 text-sm'>React, Next.js, TypeScript</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 p-4 bg-gradient-to-br from-[#1E3A5F] to-[#142847] rounded-lg hover:from-[#2A4A7F] hover:to-[#1A3860] transition-all border border-[#3B9DD9]/20 hover:border-[#60D5FF]/40'>
                                <div className='text-[#60D5FF] text-xl flex-shrink-0 mt-1'>⚙️</div>
                                <div>
                                    <p className='font-semibold text-white'>Back-End</p>
                                    <p className='text-gray-400 text-sm'>Node.js, PHP, Laravel</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 p-4 bg-gradient-to-br from-[#1E3A5F] to-[#142847] rounded-lg hover:from-[#2A4A7F] hover:to-[#1A3860] transition-all border border-[#3B9DD9]/20 hover:border-[#60D5FF]/40'>
                                <div className='text-[#60D5FF] text-xl flex-shrink-0 mt-1'>🔧</div>
                                <div>
                                    <p className='font-semibold text-white'>DevOps</p>
                                    <p className='text-gray-400 text-sm'>Git, Docker, Supabase</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-4 flex-wrap'>
                            <Link href='/projects' className='px-6 py-3 bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] text-[#0F1424] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#60D5FF]/50 transition-all'>
                                Ver Proyectos
                            </Link>
                            <Link href='/contact' className='px-6 py-3 border-2 border-[#60D5FF] text-[#60D5FF] font-semibold rounded-lg hover:bg-[#60D5FF]/10 hover:shadow-lg hover:shadow-[#60D5FF]/30 transition-all'>
                                Contactarme
                            </Link>
                        </div>

                        <div className='mt-6'>
                            <span className='text-[#60D5FF] text-lg font-mono'>{`</developer>`}</span>
                        </div>
                    </div>

                    <div className='flex-1 hidden lg:block'>
                        <div className='bg-gradient-to-b from-[#1E3A5F] to-[#142847] rounded-lg overflow-hidden shadow-2xl border border-[#3B9DD9]/30'>
                            <div className='flex items-center gap-2 bg-[#0F1424] px-4 py-3'>
                                <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                                <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
                                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                                <span className='text-gray-400 text-sm ml-4 font-mono'>about.jsx</span>
                            </div>
                            <pre className='p-4 text-sm text-[#60D5FF] font-mono overflow-auto max-h-80'>
<code>{`const developer = {
  name: "José Silva",
  role: "Software Engineer",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Next.js"
  ],
  experience: "5+ years"
}`}</code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
