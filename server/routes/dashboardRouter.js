import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';
import AuthMiddleware from '../middleware/authMiddleware';

const dashboardRouter = Router();

// Route to get overview of income, expenses, and savings
dashboardRouter.get('/overview', AuthMiddleware.authenticateToken, DashboardController.getOverview);

export default dashboardRouter;
