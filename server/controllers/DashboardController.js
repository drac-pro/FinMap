import Income from '../models/incomeModel';
import Expense from '../models/expenseModel';
import Budget from '../models/budgetModel';

class DashboardController {
  // Get overview of income, expenses, and savings
  static async getOverview(req, res) {
    try {
      const userId = req.user._id;

      const budgets = await Budget.find({ userId });

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

      // collect budget details
      const budgetDetails = budgets.map((budget) => ({
        category: budget.category,
        allocatedAmount: budget.allocatedAmount,
        spentAmount: budget.spentAmount,
        remainingAmount: budget.allocatedAmount - budget.spentAmount,
        status: budget.status,
      }));

      return res.json({
        totalIncome: incomeTotal,
        totalExpenses: expenseTotal,
        savings,
        budgets: budgetDetails,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default DashboardController;
