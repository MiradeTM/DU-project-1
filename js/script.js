//button 1 = city-search
//button 2 = more-info
//button 3 = compare
//button 4 = compare2
//button 5 = save-item
//button 6 = search-again

$("#city-search").on("click", function () {
	// ? CREATE/CHECK ELEMENTS FIRST
	// ? QUERY APIs
	// ? POPULATE ELEMENTS VIA IDs & CLASSES
	// ? MOVE PAGE VIA JQUERY
  var city = $("#outboundCity").val();

  var cityAirportCode = airports.filter(function (forecast) {
    return forecast.city.includes(city);
    // define a variable for airport code
    //set airport code.text
    //modal to confirm radio group select airport and confirm shoot down to second section, add submit button.
    //modal please select city
  });

  console.log(cityAirportCode);
});

var settings = {
  async: true,
  crossDomain: true,
  url:
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/DEN/Aba/2020-08-13" /* `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${outbound-city}/${inbound-city}/2020-09-01`,*/,
  method: "GET",
  headers: {
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": "7c47b2fe8fmsh63683bae1988c2fp1fbb32jsn3a82c96b46b9",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

fnStepTwo(2);

//ajax call for Skyscanner

// action functions
function fnSave() {
	// add primary destination to local obj array
}


// step functions
function fnStepOne() {
  // blank for initializing page
}

// 2
function fnStepTwo(st) {
  fnCommonRow(st);
  fnCreateParallax(st);

  let row1 = $(`<div class="row">`);
  let row2 = $(`<div class="row">`);
  // attach to #step-${st}
  $(`#step-${st}`).append(row1);
  $(`#step-${st}`).append(row2);

  // row 1 // image & flight info
  // image
  let el1 = $(`<div class="col m3">`);
  el1.append(imageArea);
  let imageArea = $(
    `<img class="primary-destination-img" id="prime-img" src="">`
	); 
	// ? DATA HOOKS
	// ! data query should send to class
  row1.append(el1);

  // flight info
  let el2 = $(`<div class="col m9">`);
  let elHead = $(`<h2 class="primary-destination-head" id="prime-head">`);
  let elInfo = $(`<p class="primary-destination-info" id="prime-info">`);
	// ? DATA HOOKS
	// ! data query should send to class
  el2.append(elHead);
  el2.append(elInfo);
  row1.append(el2);

  // row 2 // buttons
  // more info button
  let el3 = $(`<div class="col m6" style="text-align:right;">`);
  let btn1 = $(`<a id="more-info" data-step="3"
	class="btn-large waves-effect waves-light new-red-lighten-1"
	>`);
  btn1.text("See More Info");
  el3.append(btn1);
  row2.append(el3);

  // jump to compare button
  let el4 = $(`<div class="col m9">`);
  let btn2 = $(`<a id="compare" data-step="4"
	class="btn-large waves-effect waves-light new-red-lighten-1"
	>`);
	btn2.text("Compare");
	el4.append(btn2)
	row2.append(el4)
}

// 3
function fnStepThree(st) {
	fnCommonRow(st);
	fnCreateParallax(st);

	let cardOrder = ["Weather","Phrases","Currency"]

	let row1 = $(`<div class="row">`);
	let row2 = $(`<div class="row">`);

	// row 1 // cards
	for(let i = 0; i <=2; i++) {
		let card = $(`<div class="card">`)
		let cardContent = $(`<div class="card-content">`)
		if(i==0) let cardTitle = $(`<span class="card-title" id="card-${cardOrder[i]}">`)
		if(i==0) let cardTitle = $(`<p id="card${cardOrder[i]}">`)
	}

}

// 4 // reset
function fnStepFour(st) {}

// creates the first container and row common to each section, if they don't exist yet
function fnCommonRow(s) {
  // arg = step number
  if ($(`#step-${s}`).length) {
    // already exists
    // console.log("it exists");
  } else {
    // create new
    console.log("it does not");
    let el1 = $(`<div class='container'>`);
    let el2 = $(`<div class='section' id='step-${s}'>`);
    el1.append(el2);
    // el1.text("hello");
    // el2.text("world");
    // $("#index-banner").append(el1)
    $("#main-content").append(el1);
    el1.append(el2);
  }
}

// create parallax image section, if it doesn't exist
function fnCreateParallax(s) {
  // arg = step number
  if ($(`#jump-${s}`).length) {
    // exists
  } else {
    let el1 = $(`<div class="parallax-container align-wrapper">`);
    let el2 = $(`<div class="section no-pad-bot" id='jump-${s}'>`);
    let el3 = $(`<div class="container">`);
    let el4 = $(`<div class="row center">`);
    el1.append(el2);
    el2.append(el3);
    el3.append(el4);
    let el5 = $(`<div class='parallax'>`);
    let el6 = $(`<img src='Assets/jumbo-${s}.png'>`);
    el1.append(el5);
    el5.append(el6);

    el1.append(el2);
    $("#main-content").append(el1);
  }
}
