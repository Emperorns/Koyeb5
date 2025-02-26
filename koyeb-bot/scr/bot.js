import { Telegraf } from 'telegraf';
import config from './config.js';
import connectDB from './db/mongo.js';
import { setupStartMenu } from './menus.js';
import { 
  handleAddAccount,
  handleAccountSelection 
} from './handlers/accounts.js';
import { handleDeployStart } from './handlers/deploy.js';

// Initialize bot with config
const bot = new Telegraf(config.telegram.token);

// Database connection
connectDB();

// Auto-configure webhook on Koyeb
if (process.env.KOYEB_SERVICE_DOMAIN) {
  const webhookUrl = `${config.koyeb.serviceUrl}${config.telegram.webhookPath}`;
  bot.telegram.setWebhook(webhookUrl);
  bot.startWebhook(
    config.telegram.webhookPath,
    null,
    config.telegram.port
  );
}

// Start command with interactive menu
bot.start(async (ctx) => {
  await ctx.reply(
    '🚀 **Koyeb Manager Bot**\nManage apps across multiple accounts!',
    setupStartMenu()
  );
});

// Register action handlers
bot.action('add_account', handleAddAccount);
bot.action('deploy_new', handleDeployStart);
bot.action(/select_account:(.+)/, handleAccountSelection);

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('❌ An error occurred. Please try again.');
});

// Start bot
if (process.env.NODE_ENV === 'development') {
  bot.launch(); // Polling mode for local dev
} else {
  console.log('Webhook server running on port', config.telegram.port);
}
