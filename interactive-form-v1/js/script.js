/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

/***** EXTRA CREDIT NOTES *****/
// 1. Line 45-57: Initially hide "color" label and color select menu elements until "design" option is selected
// 2. Line 257-282: Conditional error message for credit card validation function
// 3. Line 380-383: Real-time error message for email input field


/********* NAME ***********/
// On page load, cursor appears in 'Name' field
$("#name").focus();


/******** JOB ROLE *********/
//Initially hide "Other Job Role" input field and show when JavaScript is disabled
$("#other-title").hide();

//When "Job Role:Other" is chosen from select element, show "Other Job Role" input text field
$("select#title").on("change", function(event){
    let $selectedValue = $(this).val();
    const $other = $("select#title option:last").val();
    if ($selectedValue === $other) {
        $("#other-title").show();
    } else {
        $("#other-title").hide();
    };
});


/******* T-SHIRT INFO *******/

const $designSelectElement = $("select#design");
const $colorSelectElement = $("select#color");
const $designOptions = $("select#design option");
const $colorOptions = $("select#color option");
const $themeOption = $("select#design option").eq(0);
const $selectShirtTheme = $("<option>Please select a T-shirt theme</option>");
const $colorLabel = $("label[for='color']");

//Display 'Select theme' option as default from 'Theme menu'
$themeOption.attr("selected", true);

//Initially hide 'Color' label and Color 'select' drop down
$colorLabel.hide();
$colorSelectElement.hide();

//Update the 'Color' option to read 'Please select a T-shirt theme'
$colorSelectElement.prepend($selectShirtTheme);
$selectShirtTheme.attr("selected", true);
$colorOptions.hide();

//Initiate change event listener on 'Theme menu'
$designSelectElement.on("change", (function(event) {
    //Display 'Color' label and 'Color' select drop down
    $colorLabel.show();
    $colorSelectElement.show();
    //When one of two themes is selected, only appropriate colors will show.
    if ($(event.target).val() === "js puns") {
        //Disable 'Select theme' option from 'Theme menu'
        $themeOption.attr("disabled", "hidden");
        //Disable 'Please select tshirt theme' from 'Color menu'
        $selectShirtTheme.attr("disabled", "hidden");
        //Show ONLY first 3 color options from 'Color menu'
        $colorOptions.eq(0).attr("selected", true).show();
        $colorOptions.eq(1).show();
        $colorOptions.eq(2).show();
        $colorOptions.eq(3).removeAttr("selected").hide();
        $colorOptions.eq(4).hide();
        $colorOptions.eq(5).hide();
    } else if ($(event.target).val() === "heart js") {
        //Disable 'Select theme' option from 'Theme menu'
        $themeOption.attr("disabled", "hidden");
        //Disable 'Please select tshirt theme' from 'Color menu'
        $selectShirtTheme.attr("disabled", "hidden");
        //Show ONLY last 3 color options from 'Color menu'
        $colorOptions.eq(0).removeAttr("selected").hide();
        $colorOptions.eq(1).hide();
        $colorOptions.eq(2).hide();
        $colorOptions.eq(3).attr("selected", true).show();
        $colorOptions.eq(4).show();
        $colorOptions.eq(5).show();
    };
}));

//console.log($designOptions);
//console.log($colorOptions);


/***** ACTIVITY REGISTRATION *****/

//Disable  Conflicting Activities
//Declare variable to hold ALL checkboxes
const checkboxes = $("[type=checkbox]");
//console.log(checkboxes);

//Update and Display TOTAL Activity Cost
//Create DOM element and append to '.activities'
let p = $("<p></p>").appendTo(".activities").attr("id", "activity");
let totalActivityCost = 0;

