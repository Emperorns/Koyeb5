import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
dotenv.config({ path: resolve(process.cwd(), '.env') });

// Validate required variables
const requiredEnvVars = ['TELEGRAM_TOKEN', 'MONGODB_URI', 'ENCRYPTION_KEY'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Export configuration object
export default {
  telegram: {
    token: process.env.TELEGRAM_TOKEN,
    webhookPath: '/webhook',
    port: process.env.PORT || 3000
  },
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY
  },
  koyeb: {
    apiBase: process.env.KOYEB_API_BASE || 'https://app.koyeb.com/v1',
    timeout: 5000
  }
};
