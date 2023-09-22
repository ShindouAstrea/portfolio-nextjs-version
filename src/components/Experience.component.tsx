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

    return (
        <div className="w-full lg:h-screen p-2">
            <div className=" max-w-[1240px] mx-auto flex flex-col justify-center h-full text-center">
                <h1 className='uppercase text-4xl font-bold'> Experienia Laboral</h1>
                <p className='my-4 p-5 text-lg '>¿Cuáles han sido mis empleos?</p>
                <div className="grid  justify-center">

                    <div className='flex flex-row items-center justify-center text-center gap-5' >
                        {listJobs.map((job: Job) => (
                            <div key={job.id} className="md:grid-cols-4">
                                <JobCard job={job} />
                            </div>
                        ))}


                    </div>


                </div>
            </div>
        </div>
    )
}