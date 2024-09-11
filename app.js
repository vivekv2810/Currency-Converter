document.getElementById('convert').addEventListener('click', convertCurrency);

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount === '') {
        alert('Please enter an amount.');
        return;
    }

    // Fetch live exchange rate from an API
    const apiKey = '8e111a3a526dd7ae83a37dd2'; // Replace with your actual API key
    const url = `https://v6.exchangerate-api.com/v6/8e111a3a526dd7ae83a37dd2/latest/USD`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById('result').innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        document.getElementById('result').innerText = 'Error fetching exchange rates. Please try again later.';
    }
}