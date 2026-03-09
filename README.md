# LedgerFlow

LedgerFlow is a modern finance tracking platform that helps users easily manage income, expenses, and budgets with powerful insights and a simple dashboard. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Running Locally on a New Device

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ledgerflow
   ```

2. **Backend Setup:**
   Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Create a `.env` file in the backend folder and populate it with your `MONGO_URI` and `JWT_SECRET`. For example:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ledgerflow
   JWT_SECRET=ledgerflow_super_secret_key
   ```
   Run the backend development server:
   ```bash
   npm start
   ```
   *By default, the backend runs on `http://localhost:5000`.*

3. **Frontend Setup:**
   Open a separate terminal and navigate to the root directory where the React application is located:
   ```bash
   # from the project root
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The application should now be accessible at `http://localhost:8080` (or whichever port Vite uses).*

## Technologies Used
- **Frontend:** React, Vite, Tailwind CSS, shadcn-ui, TypeScript, Framer Motion
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT Authentication
