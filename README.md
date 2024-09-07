# 💰 FinMap - Personal Finance Dashboard with AI-Powered Insights

![Project Banner](https://placehold.co/1000x300?text=FinMap)

FinMap is a full-stack web application to manage your finances effortlessly. Track your expenses, set budgets, monitor your investments, and get personalized AI-powered insights based on your spending habits. Built with Node.js, Express, MongoDB, React, and integrated with real-time financial APIs, FinMap delivers a modern solution to personal financial management.

## 🚀 Project Overview

Managing personal finances can be challenging. FinMap offers an intuitive platform to help users:

- **Track income and expenses**: Easily log and categorize all your transactions.
- **Set budgets**: Plan and manage your budgets across different expense categories.
- **Monitor investments**: Stay updated on the performance of your stock portfolio.
- **AI-Powered Insights**: Receive smart recommendations and insights on how to optimize your spending and saving habits.
- **Multi-currency support**: Convert between different currencies using real-time exchange rates.
- **Notifications**: Get alerts when you exceed budgets or achieve financial goals.
  
FinMap is built to showcase the combined power of modern web technologies, machine learning, and seamless API integrations.

---

## 🛠️ Tech Stack

### **Backend**

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for efficient data storage.
- **JWT**: JSON Web Tokens for secure user authentication.

### **Frontend**

- **React**: Dynamic and responsive user interface development.
- **Chart.js**: Beautiful data visualization for dashboards and reports.
- **Tailwind CSS**: Modern utility-first CSS framework for styling.

### **AI & Integrations**

- **TensorFlow.js**: AI-powered insights and machine learning in the browser.
- **Alpha Vantage API**: Real-time stock and financial data integration.
- **ExchangeRate-API**: Real-time currency conversion.
  
---

## ✨ Features

- **User Authentication**: Secure sign-up, login, and authentication using JWT.
- **Expense & Income Tracking**: Categorize and log your daily transactions.
- **Budget Planner**: Create and track budgets to stay on top of your finances.
- **Investment Portfolio**: Track stocks and see how your portfolio is performing.
- **AI Insights**: Get smart financial tips and patterns from your spending history.
- **Multi-Currency Support**: Track expenses and investments in different currencies.
- **Notifications**: Set alerts for overspending or savings milestones.

---

## 📦 Getting Started

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Install MongoDB](https://www.mongodb.com/try/download/community)
- **Alpha Vantage API Key**: [Sign up for free](https://www.alphavantage.co/support/#api-key)
- **ExchangeRate API Key**: [Get an API key](https://www.exchangerate-api.com/)

### **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/finmap.git
    cd finmap
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root of your project and add the following:

    ```bash
    PORT=3000
    DB_HOST=localhost
    DB_PORT=27017
    DB_DATABASE=finmap
    ALPHA_VANTAGE_API_KEY=your-api-key
    EXCHANGE_RATE_API_KEY=your-api-key
    JWT_SECRET=your-secret-key
    ```

4. **Start the server**:

    ```bash
    npm start
    ```

5. **Run the frontend**:

    ```bash
    cd client
    npm start
    ```

---

## 🧠 AI-Powered Insights

FinMap uses **TensorFlow.js** to analyze user spending patterns and provide personalized recommendations. By continuously learning from user data, the AI-powered insights offer tailored advice, helping users optimize their financial health.

---

## 💼 Investment Portfolio

Track and manage your investments with real-time stock data using the **Alpha Vantage API**. Easily view portfolio performance and make informed decisions based on up-to-date financial information.

---

## 🌍 Multi-Currency Support

Easily convert your financial data into different currencies with the **ExchangeRate API**. Whether you’re tracking foreign investments or just converting expenses, multi-currency support keeps everything updated with live exchange rates.

---

## 🛡️ Security

- **JWT Authentication**: Secures your data with industry-standard token-based authentication.
- **Secure API Requests**: All API requests are made over HTTPS to ensure the security and integrity of your data.

---

## 🤖 Future Enhancements

- **Bank Account Integration**: Using the **Plaid API** to allow users to link bank accounts directly.
- **Premium User Accounts**: Offer premium features such as advanced AI insights and detailed reports.
- **Dark Mode**: Enhance user experience with a dark mode toggle.

---

## 📈 Data Visualization

Our dashboard uses **Chart.js** to display financial data in a visually appealing and informative way. Track your income, expenses, and budget progress with dynamic charts and graphs that update in real-time.

---

## 🚨 Notifications

Receive alerts and notifications when you:

- Exceed your budget
- Reach savings goals
- Achieve financial milestones

---

## 🧪 Running Tests

Run backend and frontend tests to ensure everything is working correctly:

```bash
npm test
```

## 🎨 UI/UX

The application features a modern, responsive UI designed with Tailwind CSS, ensuring a seamless experience across all devices.

## 👥 Team

- Backend Developer: Darius Tohtin
- Frontend Developer: Your Name
- AI & API Integrations: Your Name

## 📄 License

This project is licensed under the MIT LICENCE - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

If you have any questions or feedback, feel free to reach out:

- Darius Tohtin: [Github](https://github.com/drac-pro) [Email](dariustohtin@gmail.com)
- Therese-Claire Agabi:
