import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AiwithText = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyDXxBk0O2i9-bRvWEgycp95F1RmfQN5Z3A');

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Generative AI Call to fetch text insights
     */
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

    const renderItineraryTable = (text) => {
        const rows = text.split('\n').filter(row => row.trim().length > 0 && row.includes('|')).map(row => row.split('|').filter(cell => cell.trim() !== ''));
        return (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        {rows[0].map((header, index) => (
                            <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>{header.trim()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.slice(2).map((row, index) => (
                        <tr key={index}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>{cell.trim()}</td>
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
                <input placeholder='Vacation Itinerary using Generative AI' onChange={handleChangeSearch} />
                <button style={{ marginLeft: '20px' }} onClick={handleClick}>Search</button>
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
