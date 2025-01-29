let balance = 5000;
const balanceElement = document.getElementById("balance");
const historyElement = document.getElementById("history");


document.getElementById("deposit-form").addEventListener("submit", function(event){
    event.preventDefault();
    deposit();
});

document.getElementById("withdraw-form").addEventListener("submit", function(event){
    event.preventDefault();
    withdraw();
});

function deposit() {
    let amount = parseFloat(document.getElementById("deposit-amount").value);
    if (isNAN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
        balance += amount;
        updateBalance();
        recordTransaction ('Deposited: ₱${amount}');
        document.getElementById("deposit-amount").value = "";
    }


function withdraw() {
    let amount = parseFloat(document.getElementById("withdraw-amount").value);
    if (isNAN(amount) || amount<= 0 || amount > balance) {
        alert("Please enter a valid withdrawal amount");
        return;
    }
        balance -= amount;
        updateBalance();
        recordTransaction ('Withdrawn: ₱${amount}');
        document.getElementById("withdraw-amount").value = "";

}

function updateBalance() {
    balanceElement.textContent = balance;
}

function recordTransaction(message) {
    let li = document.createElement("li");
    li.textContent = message;
    historyElement.prepend(li);
}
