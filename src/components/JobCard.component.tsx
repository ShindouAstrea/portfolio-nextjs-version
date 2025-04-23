import React from 'react';
import { Job } from '@/models/interfaces';


function JobCard({ job }: { job: Job }) {
    const ListadoDescription = ({ description }: { description: string }) => {
        const descriptionList: Array<string> = description.split('.');
        return (
            <ul className='list-disc p-2'>
                {descriptionList.map((line: string, index: number) => (
                    <li className="decoration-gray-100" key={index}>{line}</li>
                ))}
            </ul>
        );
    }
    return (
        <React.Fragment>
            <div className="p-6 shadow-xl rounded-xl bg-[#1A1F36] hover:scale-105 ease-in duration-100 m-auto justify-center max-[400px]:w-64">
                <div className="flex flex-col h-full justify-between">
                    <div className="text-center">
                        <p className="my-1 text-white p-1 uppercase">{job.title}</p>
                        <p className='text-xs text-white my-1'>{job.company}<span className='text-xs text-white'> ( {job.start} - {job.end} )</span></p>

                        <div className="flex flex-wrap max-w-xs justify-start">
                            {job['tags'].map((tag) => (
                                <span key={tag} className="bg-[#4a688c] rounded text-white m-1 p-1  text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <ListadoDescription description={job.description} />
                    </div>
                </div>
            </div>
        </React.Fragment>

    )

}
export default JobCard;
