//button 1 = city-search
//button 2 = more-info
//button 3 = compare
//button 4 = compare2
//button 5 = save-item
//button 6 = search-again

$('#city-search').on('click', function(){
//function search cities


})
function searchCities(){
    //sift through object
}

//ajax call for Skyscanner
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/DEN/Aba/2020-08-13", /* `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${outbound-city}/${inbound-city}/2020-09-01`,*/
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"x-rapidapi-key": "7c47b2fe8fmsh63683bae1988c2fp1fbb32jsn3a82c96b46b9"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
