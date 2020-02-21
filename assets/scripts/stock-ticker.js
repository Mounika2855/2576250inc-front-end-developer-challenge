const getDateStringByDays = (noOfDays) => {
	const d = new Date();
	d.setDate(d.getDate() + noOfDays);
	return d.toISOString().split('T')[0];
}

const updateStockTickerData = (stockSymbol, currentPrice, prevPrice) => {
	const priceElement = document.getElementById(stockSymbol + '-PRICE');
	priceElement.innerText = Number(currentPrice).toFixed(2);
	const priceChange = (Number(currentPrice)-Number(prevPrice));
	document.getElementById(stockSymbol + '-PRICE-CHANGE').innerText = priceChange.toFixed(2);
	if(priceChange<0) {
		priceElement.style.color = 'red';
	} else {
		priceElement.style.color = 'green';
	}
}

const loadStockTicker = (stockSymbol) => {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState===4 && xhr.status===200) {
	    	const response = JSON.parse(xhr.responseText);

	    	const currDate = getDateStringByDays(0);
	    	const yesterdayDate = getDateStringByDays(-1);
	    	const dayBeforeYesterdayDate = getDateStringByDays(-2);

	    	const priceDetails = response['Time Series (Daily)'];
	    	const currPrice = priceDetails[currDate] ? priceDetails[currDate]['4. close'] : priceDetails[yesterdayDate]['4. close'];
	    	const prevPrice = priceDetails[currDate] ? priceDetails[yesterdayDate]['4. close'] : priceDetails[dayBeforeYesterdayDate]['4. close'];


	    	updateStockTickerData(stockSymbol, currPrice, prevPrice);
	    }
	};
	xhr.open('GET', 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=JQ1LE8WZCWJRAMXL&symbol=' + stockSymbol);
	xhr.send();
}

loadStockTicker('BTCUSD');
loadStockTicker('MSFT');
loadStockTicker('GOOGL');