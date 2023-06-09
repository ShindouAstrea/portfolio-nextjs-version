import React from 'react';
import Image, { StaticImageData } from "next/image";

export default function ModalImage({imageRoute,state}:{imageRoute:StaticImageData,state:boolean}){
 return (
    <div className='absolute  z-10'>
        <Image className={ state ? "absolute lg:w-[15rem] opacity-5 left-28 top-0 easy-in duration-[0.3]  z-10 block justify-center items-center": 'hidden'} src={imageRoute} alt="content"/>
    </div>
 )
}