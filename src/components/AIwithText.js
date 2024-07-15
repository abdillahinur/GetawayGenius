import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AiwithText = () => {
    const apiKey = import.meta.env.apiKey;
    const genAI = new GoogleGenerativeAI(apiKey);
    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const ref = useRef(null); // Ref to the component you want to capture

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Give me a vacation trip itinerary as closely related to ${search} as possible, output in a table format`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    const exportPDF = () => {
        if (ref.current) {
            html2canvas(ref.current, {
                scale: 2, // Increase the scale for better resolution
                useCORS: true // This helps with loading images from external URLs
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                
                // Calculate the PDF width and height based on the canvas dimensions
                const pdfWidth = canvas.width * 0.264583; // Convert pixels to mm
                const pdfHeight = canvas.height * 0.264583; // Convert pixels to mm
                
                // Create a PDF with calculated dimensions and landscape orientation if wider
                const pdf = new jsPDF({
                    orientation: pdfWidth > pdfHeight ? 'l' : 'p',
                    unit: 'mm',
                    format: [pdfWidth, pdfHeight]
                });
    
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save("itinerary.pdf");
            });
        }
    };
    

    const renderItineraryTable = (text) => {
        const rows = text.split('\n').filter(row => row.trim().length > 0 && row.includes('|'))
            .map(row => row.split('|').filter(cell => cell.trim() !== ''));

        return (
            <table ref={ref} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        {rows[0].map((header, index) => (
                            <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {header.replace(/\*/g, '').trim()}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.slice(2).map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {cell.replace(/\*/g, '').trim()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <input 
                    placeholder='Vacation Itinerary using Generative AI' 
                    onChange={handleChangeSearch} 
                    style={{ flex: 1, minWidth: '300px', maxWidth: '600px', padding: '10px', fontSize: '16px', margin: '0 20px 0 0' }}
                />
                <button style={{ padding: '10px 20px' }} onClick={handleClick}>Search</button>
                <button style={{ padding: '10px 20px' }} onClick={exportPDF}>Export as PDF</button>
            </div>
            {loading ? (
                <p style={{ margin: '30px 0' }}>Loading...</p>
            ) : (
                <div style={{ margin: '30px 0' }}>
                    {aiResponse && renderItineraryTable(aiResponse)}
                </div>
            )}
        </div>
    );
};

export default AiwithText;
