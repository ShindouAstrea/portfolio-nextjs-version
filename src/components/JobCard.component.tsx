import React from 'react';
import { Job } from '@/models/interfaces';


function JobCard({ job }: { job: Job }) {
    const ListadoDescription = ({ description }: { description: string }) => {
        const descriptionList: Array<string> = description.split('.');
        return (
            <ul className='list-disc p-2 text-left'>
                {descriptionList.map((line: string, index: number) => (
                    <li className="text-gray-400 text-sm mb-2" key={index}>{line}</li>
                ))}
            </ul>
        );
    }
    return (
        <React.Fragment>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#142847] shadow-2xl hover:shadow-[#60D5FF]/30 transition-all duration-300 h-full flex flex-col border border-[#3B9DD9]/20 hover:border-[#60D5FF]/50">
                <div className="absolute inset-0 bg-gradient-to-b from-[#60D5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex flex-col flex-grow p-6 z-10">
                    <div className='mb-4 pb-4 border-b border-[#60D5FF]/20'>
                        <h3 className="text-xl font-bold text-white group-hover:text-[#60D5FF] transition-colors mb-1">
                            {job.title}
                        </h3>
                        <p className='text-sm font-semibold text-[#60D5FF]'>{job.company}</p>
                        <p className='text-xs text-gray-400 mt-1'>📅 {job.start_date} - {job?.end_date ?? 'Actualmente'}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {job['tags'].map((tag) => (
                            <span 
                                key={tag} 
                                className="px-2 py-1 rounded-full text-xs font-semibold bg-[#60D5FF]/10 text-[#60D5FF] border border-[#60D5FF]/40 hover:bg-[#60D5FF]/20 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    <div className='flex-grow'>
                        <ListadoDescription description={job.description} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}
export default JobCard;
