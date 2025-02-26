import { Markup } from 'telegraf';
import { decrypt } from '../utils/encryption';
import { getKoyebApps } from '../utils/koyeb-api';

export const handleListApps = async (ctx) => {
  const accounts = await Account.find({ userId: ctx.from.id });
  const apps = await Promise.all(
    accounts.map(async (acc) => {
      const apiKey = decrypt(acc.encryptedApiKey);
      return await getKoyebApps(apiKey);
    })
  );
  
  // Show apps as buttons
  ctx.reply(
    'Your Apps:',
    Markup.inlineKeyboard(
      apps.flat().map((app) => [
        Markup.button.callback(
          `${app.name} - ${app.status}`,
          `app_detail:${app.id}`
        ),
      ])
    )
  );
};
