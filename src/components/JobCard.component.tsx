import React from 'react';
import { Job } from '@/models/interfaces';

function JobCard({ job }: { job: Job }) {
    const formatDate = (dateString: string | null | undefined): string => {
        // Si es null, undefined o string vacío, es el trabajo actual
        if (!dateString || dateString === '' || dateString === 'Actualmente') {
            return 'Actualmente';
        }
        
        try {
            const date = new Date(dateString);
            // Validar que la fecha sea válida (no sea NaN)
            if (isNaN(date.getTime())) {
                return 'Actualmente';
            }
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        } catch {
            return 'Actualmente';
        }
    };

    const ListadoDescription = ({ description }: { description: string }) => {
        const descriptionListWithEmptys: Array<string> = description.split('.');
        const descriptionList:Array<string> = descriptionList.filter((description)=>description!='');
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
                        <p className='text-xs text-gray-400 mt-1'>{formatDate(job.start_date)} - {formatDate(job.end_date)}</p>
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
