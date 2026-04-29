import app from './app';
import { initializeDatabase } from './db/init';

const port = Number(process.env.PORT) || 5174;

const startServer = async () => {
  try {
    await initializeDatabase();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to initialize database', error);
    process.exit(1);
  }
};

startServer();
