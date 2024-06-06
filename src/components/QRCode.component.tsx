import { createHash } from 'crypto';
import { useQRCode } from 'next-qrcode';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function QRGeneratorMain() {
    const { Image } = useQRCode();
    const searchParams = useSearchParams();
    const [qrData, setQRData] = useState("");
    const qrRef = useRef<HTMLDivElement>(null);

    const hash = searchParams.get("hash") ?? "";
    const url = searchParams.get("g") ?? "nada";
    const hashVerificado = createHash('sha256');
    hashVerificado.update(url);
    const hashVerificadoHex = hashVerificado.digest('hex');

    useEffect(() => {
        if (qrRef.current) {
            console.log("QR ref is available:", qrRef.current);
            const imgElement = qrRef.current.querySelector("img");
            if (imgElement) {
                console.log("QR img element found:", imgElement);
                setQRData(imgElement.src);
            } else {
                console.error("QR img element not found");
            }
        } else {
            console.error("QR ref is not available");
        }
    }, [qrRef.current]);

    const handleDownload = () => {
        if (!qrData) {
            console.error("QR data is not available");
            return;
        }

        const link = document.createElement('a');
        link.href = qrData;
        link.download = "qr.jpeg";
        link.click();
    };

    if (hashVerificadoHex !== hash) {
        return (
            <div className="w-full lg:h-screen p-2">
                <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full text-center">
                    <div className="grid md:grid-cols-1 my-5 lg:grid-cols-1 gap-8 min-[300px]:m-4">
                        <p className='my-4 p-5 text-lg text-center'>Parametros no válidos</p>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-full lg:h-screen p-2">
                <div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full text-center">
                    <div className="flex justify-center mb-4" id="qr" ref={qrRef}>
                        <Image
                            text={url}
                            options={{
                                type: 'image/jpeg',
                                quality: 0.3,
                                errorCorrectionLevel: 'M',
                                margin: 3,
                                scale: 4,
                                width: 200,
                                color: {
                                    dark: '#010599FF',
                                    light: '#FFFFFF',
                                },
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={handleDownload}>Descargar imagen</button>
                    </div>
                </div>
            </div>
        );
    }
}
