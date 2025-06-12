import express from 'express';
import routes from './routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Use the new routes file for /api/v1 endpoints
app.use('/api/v1', routes);

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
