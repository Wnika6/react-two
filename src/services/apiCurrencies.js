const url = "https://api.nbp.pl/api/exchangerates/rates/A/";

const fetchCurrencies = async (amount, currency) => {
    const response = await fetch(`${url}${currency}`);
    const data = await response.json();
    return data;
};

export default fetchCurrencies;
