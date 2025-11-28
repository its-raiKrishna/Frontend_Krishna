const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");

let expenses = [];

let chart;

// -----------------------------
// Add Expense
// -----------------------------
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);

    // Validation
    if (!title || !amount || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    const newExpense = { title, amount, id: Date.now() };

    // Spread operator to add new object
    expenses = [...expenses, newExpense];

    // UI update
    addToList(newExpense);
    updateChart();

    form.reset();
});

// -----------------------------
// Add list item to UI
// -----------------------------
function addToList({ title, amount }) {
    // destructuring ↑

    const li = document.createElement("li");
    li.textContent = `${title} - ₹${amount}`;
    list.appendChild(li);
}

// -----------------------------
// Chart Update
// -----------------------------
function updateChart() {
    // extract titles & amounts using map()
    const labels = expenses.map((e) => e.title);
    const data = expenses.map((e) => e.amount);

    if (chart) chart.destroy();

    const ctx = document.getElementById("expenseChart").getContext("2d");

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels,
            datasets: [{
                data,
                borderWidth: 1
            }]
        }
    });
}
