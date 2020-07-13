// GLOBAL VARIABLES

let current = {};
let saved = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

//button 1 = city-search
//button 2 = more-info
//button 3 = compare
//button 4 = compare2
//button 5 = save-item
//button 6 = search-again
var departCode;
var departureList = [];




let currentTrip = {
  lang: "",
  currency: "",
};
let savedTrips = [];

let translation = {
  phrases: [
    "Hello",
    "Do you speak English?",
    "Please",
    "Thank You",
    "Excuse me.",
    "Where is the bathroom?",
    "Cheers!",
    "I’m sorry",
    "How much does it cost?",
    "What’s your name?",
    "Sorry, I Don’t Understand",
    "Goodbye",
  ],
  target: [],
  targetName: "",
};


$("#city-search").on("click", function () {
  var multilist = false;
  var multicountries = false;
  // ? CREATE/CHECK ELEMENTS FIRST
  // If the elements already exist, remove them
  // ? QUERY APIs
  // ? POPULATE ELEMENTS VIA IDs & CLASSES
  // ? MOVE PAGE VIA JQUERY
  var city = $("#outboundCity").val();
  var arrivalCity = $("#inboundCity").val();
  var testing = airports.filter(function(something){
    //filters out info for arrival city
    return something.city.includes(arrivalCity);
  })
  console.log("click");
  fnStepTwo(2);
  var city = $("#outboundCity").val();

  $("html, body").animate(
    {
      scrollTop: $(`#step-2`).offset().top,
    },
    2000
  );

  var cityAirportCode = airports.filter(function (forecast) {
    return forecast.city.includes(city);
    // define a variable for airport code
    //set airport code.text
    //modal to confirm radio group select airport and confirm shoot down to second section, add submit button.
    //modal please select city
  })
  console.log(testing);
  departCode = cityAirportCode[0].code;
  console.log(cityAirportCode);

  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/DEN/Aba/2020-08-13",
      // `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/ELS/DIA/2020-07-13`
    method: "GET",
    headers: {
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "7c47b2fe8fmsh63683bae1988c2fp1fbb32jsn3a82c96b46b9",
    },
  };
  $.ajax(settings).done(function (response) {
  
    console.log(response);
  });

  
  


  // checks if there is more than one airport for that location
  //wanted to start i @ 0 but causes issue if only one airport
  for (var i = 0; i < cityAirportCode.length; i++) {
    if (cityAirportCode[i+1].country !== cityAirportCode[i].country) {
      //need to make modal list of first 5 countries to choose from
      console.log(cityAirportCode[i].country);
      departureList.push(cityAirportCode[0].country,cityAirportCode[1].country);

      var selection = departureList.forEach(function(selection) {
        console.log(selection);
      });

      // create selection box dynamically dont use alert
      alert("Please specify which Airport" + departureList );
      console.log(departureList);
      multiCountries = true;
      return false;
    }
  }

  if (multicountries) {

    alert("Too many");
    country = "user selected country goes here";
    cityAirportCode.filter(function(airport) {
      return airport.country === country;
    });

  }

  if (cityAirportCode.length > 1){
    multilist = true;
  }

  if (multilist) {
    //logic of generating select menu of airport options
  } else {
    //else just use cityAirportCode[0].code

  }

  

});



fnStepTwo(2)
fnStepThree(3);
fnStepFour(4);

  console.log(cityAirportCode);


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

// fnTranslate("generate")

//ajax call for Skyscanner



// action functions
function fnSave() {
  // add primary destination to local obj array
}

function fnReset() {
$('#2').remove();
$('#3').remove();
$('#4').remove();  
}

