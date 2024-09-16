import { Router } from 'express';
import LoanController from '../controllers/LoanController';
import AuthMiddleware from '../middleware/authMiddleware';

const loanRouter = Router();

loanRouter.post('/log', AuthMiddleware.authenticateToken, LoanController.logLoan);
loanRouter.get('/all', AuthMiddleware.authenticateToken, LoanController.getLoans);
loanRouter.put('/update', AuthMiddleware.authenticateToken, LoanController.updateLoan);

export default loanRouter;
