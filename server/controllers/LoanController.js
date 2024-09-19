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
    const {
      loanType, fromDate, toDate, status, page = 1, limit = 10, all = false,
    } = req.query;

    try {
      const query = { userId: req.user._id };

      if (loanType) query.loanType = loanType;
      if (status) query.status = status;
      if (fromDate && toDate) query.loanDate = { $gte: new Date(fromDate), $lte: new Date(toDate) };

      if (all) {
        const loans = await Loan.find(query).sort({ loanDate: -1 });
        return res.json({ loans });
      }

      // remember to use agregation to add count
      // and implement next and previous for all pagination so far
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
      const loans = await Loan.find(query)
        .sort({ loanDate: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10));

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