//Initiate change event listener on parent fieldset "Activities" element
$(".activities").on ("change", (function (event) {
    // Store clicked element
    let clicked = event.target
    // Store attribute 'data-day-and-time' of clicked element
    let $clickedType = clicked.getAttribute("data-day-and-time");
    // Store attribute 'data-cost' of clicked element
    let $clickedCost = clicked.getAttribute("data-cost");
    let $clickedCostNum = $clickedCost.replace("$", "");
    //console.log(typeof $clickedCost);
    //console.log($clickedCost);
    //console.log(clicked);
    //console.log($clickedType);

    //If else conditional: if checkbox is checked, add cost of clicked activity to total cost, else subtract
    if ($(clicked).prop("checked")) {
        //Add cost of clicked activity to total cost variable
        totalActivityCost = parseInt(totalActivityCost) + parseInt($clickedCostNum);
        p.text("Total: $" + totalActivityCost);
    } else {
        //Subtract cost of clicked activity from total cost variable
        totalActivityCost = parseInt(totalActivityCost) - parseInt($clickedCostNum);
        p.text("Total: $" + totalActivityCost);
    };
    
    //Initiate loop on ALL checkboxes
    for (let i = 0; i < checkboxes.length; i += 1) {
        //Declare variable to hold 'day and time' data attribute for each looped checkbox
        let $checkboxType = checkboxes[i].getAttribute("data-day-and-time");
        //If conditional: checkbox type equals clicked type AND checkbox in current loop is different from clicked checkbox
        if ($checkboxType === $clickedType && checkboxes[i] !== clicked) {
            //If else conditional: if both conditions met, and clicked checkbox is checked
            if ($(clicked).prop("checked")) {
                //Disable checkbox in current loop
                $(checkboxes[i]).attr("disabled", true);
            } else {
                //Enable checkbox in current loop
                $(checkboxes[i]).attr("disabled", false);
            };
        };
    };
    //console.log($clickedCostNum);
    //console.log(p); 
}));


/******** PAYMENT DISPLAY ********/

//On page load, hide “Select Payment Method” `option` in drop down menu & only show Credit Card section
$("select#payment option").eq(0).hide();
$("div#paypal").hide();
$("div#bitcoin").hide();
//Get value of payment select element, and if it’s = ‘credit card’, set the credit card payment section to show, and set the other two options to hide.
//Repeat for "Paypal" and "Bitcoin" sections
$("select#payment").on ("change", function(event) {
    if ($(event.target).val() === "Credit Card") {
        $("div#credit-card").show();
        $("div#paypal").hide();
        $("div#bitcoin").hide();
    } else if ($(event.target).val() === "PayPal") {
        $("div#credit-card").hide();
        $("div#paypal").show();
        $("div#bitcoin").hide();
    } else {
        $("div#credit-card").hide();
        $("div#paypal").hide();
        $("div#bitcoin").show();
    };
});


/******** FORM VALIDATION ********/

//Validate Name
let submitName;
let inputName;
const validateName = function () {
    const errorIndicatorName = function () {
        $("input#name").attr("class", "error");
        $("input#name").after($("<span></span>").attr("id", "error-name"));
        $("span#error-name").text("Please provide name").css("color", "red");
    };
    let inputNameVal = document.getElementById("name").value;
    inputName = inputNameVal;
    if (inputName.length > 1) {
        //Remove error indicator and return true
        $("input#name").removeClass("error");
        $("span#error-name").hide();
        submitName = true;
    } else {
        //Add error indicator and return false
        errorIndicatorName();
        submitName = false;
    };
};

//Validate Email
let submitEmail;
let inputEmail;
const validateEmail = function () {
    const errorIndicatorMail = function () {
        $("input#mail").attr("class", "error");
        $("input#mail").after($("<span></span>").attr("id", "error-mail"));
        $("span#error-mail").text("Please provide correct email address").css("color", "red");
    };
    let inputEmailVal = document.getElementById("mail").value;
    inputEmail = inputEmailVal;
    const regEx = /^\S+@\S+\.\S+$/;
    let validEmail = regEx.test(inputEmail);
    if (validEmail) {
        //Remove error indicator and return true
        $("input#mail").removeClass("error");
        $("span#error-mail").hide();
        submitEmail = true;
    } else {
        //Add error indicator and return false
        errorIndicatorMail();
        submitEmail = false;
    };
};

//Validate Activity
let submitActivity;
const validateActivity = function () {
    const errorIndicatorActivity = function () {
        $("p#activity").attr("class", "error");
        $("p#activity").after($("<span></span>").attr("id", "error-activity"));
        $("span#error-activity").text("Please check activity").css("color", "red");
    };
    if (totalActivityCost !== 0) {
        //Remove error indicator and return true
        $("p#activity").removeClass("error");
        $("span#error-activity").hide();
        submitActivity = true;
    } else {
        //Add error indicator and return false
        errorIndicatorActivity();
        submitActivity = false;
    };
};

