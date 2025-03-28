function depositProfit(deposit, rate, threshold) {
    let balance = deposit;
    let years = 0;
    while (balance < threshold) {
        balance = balance + (balance * rate / 100);
        years++;
    }
    return years;
}

function depositProfit(d, r, t) {
    return Math.ceil(Math.log(t / d) / Math.log(r / 100 + 1));
}

// logB(X) = y :: b ** Y = x
y = Math.log(x) / Math.log(b);
x = b ** y;
