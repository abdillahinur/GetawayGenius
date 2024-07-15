import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const GenerateItinerary = () => {
    const apiKey = import.meta.env.apiKey;
    const genAI = new GoogleGenerativeAI(apiKey);
    const [formDetails, setFormDetails] = useState({
        startDate: new Date(),
        endDate: new Date(),
        destinations: [''],
        groupSize: '',
        budget: '',
        currency: '',
        notes: ''
    });
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);  // Reference for the part of the component to be captured

    const handleInputChange = (field, value) => {
        setFormDetails(prev => ({ ...prev, [field]: value }));
    };

    const handleDestinationChange = (index, value) => {
        const updatedDestinations = [...formDetails.destinations];
        updatedDestinations[index] = value;
        setFormDetails(prev => ({ ...prev, destinations: updatedDestinations }));
    };

    const addDestination = () => {
        setFormDetails(prev => ({
            ...prev,
            destinations: [...prev.destinations, '']
        }));
    };

    const removeDestination = index => {
        const updatedDestinations = formDetails.destinations.filter((_, i) => i !== index);
        setFormDetails(prev => ({
            ...prev,
            destinations: updatedDestinations
        }));
    };

    const handleDateChange = (field, date) => {
        setFormDetails(prev => ({ ...prev, [field]: date }));
    };

    async function generateItinerary() {
        setLoading(true);
        const { startDate, endDate, destinations, groupSize, budget, currency, notes } = formDetails;
        const prompt = `Create a detailed vacation itinerary from ${startDate.toDateString()} to ${endDate.toDateString()} for destinations ${destinations.join(', ')} with a group of ${groupSize} people, budget ${budget} ${currency}, notes: ${notes}`;
        const result = await genAI.getGenerativeModel({ model: "gemini-pro" }).generateContent(prompt);
        const text = await result.response.text();
        setResponse(text);
        setLoading(false);
    }

    const exportPDF = () => { // Need to update to incorporate PDF more than 1 page... currently retrofits all itinerary onto one page
        if (ref.current) {
            html2canvas(ref.current, {
                scale: 2, // Increase the scale for better resolution
                useCORS: true // This helps with loading images from external URLs
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdfWidth = canvas.width * 0.264583; // Convert pixels to mm
                const pdfHeight = canvas.height * 0.264583; // Convert pixels to mm
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
        if (!text) return <p>No itinerary data available.</p>;
    
        // Split the text by double new lines to identify separate days or sections
        const sections = text.split('\n\n').filter(section => section.trim().length > 0);
    
        if (!sections.length) return <p>No valid itinerary data found.</p>;
    
        return (
            <table ref={ref} className="itinerary-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Date and Location</th>
                        <th>Activities</th>
                    </tr>
                </thead>
                <tbody>
                    {sections.map((section, index) => {
                        const parts = section.split('\n').filter(line => line.trim().length > 0);
                        const header = parts[0];
                        const activities = parts.slice(1).join(', ');  // Combine all activities into a single string
                        return (
                            <tr key={index}>
                                <td>{header}</td>
                                <td>{activities}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };
    
    

    return (
        <div>
            <h1>Create Your Itinerary</h1>
            <div>
                <label>
                    Start Date:
                    <DatePicker selected={formDetails.startDate} onChange={date => handleDateChange('startDate', date)} />
                </label>
                <label>
                    End Date:
                    <DatePicker selected={formDetails.endDate} onChange={date => handleDateChange('endDate', date)} minDate={formDetails.startDate} />
                </label>
                {formDetails.destinations.map((destination, index) => (
                    <div key={index}>
                        <label>
                            Destination {index + 1}:
                            <input type="text" value={destination} onChange={e => handleDestinationChange(index, e.target.value)} placeholder="Enter a destination" />
                        </label>
                        {formDetails.destinations.length > 1 && (
                            <button type="button" onClick={() => removeDestination(index)}>Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addDestination}>Add Destination</button>
                <label>
                    Group Size:
                    <input type="number" value={formDetails.groupSize} onChange={e => handleInputChange('groupSize', e.target.value)} placeholder="Number of people" />
                </label>
                <label>
                    Budget:
                    <input type="text" value={formDetails.budget} onChange={e => handleInputChange('budget', e.target.value)} placeholder="Total budget" />
                </label>
                {formDetails.budget && (
                    <label>
                        Currency:
                        <select value={formDetails.currency} onChange={e => handleInputChange('currency', e.target.value)} required>
                            <option value="">Select Currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </label>
                )}
                <label>
                    Additional Notes:
                    <textarea value={formDetails.notes} onChange={e => handleInputChange('notes', e.target.value)} placeholder="Any additional information" />
                </label>
                <button style={{ padding: '10px 20px' }} onClick={generateItinerary}>Generate</button>
                <button style={{ padding: '10px 20px' }} onClick={exportPDF}>Export as PDF</button>
            </div>
            {loading ? <p>Loading...</p> : (aiResponse && renderItineraryTable(aiResponse))}
        </div>
    );
};

export default GenerateItinerary;
