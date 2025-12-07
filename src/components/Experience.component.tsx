import * as React from 'react';
import { Job } from '@/models/interfaces';
import JobCard from './JobCard.component';
export default function ExperienceMain() {
    const [listJobs, setJob] = React.useState([]);
    React.useEffect(() => {
        const getAppsList = async () => {
            try {
                const response = await fetch('/api/jobs', {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const data = await response.json();
                setJob(data["data"]);
            } catch (error) {
                console.error('Error al obtener la lista de Trabajos', error);
            }
        };
        getAppsList();
    }, []);
    console.log(listJobs)

    return (
        <div className="w-full min-h-screen p-2">
            <div className="max-w-[1240px] mx-auto flex flex-col justify-center min-h-screen mt-[8rem] lg:mt-[4rem]">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-2">
                        <span className='text-white'>Work </span>
                        <span className='bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] bg-clip-text text-transparent'>Experience</span>
                    </h1>
                    <p className="text-gray-400 text-lg mt-4">Mi trayectoria profesional</p>
                    <div className='w-24 h-1 bg-gradient-to-r from-[#60D5FF] via-[#3B9DD9] to-[#2563EB] mx-auto mt-6'></div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {listJobs.map((job: Job) => (
                        <div key={job.id} className="flex justify-center ">
                            <JobCard job={job} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}