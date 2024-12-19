
# Climate Data Visualization

This project is a React-based frontend application for uploading climate data files and visualizing them in interactive charts. The app integrates with a backend API to process CSV files containing climate data and displays the results as yearly and monthly temperature trends.

## Features

- **File Upload**: Upload CSV files to the backend for processing.
- **Interactive Charts**: Visualize yearly and monthly temperature trends with options to switch views and select specific years.
- **Dark Mode Support**: Toggle between light and dark themes.
- **Error Handling**: Displays user-friendly error messages for invalid file uploads or processing issues.
- **Responsive Design**: Optimized for desktops and mobile devices.

## Prerequisites

Ensure the following are installed on your system:

- Node.js (version 16 or higher)
- npm or Yarn (for package management)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nektgr/climate-data-frontend.git
   cd climate-data-frontend
   ```

2. Install dependencies:
   - Using npm:
     ```bash
     npm install
     ```
   - Or using Yarn:
     ```bash
     yarn install
     ```

## Running the Application

1. Start the development server:
   - Using npm:
     ```bash
     npm start
     ```
   - Or using Yarn:
     ```bash
     yarn start
     ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```


## Project Structure

```plaintext
climate-data-frontend/
├── public/
│   └── index.html                    # Main HTML template
├── src/
│   ├── components/                   # React components
│   │   ├── FileUpload.jsx
│   │   ├── PlotChart.jsx
│   │   └── ThemeToggle.jsx
│   ├── config/                       # Configuration files
│   │   └── chartConfig.js
│   ├── utils/                        # Utility functions
│   │   └── generateChartData.js
|   |   └── fileUtils.js
|   |   └── chartUtils.js
│   ├── App.jsx                       # Main App component
│   ├── index.js                      # App entry point
│   ├── App.css                       # Global styling for App
│   └── index.css                     # Global CSS
├── .gitignore                        # Git ignore file
├── Dockerfile                        # Docker configuration
├── package.json                      # Project dependencies
├── README.md                         # Project documentation
└── tailwind.config.js                # Tailwind CSS configuration

```

## Notes

- Ensure the backend API is running and accessible at the configured `BASE_URL`.
- Use the same CORS settings on the backend to allow requests from `http://localhost:3000` during development.
- For production, adjust the API URL and deploy the frontend accordingly.

## Deployment

1. Build the project:
   - Using npm:
     ```bash
     npm run build
     ```
   - Or using Yarn:
     ```bash
     yarn build
     ```

2. Serve the `build/` directory using a static server or deploy it to a hosting service like Netlify, Vercel, or AWS.

## Notes

- Ensure the backend and frontend configurations are aligned in production.
- Always validate your CSV files before uploading to avoid processing errors.
