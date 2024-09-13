import { Router } from 'express';
import BudgetController from '../controllers/BudgetController';
import AuthMiddleware from '../middleware/authMiddleware';

const budgetRouter = Router();

budgetRouter.post('/set', AuthMiddleware.authenticateToken, BudgetController.setBudget);
budgetRouter.get('/get/:category', AuthMiddleware.authenticateToken, BudgetController.getBudget);

export default budgetRouter;
