import Loan from '../models/loanModel';

class LoanController {
  // Log a new loan (either given or taken)
  static async logLoan(req, res) {
    const {
      loanType, amount, counterparty, loanDate, dueDate, interestRate,
    } = req.body;

    try {
      const loan = await Loan.create({
        userId: req.user._id,
        loanType,
        amount,
        counterparty,
        loanDate,
        dueDate,
        interestRate,
        outstandingBalance: amount,
      });

      return res.status(201).json({ message: 'Loan logged successfully', loan });
    } catch (error) {
      console.error('Error logging Loan: ', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Get all loans for a user (both given and taken)
  static async getLoans(req, res) {
    try {
      const loans = await Loan.find({ userId: req.user._id });
      return res.json({ loans });
    } catch (error) {
      console.error('Error getting Loans: ', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Update loan details (for making payments or changes)
  static async updateLoan(req, res) {
    const { loandId, amountPaid } = req.body;

    try {
      const loan = await Loan.findById(loandId);
      if (!loan) return res.status(404).json({ error: 'Loan not found' });

      loan.outstandingBalance -= amountPaid;
      if (loan.outstandingBalance <= 0) {
        loan.status = 'completed';
        loan.outstandingBalance = 0;
      }

      await loan.save();

      return res.json({ message: 'Loan updated successfully', loan });
    } catch (error) {
      console.error('Error updating Loan', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default LoanController;
