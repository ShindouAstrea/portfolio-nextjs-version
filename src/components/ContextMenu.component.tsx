import React from 'react';
interface ContextMenuProps {
    xPos: number;
    yPos: number;
    closeMenu:()=>void;
 }
 const ContextMenu:React.FC<ContextMenuProps>=({xPos,yPos,closeMenu})=>{
    return(
        <div  onClick={closeMenu} className="absolute z-200 w-24 h-24 bg-slate-700" style={{top:`${yPos}px`,left:`${xPos}px`}}>
            <ul className='text-center'>
                <li className="text-white">Opcion1</li>
                <li className="text-white">opcion2</li>
                <li className="text-white">opcion3</li>
                <li className="text-white">opcion3</li>
            </ul>
        </div>
    ) 
}
export default ContextMenu;