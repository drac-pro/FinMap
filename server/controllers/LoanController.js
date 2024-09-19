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

      // Pagination logic using aggregation
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

      const result = await Loan.aggregate([
        { $match: query },
        {
          $facet: {
            loans: [
              { $sort: { loanDate: -1 } },
              { $skip: skip },
              { $limit: parseInt(limit, 10) },
            ],
            totalCount: [
              { $count: 'count' },
            ],
          },
        },
      ]);

      const { loans } = result[0];
      const totalLoans = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;
      const totalPages = Math.ceil(totalLoans / limit);

      // Generate nextPage and previousPage URLs
      const nextPage = (page < totalPages)
        ? `${req.baseUrl}?page=${parseInt(page, 10) + 1}&limit=${limit}${loanType ? `&loanType=${loanType}` : ''}${status ? `&status=${status}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}${toDate ? `&toDate=${toDate}` : ''}`
        : null;
      const previousPage = (page > 1)
        ? `${req.baseUrl}?page=${parseInt(page, 10) - 1}&limit=${limit}${loanType ? `&loanType=${loanType}` : ''}${status ? `&status=${status}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}${toDate ? `&toDate=${toDate}` : ''}`
        : null;

      return res.json({
        loans,
        currentPage: parseInt(page, 10),
        totalPages,
        nextPage,
        previousPage,
      });
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
