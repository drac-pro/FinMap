import Budget from '../models/budgetModel';

class BudgetController {
  // set or Update Budget
  static async setBudget(req, res) {
    const {
      name, category, allocatedAmount, startDate, endDate, notifications,
    } = req.body;

    try {
      const budget = await Budget.findOneAndUpdate(
        { userId: req.user._id, category },
        {
          name, allocatedAmount, startDate, endDate, notifications, status: 'active',
        },
        { new: true, upsert: true },
      );

      return res.status(201).json({ message: 'Budget set successfully', budget });
    } catch (error) {
      console.error('Error setting Budget: ', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Get User's Budget by Category
  static async getBudget(req, res) {
    const {
      category, fromDate, toDate, status, all = false, limit = 10, page = 1,
    } = req.query;

    try {
      const query = { userId: req.user._id };

      if (category) {
        query.category = { $regex: category, $options: 'i' };
      }

      if (status) {
        query.status = status;
      }

      if (fromDate || toDate) {
        query.startDate = {};
        if (fromDate) query.startDate.$gte = new Date(fromDate);
        if (toDate) query.startDate.$lte = new Date(toDate);
      }

      let budgets;
      if (all) {
        budgets = await Budget.find(query).sort({ startDate: -1 });
      } else {
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        budgets = await Budget.find(query)
          .sort({ startDate: -1 })
          .skip(skip)
          .limit(parseInt(limit, 10));
      }

      return res.json({ budgets });
    } catch (error) {
      console.error('Error getting Budget', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default BudgetController;
