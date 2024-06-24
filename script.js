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
}

function selectToCurrency(currency) {
    document.querySelectorAll('#toCurrency .currency-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.querySelector(`#toCurrency .currency-option[data-currency="${currency}"]`).classList.add('selected');
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

// Initialize with default selection
selectFromCurrency('usdc');
