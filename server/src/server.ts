import app from './app';
import { initializeDatabase } from './db/init';

const port = Number(process.env.PORT) || 5174;

const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error(
      'Failed to initialize database. The API will keep running, but database-backed routes may fail until this is fixed.',
      error,
    );
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

startServer();
