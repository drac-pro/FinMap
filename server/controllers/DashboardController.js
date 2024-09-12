import Income from '../models/incomeModel';
import Expense from '../models/expenseModel';

class DashboardController {
  // Get overview of income, expenses, and savings
  static async getOverview(req, res) {
    try {
      const userId = req.user._id;

      const totalIncome = await Income.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);

      const totalExpenses = await Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]);

      const incomeTotal = totalIncome[0]?.total || 0;
      const expenseTotal = totalExpenses[0]?.total || 0;
      const savings = incomeTotal - expenseTotal;

      return res.json({
        totalIncome: incomeTotal,
        totalExpenses: expenseTotal,
        savings,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default DashboardController;
