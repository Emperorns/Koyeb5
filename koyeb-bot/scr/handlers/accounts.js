import { Markup } from 'telegraf';
import Account from '../db/models/Account';
import { encrypt } from '../utils/encryption';

export const handleAddAccount = async (ctx) => {
  await ctx.reply(
    '🔐 Enter your Koyeb API Key:',
    Markup.forceReply().oneTime()
  );
  // Wait for reply
  bot.on('text', async (ctx) => {
    const encryptedKey = encrypt(ctx.message.text);
    await Account.create({
      userId: ctx.from.id,
      encryptedApiKey: encryptedKey,
    });
    ctx.reply('✅ Account added!');
  });
};

export const handleAccountSelection = async (ctx) => {
  const accountId = ctx.match[1];
  // Fetch apps for this account and show actions
};
