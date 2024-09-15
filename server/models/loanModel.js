import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loanType: { type: String, enum: ['creditor', 'debtor'], required: true },
  amount: { type: Number, required: true },
  counterparty: { type: String, required: true },
  loanDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  interestRate: { type: Number, default: 0 },
  outstandingBalance: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'completed', 'overdue'], default: 'active' },
});

const Loan = mongoose.model('Loan', loanSchema);
export default Loan;
