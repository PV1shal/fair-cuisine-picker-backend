import express from 'express';
import cors from 'cors';
import yelpCouplesRoutes from './api/yelpForCouples.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/yelpCouples', yelpCouplesRoutes);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;