function fnTranslate(action) {
  // get data
  // new lang from object: translation
  // edit data for formatting
  // ajax request
  // parse response
  // send data to data hooks
  let googleKey = "AIzaSyBvAzIcdH6h1MADdn0MMEdWsMgB0HyR0Sg";

  // shuffle phrases
  for (let i = translation.phrases.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    const temp = translation.phrases[i];
    translation.phrases[i] = translation.phrases[j];
    translation.phrases[j] = temp;
  }

  if (action === "generate") {
    let targetLang = currentTrip.lang;
    targetLang = "es";
    translation.phrases.forEach(function (phrase, i) {
      // translate request // working

      $.ajax({
        url: `https://translation.googleapis.com/language/translate/v2?target=${targetLang}&key=${googleKey}&q=${phrase}`,
        method: "GET",
      }).then(function (res) {
        // console.log(res.data.translations[0]);
        translation.target[i] = res.data.translations[0].translatedText;
      });
    });
    
  }

  console.log();

  // ! this needs to go in data response somehow
  // send phrase and translation to card
  // 'Phrases-title'
  $("#Phrases-title").text(`Phrases in ${translation.targetName}`);
  // 'Phrases-text'
  for (let i = 0; i <= 2; i++) {
    let listTable = $("#Phrases-text")
    let listRow = $("<tr>")
    let listItem1 = $(`<td id='phrase-${i}'>`).text(translation.phrases[i]);
    let listItem2 = $(`<td id='phrase-${i}'>`).text(translation.target[i]);
    
    listRow.append(listItem1)
    listRow.append(listItem2)
    listTable.append(listRow)
  }
}

// step functions
function fnStepOne() {
  // blank for initializing page
}

