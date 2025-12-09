import React from 'react';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-16 h-16 mb-4">
                {/* Spinner externo */}
                <div className="absolute inset-0 rounded-full border-4 border-[#3B9DD9]/20"></div>
                
                {/* Spinner rotativo */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#60D5FF] border-r-[#3B9DD9] animate-spin"></div>
            </div>
            <p className="text-gray-400 text-lg font-semibold">Obteniendo Información...</p>
            <p className="text-gray-500 text-sm mt-2">Por favor espera</p>
        </div>
    );
}
