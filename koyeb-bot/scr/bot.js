import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import connectDB from './db/mongo';
import { setupStartMenu } from './menus';
import { handleAddAccount, handleAccountSelection } from './handlers/accounts';
import { handleDeployStart } from './handlers/deploy';

// Initialize
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
connectDB();

// Auto-set webhook on Koyeb
if (process.env.KOYEB_SERVICE_DOMAIN) {
  const webhookUrl = `https://${process.env.KOYEB_SERVICE_DOMAIN}/webhook`;
  bot.telegram.setWebhook(webhookUrl);
  bot.startWebhook('/webhook', null, process.env.PORT || 3000);
}

// Start menu with buttons
bot.start(async (ctx) => {
  await ctx.reply(
    '🚀 **Koyeb Manager Bot**\nManage apps across multiple accounts!',
    setupStartMenu()
  );
});

// Assign handlers
bot.action('add_account', handleAddAccount);
bot.action('deploy_new', handleDeployStart);
bot.action(/select_account:(.+)/, handleAccountSelection);

// Start bot
bot.launch();
