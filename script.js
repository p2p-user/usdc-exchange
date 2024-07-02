document.querySelectorAll('.currency-option').forEach(option => {
    option.addEventListener('click', function() {
        if (this.closest('#fromCurrency')) {
            selectFromCurrency(this.dataset.currency);
        } else if (!this.classList.contains('disabled')) {
            selectToCurrency(this.dataset.currency);
        }
    });
});

function selectFromCurrency(currency) {
    document.querySelectorAll('#fromCurrency .currency-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`#fromCurrency .currency-option[data-currency="${currency}"]`).classList.add('selected');
    updateToCurrencyOptions(currency);
    updateExchangeButtonState();
}

function selectToCurrency(currency) {
    document.querySelectorAll('#toCurrency .currency-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`#toCurrency .currency-option[data-currency="${currency}"]`).classList.add('selected');
    updateExchangeButtonState();
}

function updateToCurrencyOptions(selectedCurrency) {
    document.querySelectorAll('#toCurrency .currency-option').forEach(option => {
        if (selectedCurrency === 'rub') {
            option.classList.toggle('disabled', option.dataset.currency !== 'usdc');
        } else if (selectedCurrency === 'btc' || selectedCurrency === 'eth') {
            option.classList.toggle('disabled', option.dataset.currency === selectedCurrency || option.dataset.currency === 'rub');
        } else {
            option.classList.toggle('disabled', option.dataset.currency === selectedCurrency);
        }
        option.classList.remove('selected');
    });
}

function updateExchangeButtonState() {
    const selectedFromCurrency = document.querySelector('#fromCurrency .currency-option.selected');
    const selectedToCurrency = document.querySelector('#toCurrency .currency-option.selected');
    const exchangeButton = document.getElementById('exchangeButton');
    
    exchangeButton.disabled = !(selectedFromCurrency && selectedToCurrency);
}

function getExchangeUrl(fromCurrency, toCurrency) {
    if ((fromCurrency === 'rub' && toCurrency === 'usdc') || (fromCurrency === 'usdc' && toCurrency === 'rub')) {
        return 'https://www.bybit.com/fiat/trade/otc/profile/70393754/USDC/RUB/item';
    } else {
        return 'https://t.me/usdc_exchange';
    }
}

document.getElementById('exchangeButton').addEventListener('click', function() {
    const selectedFromCurrency = document.querySelector('#fromCurrency .currency-option.selected').dataset.currency;
    const selectedToCurrency = document.querySelector('#toCurrency .currency-option.selected').dataset.currency;
    const url = getExchangeUrl(selectedFromCurrency, selectedToCurrency);
    window.open(url, '_blank');
});

selectFromCurrency('usdc');

