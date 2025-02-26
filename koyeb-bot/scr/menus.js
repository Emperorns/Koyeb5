import { Markup } from 'telegraf';

export const setupStartMenu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('📦 My Apps', 'list_apps')],
    [Markup.button.callback('🚀 Deploy New', 'deploy_new')],
    [
      Markup.button.callback('🔑 Accounts', 'manage_accounts'),
      Markup.button.callback('💳 Billing', 'view_billing'),
    ],
  ]);
};

export const accountListMenu = (accounts) => {
  return Markup.inlineKeyboard(
    accounts.map((acc) => [
      Markup.button.callback(
        `${acc.email} ${acc.isActive ? '✅' : ''}`,
        `select_account:${acc._id}`
      ),
    ])
  );
};
