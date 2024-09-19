import * as tf from '@tensorflow/tfjs';

// Recommendation function
async function recommendSpendingImprovements(expenses) {
    // Extract unique categories from expenses
    const categories = Array.from(new Set(expenses.map(exp => exp.category)));

    const expenseCategoryIndices = expenses.map(exp => categories.indexOf(exp.category));
    const expenseAmounts = expenses.map(exp => exp.amount);

    // Convert to Tensor (normalize data)
    const inputTensor = tf.tensor2d(expenseCategoryIndices, [expenseCategoryIndices.length, 1]);
    const amountTensor = tf.tensor2d(expenseAmounts, [expenseAmounts.length, 1]);

    // Dummy model for example
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    // Train the model
    await model.fit(inputTensor, amountTensor, { epochs: 50, shuffle: true });

    // Get the predicted amounts by passing the category indices through the trained model
    const predictedAmounts = model.predict(inputTensor).dataSync();

    // Compute total expenses per category
    const categoryTotals = categories.map((category, index) => ({
        category: category,
        total: predictedAmounts.reduce((total, amount, i) => (expenseCategoryIndices[i] === index ? total + amount : total), 0)
    }));

    // Find the category with the highest total expenses
    const maxTotalCategory = categoryTotals.reduce((max, category) => (category.total > max.total ? category : max), categoryTotals[0]);

    return {
        suggestion: `Consider reducing expenses in ${maxTotalCategory.category} category.`,
        categories: categories // Include the dynamically generated categories array in the return object
    };
}

export default recommendSpendingImprovements;
