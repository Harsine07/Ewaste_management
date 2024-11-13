import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import orderRoutes from './routes/orderRoutes.js';
import companyRoutes from './routes/companies.js';
import agentsRoutes from './routes/agentsRoutes.js';  
import agentLogin from './routes/agentLogin.js';
import customerRoutes from './routes/customerLogin.js';
import assignment from './routes/assignment.js';


const app = express();
const port = 5000;

// Enable CORS for frontend requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json()); 

// Routes for other features
app.use('/api', orderRoutes);
app.use('/api/registration', companyRoutes);
app.use('/api/agents', agentsRoutes); 
app.use('/api/agent-login', agentLogin);
app.use('/api/customers', customerRoutes);  
app.use('/api',assignment);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


export default app;
