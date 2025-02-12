let balance = parseFloat(localStorage.getItem("balance")) || 5000;
const balanceElement = document.getElementById("balance");
const transactionsElementElement = document.getElementById("transactions");

function loadTransactions() {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    storedTransactions.forEach(transactions => {
        recordTransaction(transactions.status, transactions.amount, transactions.date, false);
    }
);
}
function updateBalance() {
    balanceElement.textContent = balance;
    localStorage.setItem("balance", balance);
}

function recordTransaction(status, amount, date=null, save=true) {
    if (!date) {
        date = new Date().toLocaleDateString();
    }

    let row = document.createElement("tr");
    row.innerHTML = `<td>${date}</td><td>${status}</td><td>₱${amount}</td>`;
    transactionsElementElement.appendChild(row);

    if(save){
        let storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        storedTransactions.push({date, status, amount});
        localStorage.setItem("transactions", JSON.stringify(storedTransactions));
    }
}


function withdraw() {
    let amount = parseFloat(document.getElementById("withdraw-amount").value);
    if (isNaN(amount) || amount<= 0 || amount > balance) {
        alert("Please enter a valid withdrawal amount");
        return;
    }
    balance -= amount;
    updateBalance();
    recordTransaction ('Withdrew', amount);
    document.getElementById("withdraw-amount").value = "";
    
}
function deposit() {
    let amount = parseFloat(document.getElementById("deposit-amount").value);
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
        balance += amount;
        updateBalance();
        recordTransaction ('Deposited', amount);
        document.getElementById("deposit-amount").value = "";
    }

document.getElementById("clear-history").addEventListener("click", function() {
        localStorage.removeItem("transactions"); // Remove transaction history
        localStorage.removeItem("balance"); // Reset balance
        location.reload(); // Refresh the page to apply changes
    });
    



document.getElementById("deposit-form").addEventListener("submit", function(event){
    event.preventDefault();
    deposit();
});

document.getElementById("withdraw-form").addEventListener("submit", function(event){
    event.preventDefault();
    withdraw();
});


updateBalance();
loadTransactions();

