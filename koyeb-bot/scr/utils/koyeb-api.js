import axios from 'axios';

export const getKoyebApps = async (apiKey) => {
  const res = await axios.get(`${process.env.KOYEB_API_BASE}/apps`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  return res.data.apps;
};

export const deployApp = async (apiKey, config) => {
  // Implement deployment logic
};
