import { Markup } from 'telegraf';
import { deployApp } from '../utils/koyeb-api';
import App from '../db/models/App';

export const handleDeployStart = async (ctx) => {
  // Start deployment wizard
  await ctx.reply('Choose region:', Markup.inlineKeyboard([
    [Markup.button.callback('🌎 US', 'deploy_region:us')],
    [Markup.button.callback('🇪🇺 EU', 'deploy_region:eu')],
    [Markup.button.callback('🇸🇬 Asia', 'deploy_region:asia')]
  ]));
};

export const handleDeployRegion = async (ctx) => {
  const region = ctx.match[1];
  ctx.session.deployData = { region };
  await ctx.reply('Enter Docker image name:');
  // Next: bot.on('text') to capture image name
};
