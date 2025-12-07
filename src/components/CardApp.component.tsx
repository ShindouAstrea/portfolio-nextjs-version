import React from 'react';
import Image from 'next/image';
import { Aplication } from '@/models/interfaces';


function CardApp({ app }: { app: Aplication }) {
    return (
        <React.Fragment>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#142847] shadow-2xl hover:shadow-[#60D5FF]/30 transition-all duration-300 h-full flex flex-col border border-[#3B9DD9]/20 hover:border-[#60D5FF]/50">
                <div className="absolute inset-0 bg-gradient-to-b from-[#60D5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative h-48 bg-gradient-to-br from-[#0F1424] to-[#1E3A5F] overflow-hidden">
                    <div className='flex items-center justify-center h-full'>
                        <Image 
                            src={app.imgSrc} 
                            alt={app.name} 
                            width={180} 
                            height={180} 
                            className="object-contain group-hover:scale-110 transition-transform duration-300" 
                            priority={true} 
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1424] via-transparent to-transparent" />
                </div>

                <div className="relative flex flex-col flex-grow p-6 z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#60D5FF] transition-colors">
                        {app.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                        {app.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {app['tags'].map((tag) => (
                            <span 
                                key={tag} 
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-[#60D5FF]/10 text-[#60D5FF] border border-[#60D5FF]/40 hover:bg-[#60D5FF]/20 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <a 
                        href={app.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                        className="w-full"
                    >
                        <button 
                            type="button" 
                            className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] text-[#0F1424] font-semibold hover:shadow-lg hover:shadow-[#60D5FF]/50 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                            <span>Ver en GitHub</span>
                            <span className='group-hover/btn:translate-x-1 transition-transform'>→</span>
                        </button>
                    </a>
                </div>
            </div>
        </React.Fragment>
    )

}
export default CardApp;
