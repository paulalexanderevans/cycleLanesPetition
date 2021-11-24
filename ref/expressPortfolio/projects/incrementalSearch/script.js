(function () {
    console.log("sane", $);

    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor L'Este",
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe",
    ];
    // console.log(countries);
    var searchField = $("input");
    console.log(searchField);
    var resultsContainer = $(".results");
    console.log(resultsContainer);

    // 1. input eventListener
    searchField.on("input", function () {
        console.log("input is happening right now");

        var inputVal = searchField.val().toLowerCase();
        console.log("input value typed", inputVal);
        //.val is both a getter and a setter

        var matchResults = []; //this line of code doesn't work

        for (var i = 0; i < countries.length; i++) {
            console.log(countries[i].indexOf(inputVal));

            if (countries[i].toLowerCase().indexOf(inputVal) === 0) {
                matchResults.push(countries[i]);
                if (matchResults.length === 4) {
                    break;
                }
                //  code missing here?
                //limits resluts list to 4
            }
        }
        console.log("matchResults:", matchResults);

        var htmlForCountries = "";
        for (var j = 0; j < matchResults.length; j++) {
            htmlForCountries +=
                "<p class='country'>" + matchResults[j] + "</p>";
        }
        console.log("html we will be injecting", htmlForCountries);
        resultsContainer.html(htmlForCountries);

        // when the input field is empty, we can still see countries, need to fix that
        // when the user types gibberish or simply ends up typing sth in the input
        // field that does not mathc our countires in the list we should
        // display "no results"

        if (matchResults.length === 0) {
            resultsContainer.html("no results");
        }

        if (inputVal.length === 0) {
            resultsContainer.html("");
        }
        //if time change to add class .hidden which hides results container

        // 2. mouseover event
        // remember we don't have the p tags on screen initially, they get added
        // later so we need to do some event delegation
        var pCountry = $(".country");
        pCountry.on("mouseover", function (e) {
            console.log("the mouse is hovering above over P tags");
            console.log(e);
            console.log(e.currentTarget);
            $(e.currentTarget).addClass("highlight");
        });

        pCountry.on("mouseleave", function (e) {
            console.log("the mouse is hovering above over P tags");
            console.log(e);
            console.log(e.currentTarget);
            $(e.currentTarget).removeClass("highlight");
        });

        //move clicked element into the input field
        pCountry.on("click", function (e) {
            // console.log("someone clicked on a P tags");
            // console.log(e);
            // console.log(e.currentTarget);
            var clicked = $(e.target).text();
            // console.log(clicked);
            searchField.val(clicked);
            $(resultsContainer).addClass("hidden");
        });
    });

    //when user clicks on container hide results container
    var container = $(".container");
    container.on("click", function (e) {
        console.log("someone clicked on the container");
        $(resultsContainer).addClass("hidden");
    });

    //when user clicks on searchField show results container
    searchField.on("click", function (e) {
        console.log("someone clicked on the input box");
        $(resultsContainer).removeClass("hidden");
        e.stopPropagation();
    });
    //----------Keydown
    // *when the key is the down arrow
    // IF no country has the highlight class, we want to add highlight class to the first country
    // in our list
    // IF the last country in our list has the highlight class, do nothing
    // IF a country other than the last one has the highlight class,
    // we want to remove the highlight
    // from the one that currently has it, and add the highlight class to the next one

    // figure out the conditionals to recognise the keydown events your care about
    // (up, down, and enter)
    // in jQuery remember that accessing values in array like lists does
    // not work like so: listName[0]

    $(document).on("keydown", function (e) {
        var selected = $(".highlight");
        if (e.keyCode === 40) {
            console.log("down");
        }
        if ($(".highlight").length) {
            if (e.keyCode === 40) {
                if (!selected.length) {
                    console.log(!selected.length);
                    $(".highlight").first().addClass("highlight");
                } else {
                    selected
                        .removeClass("highlight")
                        .next()
                        .addClass("highlight");
                }
            } else if (e.keyCode === 38) {
                console.log("up");
                if (!selected.length) {
                    $(".highlight").last().addClass("highlight");
                } else {
                    selected
                        .removeClass("highlight")
                        .prev()
                        .addClass("highlight");
                }
            }
            // } else if (e.keyCode === 13) {
            //     input.val(selected.text());
            //     $(".value").css({ visibility: "hidden" });
            // }
        }
    });

    //     $(document).keydown(function (e) {
    //         console.log("someone pressed a key");
    //         console.log(e.keyCode);
    //         var selected = $(".highlight");
    //         if ($(".highlight").length){
    //  if (e.keyCode == 40) {
    //             console.log("down");
    //             if(!selected.length){
    //                 $(".hightlight")
    //             }

    //             // if resultsContainer.hasClass("highlight"){
    //             //    console.log("has highlight");
    //             // }

    //             // if (countries[i].toLowerCase().indexOf(inputVal) === 0) {
    //             //     matchResults.push(countries[i]);
    //             //     if (matchResults.length === 4) {
    //             //         break;
    //             //     }
    //             //     //  code missing here?
    //             //     //limits resluts list to 4
    //             // }

    //         // var key = e.currentTarget.val();
    //         // console.log(key);
    //         // for results container has class .highlight
    //         // return: position in string
    //     }
    // }
})();
