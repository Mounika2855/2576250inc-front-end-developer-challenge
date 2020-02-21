function doSubscribe() {
	const firstName = document.getElementById('firstName').value;
	const lastName = document.getElementById('lastName').value;
	const email = document.getElementById('email').value;
	const homeOwner = document.querySelector('input[name="homeowner"]:checked').value;
	const buyingHouseIn = document.getElementById('buyingWhen').value;
	
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (xhr.readyState===4 && xhr.status===200) {
	    	const response = JSON.parse(xhr.responseText);

	    	// actual success logic goes here
	    }
	};
	xhr.open('POST', 'https://dummyurl.com');
	xhr.send({
		firstName: firstName,
		lastName: lastName,
		email: email,
		homeOwner: homeOwner,
		buyingWhen: buyingHouseIn
	});

	document.getElementById('subscribe').reset();
	document.getElementById('subscribe-success-toaster').style.display='block';
	setTimeout(function(){ document.getElementById('subscribe-success-toaster').style.display='none'; }, 2000);
}