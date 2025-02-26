import mongoose from 'mongoose';

const AppSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  appId: { type: String, required: true },
  name: { type: String, required: true },
  region: { type: String, required: true },
  status: { type: String, default: 'deploying' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('App', AppSchema);
