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
    const { category } = req.params;

    try {
      const budget = await Budget.findOne({ userId: req.user._id, category });
      if (!budget) return res.status(404).json({ error: 'No buget for this category' });

      return res.json({ budget });
    } catch (error) {
      console.error('Error getting Budget', error.message);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

export default BudgetController;
