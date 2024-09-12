import { Router } from 'express';
import FinanceController from '../controllers/FinanceController';
import AuthMiddleware from '../middleware/authMiddleware';

const financeRouter = Router();

// Route to log income
financeRouter.post('/income', AuthMiddleware.authenticateToken, FinanceController.logIncome);
financeRouter.get('/income', AuthMiddleware.authenticateToken, FinanceController.getIncome);

financeRouter.post('/expense', AuthMiddleware.authenticateToken, FinanceController.logExpense);
financeRouter.get('/expense', AuthMiddleware.authenticateToken, FinanceController.getExpense);

export default financeRouter;
