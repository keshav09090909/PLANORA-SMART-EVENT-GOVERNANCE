import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventsRouter from './routes/events.js';
import vendorsRouter from './routes/vendors.js';
import eventVendorsRouter from './routes/eventVendors.js';
import reportsRouter from './routes/reports.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/vendors', vendorsRouter);
app.use('/api/event-vendors', eventVendorsRouter);
app.use('/api/reports', reportsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PLANORA API is running' });
});

app.listen(PORT, () => {
  console.log(`PLANORA server running on port ${PORT}`);
});
