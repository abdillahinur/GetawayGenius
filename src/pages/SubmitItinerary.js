import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CreateItinerary = () => {
    const [itineraryDetails, setItineraryDetails] = useState({
        title: '',
        description: '',
        dates: '',
        locations: '',
        activities: ''
    });
    const ref = useRef(null); // Reference for the component to capture for PDF

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItineraryDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(itineraryDetails); // For now, just log the details
        // Later, you might want to send this data to a server
    };

    const exportPDF = () => {
        if (ref.current) {
            html2canvas(ref.current, {
                scale: 2, // Increase the scale for better resolution
                useCORS: true // Helps with loading images from external URLs
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4'
                });
                pdf.addImage(imgData, 'PNG', 10, 10, 190, 260);
                pdf.save(`${itineraryDetails.title || 'Itinerary'}.pdf`);
            });
        }
    };

    return (
        <div>
            <h1>Create New Itinerary</h1>
            <div ref={ref}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={itineraryDetails.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={itineraryDetails.description}
                            onChange={handleChange}
                            placeholder="Describe the itinerary"
                        />
                    </label>
                    <br />
                    <label>
                        Dates:
                        <input
                            type="text"
                            name="dates"
                            value={itineraryDetails.dates}
                            onChange={handleChange}
                            placeholder="Dates"
                        />
                    </label>
                    <br />
                    <label>
                        Locations:
                        <input
                            type="text"
                            name="locations"
                            value={itineraryDetails.locations}
                            onChange={handleChange}
                            placeholder="Locations"
                        />
                    </label>
                    <br />
                    <label>
                        Activities:
                        <input
                            type="text"
                            name="activities"
                            value={itineraryDetails.activities}
                            onChange={handleChange}
                            placeholder="Activities"
                        />
                    </label>
                    <br />
                    <button type="submit">Submit Itinerary</button>
                    <button type="button" onClick={exportPDF}>Export as PDF</button>
                </form>
            </div>
        </div>
    );
};

export default CreateItinerary;
