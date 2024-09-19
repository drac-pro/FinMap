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
    const {
      page = 1, limit = 10, fromDate, toDate, all = false, minAmount, maxAmount, source,
    } = req.query;

    try {
      const query = { userId: req.user._id };

      if (fromDate || toDate) {
        query.date = {};
        if (fromDate) query.date.$gte = new Date(fromDate);
        if (toDate) query.date.$lte = new Date(toDate);
      }

      if (minAmount || maxAmount) {
        query.amount = {};
        if (minAmount) query.amount.$gte = parseFloat(minAmount);
        if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
      }

      if (source) {
        query.source = { $regex: source, $options: 'i' };
      }

      if (all) {
        const incomes = await Income.find(query).sort({ date: -1 });
        return res.json({ incomes });
      }

      // Pagination logic using aggregation
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

      const result = await Income.aggregate([
        { $match: query },
        {
          $facet: {
            incomes: [
              { $sort: { date: -1 } },
              { $skip: skip },
              { $limit: parseInt(limit, 10) },
            ],
            totalCount: [
              { $count: 'count' },
            ],
          },
        },
      ]);

      const { incomes } = result[0];
      const totalIncomes = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;
      const totalPages = Math.ceil(totalIncomes / limit);

      // Generate nextPage and previousPage URLs
      const nextPage = (page < totalPages)
        ? `${req.baseUrl}?page=${parseInt(page, 10) + 1}&limit=${limit}${source ? `&source=${source}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}${toDate ? `&toDate=${toDate}` : ''}${minAmount ? `&minAmount=${minAmount}` : ''}${maxAmount ? `&maxAmount=${maxAmount}` : ''}`
        : null;
      const previousPage = (page > 1)
        ? `${req.baseUrl}?page=${parseInt(page, 10) - 1}&limit=${limit}${source ? `&source=${source}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}${toDate ? `&toDate=${toDate}` : ''}${minAmount ? `&minAmount=${minAmount}` : ''}${maxAmount ? `&maxAmount=${maxAmount}` : ''}`
        : null;

      return res.status(200).json({
        incomes,
        currentPage: parseInt(page, 10),
        totalPages,
        nextPage,
        previousPage,
      });
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
    const {
      page = 1, limit = 10, fromDate, toDate, all = false, minAmount, maxAmount, category,
    } = req.query;

    try {
      const query = { userId: req.user._id };

      if (fromDate || toDate) {
        query.date = {};
        if (fromDate) query.date.$gte = new Date(fromDate);
        if (toDate) query.date.$lte = new Date(toDate);
      }

      if (minAmount || maxAmount) {
        query.amount = {};
        if (minAmount) query.amount.$gte = parseFloat(minAmount);
        if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
      }

      if (category) {
        query.category = { $regex: category, $options: 'i' };
      }

      if (all) {
        const expenses = await Expense.find(query).sort({ date: -1 });
        return res.json({ expenses });
      }

      // Pagination logic using aggregation
      const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

      const result = await Expense.aggregate([
        { $match: query },
        {
          $facet: {
            expenses: [
              { $sort: { date: -1 } },
              { $skip: skip },
              { $limit: parseInt(limit, 10) },
            ],
            totalCount: [
              { $count: 'count' },
            ],
          },
        },
      ]);

      const { expenses } = result[0];
      const totalExpenses = result[0].totalCount.length > 0 ? result[0].totalCount[0].count : 0;
      const totalPages = Math.ceil(totalExpenses / limit);

      // Generate nextPage and previousPage URLs
      const nextPage = (page < totalPages)
        ? `${req.baseUrl}?page=${parseInt(page, 10) + 1}&limit=${limit}${category ? `&category=${category}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}${toDate ? `&toDate=${toDate}` : ''}${minAmount ? `&minAmount=${minAmount}` : ''}${maxAmount ? `&maxAmount=${maxAmount}` : ''}`
        : null;
      const previousPage = (page > 1)
        ? `${req.baseUrl}?page=${parseInt(page, 10) - 1}&limit=${limit}${category ? `&category=${category}` : ''}${fromDate ? `&fromDate=${fromDate}` : ''}${toDate ? `&toDate=${toDate}` : ''}${minAmount ? `&minAmount=${minAmount}` : ''}${maxAmount ? `&maxAmount=${maxAmount}` : ''}`
        : null;

      return res.status(200).json({
        expenses,
        currentPage: parseInt(page, 10),
        totalPages,
        nextPage,
        previousPage,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default FinanceController;
