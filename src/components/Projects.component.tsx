import React from 'react';
import { Aplication, apiResponse } from "@/models/interfaces";
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
        setAppsList(data["apps"]);
      } catch (error) {
        console.error('Error al obtener la lista de aplicaciones', error);
      }
    };
    getAppsList();
  }, []);

  return (
    <div className="w-full lg:h-screen p-2">
      <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full mt-[8rem] text-center">
        <h1 className="uppercase text-4xl font-bold">Proyectos</h1>
        <p className="my-4 p-5 text-lg">Mira mis proyectos realizados y por realizar:</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appsList.map((app: Aplication) => (
            <div key={app.id} className="flex justify-center">
              <CardApp app={app} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
