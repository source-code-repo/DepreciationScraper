var AVERAGE_WAIT_TIME = 2000;
var overallResult = [];

// Find all prices on results page
function getPrices() {
	// Find all <li> search results
	var x = document.getElementsByClassName("search-page__result");
	var i = x.length;
	var result = [];

	// Extract price and year for each result
	while(i--) {
		var price = x[i].getElementsByClassName("vehicle-price")[0].innerHTML;
		var year = x[i].getElementsByClassName("listing-key-specs")[0].childNodes[1].innerHTML;

		// Clean up price
		price = price.replace('£', '');
		price = price.replace(',', '');

		// Ensure year is of format 20XX e.g. 2016
		// Filters out Cat C, Cat D which return "3" instead of a year
		if(year.match(/20\d\d/) !== null) {
			// Clean up year (remove "64 reg")
			year = year.match(/\d+/)[0];

			// Save result
	    		result.push(year + "," + price + "\n");
		}
	}

	return result;
}

// Get current page data, execute next page 
function process() {
	// Get current page's data
	overallResult = overallResult.concat(getPrices());

	var morePages = nextPage();

	if(morePages) {
		// Wait then call this method again
		waitCallback();
	} else {
		// Print results and exit
		console.log(overallResult.join(""));
		return;
	}
}

// Go to next page
// Returns true if successful, false if no next page is found
function nextPage() {
	var nextLink = document.getElementsByClassName("paginationMini--right__active")[0];
	if(nextLink !== undefined) {
		nextLink.click();
		return true;	
	} else {
		return false
	}
}

// Wait a random time then call back the process function
function waitCallback() {
	var waitTime = Math.random() * 2 * AVERAGE_WAIT_TIME;
	if(waitTime < 1000) {
		waittime = 1000;
	}
	setTimeout(process, waitTime);
}

process();