//Validate Credit Card #
let submitCCNum;
let inputCCNumVal;
const validateCCNum = function () {
    let inputCCNum = document.getElementById("cc-num").value;
    inputCCNumVal = inputCCNum;
    const regEx = /^\d{3,4}\s?\d{3,4}\s?\d{3,4}\s?(\d{4})?$/;
    let validCCNum = regEx.test(inputCCNumVal);
    const errorIndicatorCC = function () {
        $("input#cc-num").attr("class", "error");
        $("input#cc-num").after($("<span></span>").attr("id", "error-cc"));
        $("span#error-cc").text("Please provide valid credit card").css("color", "red");
    };
    const altErrorIndicatorCC = function () {
        $("input#cc-num").attr("class", "error");
        $("input#cc-num").after($("<span></span>").attr("id", "error-altcc"));
        $("span#error-altcc").text("Please provide credit card number between 13-16 digits").css("color", "red");
    };
    if (inputCCNumVal.length === 0) {
        //Add error indicator
        errorIndicatorCC();
        $("span#error-altcc").hide();
        submitCCNum = false;
    } else if (inputCCNumVal.length < 13) {
        // Add alternative error indicator
        altErrorIndicatorCC();
        $("span#error-cc").hide();
        submitCCNum = false;
    } else if (inputCCNumVal.length > 16) {
        // Add alternative error indicator
        altErrorIndicatorCC();
        $("span#error-cc").hide();
        submitCCNum = false;
    } else {
        //Remove error indicator(s)
        $("input#cc-num").removeClass("error");
        $("span#error-cc").hide();
        $("span#error-altcc").hide();
        submitCCNum = true;
    };
};

//Validate Zip Code
let submitCCzip;
let inputCCZipCode;
const validateZipCode = function () {
    let inputCCzip = document.getElementById("zip").value;
    inputCCZipCode = inputCCzip;
    const regEx = /^\d{5}$/;
    let validCCzip = regEx.test(inputCCZipCode);
    const errorIndicatorCCZip = function () {
        $("input#zip").attr("class", "error");
        $("input#zip").after($("<span></span>").attr("id", "error-zip"));
        $("span#error-zip").text("Please provide valid zip code").css("color", "red");
    };
    if (validCCzip) {
        //Remove error indicator
        $("input#zip").removeClass("error");
        $("span#error-zip").hide();
        submitCCzip = true;
    } else {
        //Add error indicator
        errorIndicatorCCZip();
        submitCCzip = false;
    };
};

//Validate CVV
let submitCVV;
let inputccCVV;
const validateCVV = function () {
    let inputCVV = document.getElementById("cvv").value;
    inputccCVV = inputCVV;
    const regEx = /^\d{3}$/;
    let validCVV = regEx.test(inputccCVV);
    const errorIndicatorCVV = function () {
        $("input#cvv").attr("class", "error");
        $("input#cvv").after($("<span></span>").attr("id", "error-cvv"));
        $("span#error-cvv").text("Please provide valid CVV code").css("color", "red");
    };
    if (validCVV) {
        //Remove error indicator
        $("input#cvv").removeClass("error");
        $("span#error-cvv").hide();
        submitCVV = true;
    } else {
        //Add error indicator
        errorIndicatorCVV();
        submitCVV = false;
    };
};

//Validate ALL Credit Card Function
let submitCreditCard;
const validateAllCreditCard = function () {
    validateCCNum();
    validateZipCode();
    validateCVV();       
    if (submitCCNum === true && submitCCzip === true && submitCVV === true) {
        submitCreditCard = true;
    } else {
        submitCreditCard = false;
    };
};

//Validate ALL Function
//If ALL validation checks are true, return true
let submitAll;
const masterValidate = function () {
    validateName();
    validateEmail();
    validateActivity();
    //If select#payment option is Credit Card, do credit card validation checks
    if ($("select#payment").val() === "Credit Card") {
        validateAllCreditCard();
    };
    if (submitName === true && submitEmail === true && submitActivity === true) {
        submitAll = true;
    } else {
        submitAll = false;
    };
};


/******** EVENT LISTENERS ********/

//Payment Method Listener
//If credit card payment is selected
$("select#payment").on ("change", function (event) {
    if ($(this).val() === "Credit Card") {
    validateAllCreditCard();
    };        
});

//Keydown Listener on Email Input
const emailField = document.getElementById("mail");
emailField.addEventListener ("keydown", (event) => {
    $("span#error-mail").remove();
    validateEmail();
});

//Submit Listener
$("form").on("submit", function (event) {
    $("span#error-name").remove();
    $("span#error-mail").remove();
    $("span#error-activity").remove();
    $("span#error-cc").remove();
    $("span#error-altcc").remove();
    $("span#error-zip").remove();
    $("span#error-cvv").remove();
    masterValidate();
    //If ALL meet credit card checks, return true
    if (submitAll === false || submitCreditCard === false) {
        event.preventDefault();
    };
});



/********** END OF PROGRAM **********/




