# LedgerFlow Full-Stack Application Setup

Welcome to the **LedgerFlow** application! This project was originally a frontend-only React repository. It has now been successfully converted into a complete **Full-Stack MERN (MongoDB, Express, React, Node.js)** application, allowing the UI to display fully data-driven dynamic content.

## Project Structure
The project is split into two main sections within your `c:\Users\Dell\OneDrive\Desktop\FinanceTracker\fintrack` directory:
- `backend`: The Node.js and Express REST API server + MongoDB database models.
- The root of `fintrack` contains the Vite/React frontend application.

## Prerequisites
Ensure the following are installed on your machine:
- **Node.js**: (Version 18+ recommended)
- **MongoDB**: A running local MongoDB instance on the standard port `27017`.

## 1. Running the Backend Server
1. Open a new terminal.
2. Navigate to the `backend` folder:
   ```bash
   cd c:\Users\Dell\OneDrive\Desktop\FinanceTracker\fintrack\backend
   ```
3. Start the Express server:
   ```bash
   node server.js
   ```
4. *Expected Output*: `Server running on port 5000` and `MongoDB connected successfully`.

## 2. Seeding the Database (Optional)
If you wish to reset your MongoDB data to the initial state that matches the GitHub UI, run the database seed script:
1. Navigate to the `backend` folder as above.
2. Run the seed script:
   ```bash
   node seed.js
   ```
3. *Expected Output*: `Database seeded successfully!`

## 3. Running the Frontend Application
1. Open a new, separate terminal.
2. Navigate to the main `fintrack` folder containing the React code:
   ```bash
   cd c:\Users\Dell\OneDrive\Desktop\FinanceTracker\fintrack
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web application by opening `http://localhost:8080` in your web browser.

## Changes Implemented
All graphs, tables, and KPI metrics on the **Dashboard**, **Customers**, and **Billing** pages now retrieve their data in real-time using `@tanstack/react-query` attached to your local MongoDB data instead of using hardcoded mock data!
