import React from 'react';
import { Aplication } from "@/models/interfaces";
import CardApp from "./CardApp.component";

export default function ProjectsMain() {
  const [appsList, setAppsList] = React.useState([]);

  React.useEffect(() => {
    const getAppsList = async () => {
      try {
        const response = await fetch('/api/apps', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        // La API devuelve { success, data: [...], message }
        setAppsList(data.data || []);
      } catch (error) {
        console.error('Error al obtener la lista de aplicaciones', error);
      }
    };
    getAppsList();
  }, []);
  console.log(appsList)

  return (
    <div className="w-full min-h-screen p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center min-h-screen mt-[8rem] lg:mt-[4rem]">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">
            <span className='text-white'>Featured </span>
            <span className='bg-gradient-to-r from-[#60D5FF] to-[#3B9DD9] bg-clip-text text-transparent'>Projects</span>
          </h1>
          <p className="text-gray-400 text-lg mt-4">Algunos de mis trabajos más destacados</p>
          <div className='w-24 h-1 bg-gradient-to-r from-[#60D5FF] via-[#3B9DD9] to-[#2563EB] mx-auto mt-6'></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {appsList?.map((app: Aplication) => (
            <div key={app.id} className="flex justify-center">
              <CardApp app={app} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
