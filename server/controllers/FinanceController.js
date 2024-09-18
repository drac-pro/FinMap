import Income from '../models/incomeModel';
import Expense from '../models/expenseModel';
import Budget from '../models/budgetModel';

// Controller for Income and Expense related logic
class FinanceController {
  // log income
  static async logIncome(req, res) {
    const { amount, source } = req.body;

    try {
      const income = await Income.create({
        amount,
        source,
        userId: req.user._id,
      });

      return res.status(201).json({ message: 'Income logged successfully', income });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Get all Incomes for the user
  static async getIncome(req, res) {
    try {
      const incomes = await Income.find({ userId: req.user._id });
      return res.status(200).json({ incomes });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Log Expenses
  static async logExpense(req, res) {
    const { description, amount, category } = req.body;
    try {
      const expense = await Expense.create({
        userId: req.user._id,
        description,
        amount,
        category,
      });

      // Find the matching budget for this category and update it if it exists
      const budget = await Budget.findOne({ userId: req.user._id, category });
      if (budget) {
        budget.spentAmount += amount;

        const spentPercentage = (budget.spentAmount / budget.allocatedAmount) * 100;

        if (budget.spentAmount > budget.allocatedAmount) {
          budget.status = 'exceeded';
        } else if (spentPercentage >= 100) {
          budget.status = 'completed';
        } else if (spentPercentage >= 75) {
          budget.status = 'warning';
        } else {
          budget.status = 'active';
        }
        await budget.save();
      }

      return res.status(201).json({ message: 'Expense logged successfully', expense });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Get all Expenses for the user
  static async getExpense(req, res) {
    try {
      const expenses = await Expense.find({ userId: req.user._id });
      return res.status(200).json({ expenses });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default FinanceController;
