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
            if (option.dataset.currency === 'usdc') {
                option.classList.remove('disabled');
            } else {
                option.classList.add('disabled');
            }
        } else {
            if (option.dataset.currency === selectedCurrency) {
                option.classList.add('disabled');
            } else {
                option.classList.remove('disabled');
            }
        }
        option.classList.remove('selected');
    });
}

function updateExchangeButtonState() {
    const selectedFromCurrency = document.querySelector('#fromCurrency .currency-option.selected');
    const selectedToCurrency = document.querySelector('#toCurrency .currency-option.selected');
    const exchangeButton = document.getElementById('exchangeButton');
    
    if (selectedFromCurrency && selectedToCurrency) {
        exchangeButton.disabled = false;
    } else {
        exchangeButton.disabled = true;
    }
}

function getExchangeUrl(fromCurrency, toCurrency) {
    if (fromCurrency === 'usdc' && toCurrency === 'usdc') {
        return 'https://t.me/usdc_exchange';
    } else if (fromCurrency === 'usdc' && toCurrency === 'rub') {
        return 'https://www.bybit.com/fiat/trade/otc/profile/70393754/USDC/RUB/item';
    } else if (fromCurrency === 'usdc' && (toCurrency === 'btc' || toCurrency === 'eth')) {
        return 'https://t.me/usdc_exchange';
    }
    return '#';
}

document.getElementById('exchangeButton').addEventListener('click', function() {
    const selectedFromCurrency = document.querySelector('#fromCurrency .currency-option.selected').dataset.currency;
    const selectedToCurrency = document.querySelector('#toCurrency .currency-option.selected').dataset.currency;
    const url = getExchangeUrl(selectedFromCurrency, selectedToCurrency);
    window.open(url, '_blank');
});

selectFromCurrency('usdc');


