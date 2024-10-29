import { useId, useState } from "react";

import './QrCode.css';

export const QrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(true);
    const [qrData, setQrData] = useState("https://chat.openai.com/");
    const [qrSize, setQrSize] = useState("150");

    async function generateQR() {
        setLoading(true)
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize} * ${qrSize} &data=${encodeURIComponent(qrData)}`;
            setImg(url);

        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    function downloadQr() {
        fetch(img)
            .then((response) => response.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "qr.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.error("Error in downloading QR", error);
            });
    }
    return (
        <div className="app-container">
            <h2> QR CODE GENERATOR </h2>
            {loading && <p> Please Wait... </p>}

            {img && <img src={img} alt="" className="qr-code" />}
            <div>
                <label htmlFor="dataInput" className="input-label">
                    Data for QR Code:
                </label>
                <input type="text" id="dataInput" value={qrData} placeholder="Enter data for QR code" onChange={(e) => setQrData(e.target.value)} />

                <label htmlFor="sizeInput" className="input-label">
                    Image Size (e.g., 150):
                </label>
                <input type="text" id="sizeInput" value={qrSize} placeholder="Enter image size" onChange={(e) => setQrSize(e.target.value)} />
                <button className="generate-button" onClick={generateQR}> Generate QR code </button>
                <button className="download-button" onClick={downloadQr}> Download QR code </button>
            </div>
            <p className="footer"> Designed by Kavya</p>

        </div>
    )
}





// https://api.qrserver.com/v1/create-qr-code/?size=150%20*150&data=kaviya