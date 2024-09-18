import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  allocatedAmount: { type: Number, required: true },
  spentAmount: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'warning', 'completed', 'exceeded'], default: 'active' },
  notifications: { type: Boolean, default: false },
});

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