// 2
function fnStepTwo(st) {
  if ($(`#step-${st}`).length) {
    // already exists
    // console.log("it exists");
  } else {
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
    let imageArea = $(
      `<img class="primary-destination-img" id="prime-img" src="">`
    );
    el1.append(imageArea);
    // ? DATA HOOKS
    // ! data query should send to class
    row1.append(el1);

    // flight info
    let el2 = $(`<div class="col m9">`);
    let elHead = $(`<h2 class="primary-destination-head" id="prime-head">`);
    let elInfo = $(`<p class="primary-destination-info" id="prime-info">`);
    elInfo.text(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
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
    $("#more-info").on("click", function () {
      fnStepThree(3);

      // data actions
      // translate
      fnTranslate('generate');

      // jquery move
      $("html, body").animate(
        {
          scrollTop: $(`#step-3`).offset().top,
        },
        2000
      );
    });

    // jump to compare button
    let el4 = $(`<div class="col m6">`);
    let btn2 = $(`<a id="compare" data-step="4"
		class="btn-large waves-effect waves-light new-red-lighten-1"
		>`);
    btn2.text("Compare");
    el4.append(btn2);
    row2.append(el4);
    $("#compare").on("click", function () {
      // event delegation workaround
      fnStepFour(4);

      // jquery move
      $("html, body").animate(
        {
          scrollTop: $(`#step-4`).offset().top,
        },
        2000
      );
    });
  }
}

// 3
function fnStepThree(st) {
  if ($(`#step-${st}`).length) {
    // already exists
    // console.log("it exists");
  } else {
    fnCommonRow(st);
    fnCreateParallax(st);

    let cardOrder = ["Weather", "Phrases", "Currency"];

    let row1 = $(`<div class="row">`);
    let row2 = $(`<div class="row">`);

    // attach to #step-${st}
    console.log($(`#step-${st}`));
    $(`#step-${st}`).append(row1);
    $(`#step-${st}`).append(row2);

    // row 1 // cards
    for (let i = 0; i <= 2; i++) {
      let col = $(`<div class="col m4">`);
      let card = $(`<div class="card">`);
      let cardContent = $(`<div class="card-content">`);
      let cardText
      if (i == 1) {
        cardText = $(`<table id="${cardOrder[i]}-text" class='highlight'>`)
      } else {
        cardText = $(`<p id="${cardOrder[i]}-text">`);
        cardText.text("I am a card.");
      }
      let cardTitle = $(`<span class="card-title" id="${cardOrder[i]}-title">`);
      cardTitle.text("Title");

      cardContent.append(cardTitle, cardText);
      card.append(cardContent);
      col.append(card);
      row1.append(col);
    }
    
    //row 2 // button
    let ltCol = $(`<div class="col m5">`);
    let rtCol = $(`<div class="col m5">`);
    let ctCol = $(`<div class="col m2">`);
    let btn = $(`<a id="compare2" data-step="4"
	class="btn-large waves-effect waves-light new-red-lighten-1"
	>`);
    btn.text("Compare");
    ctCol.append(btn);
    row2.append(ltCol, ctCol, rtCol);
    $("#compare2").on("click", function () {
      // event delegation workaround
      fnStepFour(4);

      // jquery move
      $("html, body").animate(
        {
          scrollTop: $(`#step-4`).offset().top,
        },
        2000
      );
    });
  }
}

// 4
function fnStepFour(st) {
  if ($(`#step-${st}`).length) {
    // already exists
    // console.log("it exists");
  } else {
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
    let imageArea = $(
      `<img class="primary-destination-img" id="prime-img" src="">`
    );
    el1.append(imageArea);
    // ? DATA HOOKS
    // ! data query should send to class
    row1.append(el1);

    // flight info
    let el2 = $(`<div class="col m9">`);
    let elHead = $(`<h2 class="primary-destination-head" id="prime-head">`);
    let elInfo = $(`<p class="primary-destination-info" id="prime-info">`);
    elInfo.text(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
    // ? DATA HOOKS
    // ! data query should send to class
    el2.append(elHead);
    el2.append(elInfo);
    row1.append(el2);

    // row 2 // buttons
    // Save
    let el3 = $(`<div class="col m6" style="text-align:right;">`);
    let btn1 = $(`<a id="save-item" data-step="3"
	class="btn-large waves-effect waves-light new-red-lighten-1"
	>`);
    btn1.text("Save");
    el3.append(btn1);
    row2.append(el3);
    $("#save-item").on("click", function () {
      // event delegation workaround
      fnStepFour(4);
      fnSave();
    });

    // Search again button
    let el4 = $(`<div class="col m6">`);
    let btn2 = $(`<a id="search-again" data-step="4"
	class="btn-large waves-effect waves-light new-red-lighten-1"
	>`);
    btn2.text("Search Again");
    el4.append(btn2);
    row2.append(el4);
    $("#search-again").on("click", function () {
      // jquery move
      $("html, body").animate(
        {
          scrollTop: $(`#step-1`).offset().top,
        },
        2000
      );
      fnReset();
    });

    // add cards within parallax
    let cardRow = $("#savedGallery");

    // cards for previous entries
    for (let i = 1; i <= saved.length; i++) {
      let col = $(`<div class="col m4">`);
      let card = $(`<div class="card">`);
      let cardContent = $(`<div class="card-content">`);
      let cardTitle = $(`<span class="card-title" id="savedTitle-${i}">`); // ? DATA HOOK
      cardTitle.text("Title");
      let cardText = $(`<p id="savedInfo-${i}">`); // ? DATA HOOK
      cardText.text("I am a card.");

      cardContent.append(cardTitle, cardText);
      card.append(cardContent);
      col.append(card);
      cardRow.append(col);
      btn2.text("Search Again");
      el4.append(btn2);
      row2.append(el4);
    }
  }
}

// creates the first container and row common to each section, if they don't exist yet
function fnCommonRow(s) {
  // arg = step number
  if ($(`#step-${s}`).length) {
    // already exists
    // console.log("it exists");
  } else {
    // create new
    let el1 = $(`<div class='container' id="${s}">`);
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
    if (s == 4) el4.attr("id", "savedGallery");
    el1.append(el2);
    el2.append(el3);
    el3.append(el4);
    let el5 = $(`<div class='parallax'>`);
    let el6 = $(`<img id='parallax-${s}' src='Assets/jumbo-${s}.png'>`);
    el1.append(el5);
    el5.append(el6);
    // ! Images not appearing when created dynamically
    jQuery(`parallax-${s}`).trigger("resize").trigger("scroll");

    el1.append(el2);
    $("#main-content").append(el1);
  }
}
