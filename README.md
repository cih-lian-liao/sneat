
# Sneat - Admin Management System

This is a full-stack application that includes a React front end and a Node.js back end.

## Project Structure

This project is composed of two main parts:

* `client/`: Contains all the front-end React-related code.
* `server/`: Contains all the back-end Express and MongoDB-related code.

---

## Frontend (Client)

The frontend is a [React](https://reactjs.org/) application built quickly with [Vite](https://vitejs.dev/).

### Main Tech Stack

* **axios**: For sending HTTP requests.
* **chart.js**: For creating charts.
* **echarts**: A powerful charting library.
* **react**: The main UI library.
* **react-chartjs-2**: React wrapper for Chart.js.
* **react-dom**: React's DOM renderer.
* **react-router-dom**: For handling front-end routing.

### Available Scripts

In the `client` directory, you can run the following scripts:

* `npm run dev`: Starts the application in development mode.
* `npm run build`: Bundles the application into static files for production.
* `npm run lint`: Runs ESLint to check code quality.
* `npm run preview`: Previews the production build locally.

---

## Backend (Server)

The backend is a Node.js server built with the [Express](https://expressjs.com/) framework.

### Main Tech Stack

* **cors**: For handling Cross-Origin Resource Sharing (CORS).
* **express**: Web application framework for Node.js.
* **mongoose**: ODM (Object Document Mapper) library for interacting with a MongoDB database.

### Available Scripts

In the `server` directory, you can run the following scripts:

* `npm start`: Starts the backend server.
* `npm test`: Runs tests (currently configured to show an error message).

---

## How to Get Started

1.  **Install Dependencies**:
    * In the `client` directory, run `npm install`.
    * In the `server` directory, run `npm install`.

2.  **Start the Application**:
    * In the `client` directory, run `npm run dev` to start the front-end development server.
    * In the `server` directory, run `npm start` to start the back-end Express server.
