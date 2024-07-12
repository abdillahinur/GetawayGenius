# TripTuner

## Overview

TripTuner is a React-based web application designed to create detailed travel itineraries using the power of generative AI. Using Google's Generative AI API, users can input specific travel criteria such as destinations, dates, budget, group size, and personal preferences to receive a customized travel plan. The application also supports exporting the generated itinerary as a PDF document, allowing users to save or share their travel plans easily.

## Features

- **Custom Itinerary Generation**: Users can generate travel itineraries by specifying start and end dates, destinations, group size, budget, and additional notes.
- **Multiple Destinations**: The application supports input for multiple travel destinations within a single itinerary.
- **PDF Export**: Users can export the generated itinerary to a PDF file, making it easy to print or share.
- **Dynamic Input Fields**: Users can dynamically add or remove destination fields as needed to customize their itinerary requests.
- **Responsive Design**: The app is built with a responsive design, making it accessible on both desktop and mobile devices.

## Technologies Used

- **React**: Used for building the user interface.
- **React DatePicker**: Utilized for selecting dates.
- **Google Generative AI API**: Powers the backend AI model that generates itineraries based on user input.
- **jsPDF**: Library used for generating PDF documents from the itinerary content.
- **html2canvas**: Captures snapshots of the DOM to render as images in the PDF documents.

## Setup and Installation

1. **Clone the Repository**:

2. **Install Dependencies**:
cd itinerary-generator
npm install

3. **Run the Application**:
npm start

## Usage

To use the Trip Tuner, follow these steps:

1. **Start the Application**: Run the application locally by executing `npm start`.
2. **Input Itinerary Details**: Enter the required fields such as dates, destinations, budget, etc.
3. **Generate Itinerary**: Click on the 'Generate' button to request the AI to create your itinerary based on the inputs provided.
4. **Export PDF**: Once the itinerary is displayed, use the 'Export as PDF' button to download the itinerary as a PDF file.

## Contributing

Contributions are welcome, and any feedback or suggestions are appreciated. P

## License

[MIT License](https://opensource.org/licenses/MIT)





