/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/


//NAME
// On page load, cursor appears in 'Name' field
$("#name").focus();


//JOB ROLE
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


//T-SHIRT INFO
const $designSelectElement = $("select#design");
const $colorSelectElement = $("select#color");
const $designOptions = $("select#design option");
const $colorOptions = $("select#color option");
const $themeOption = $("select#design option").eq(0);
const $selectShirtTheme = $("<option>Please select a T-shirt theme</option>");

//Display 'Select theme' option as default from 'Theme menu'
$themeOption.attr("selected", true);

//Update the 'Color' option to read 'Please select a T-shirt theme'
$colorSelectElement.prepend($selectShirtTheme);
$selectShirtTheme.attr("selected", true);
$colorOptions.hide();

//Initiate change event listener on 'Theme menu'
$designSelectElement.on("change", (function(event) {
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


//ACTIVITY REGISTRATION
//Disable  Conflicting Activities
//Declare variable to hold ALL checkboxes
const checkboxes = $("[type=checkbox]");
//console.log(checkboxes);

//Update and Display TOTAL Activity Cost
//Create DOM element and append to '.activities'
let p = $("<p></p>").appendTo(".activities");
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


//PAYMENT
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


//FORM VALIDATION

//Error message function
const errorIndicator = function (element) {
    $(element).addClass("error");
    $(element).after($("<span></span>").attr("id", "error"));
    $("span#error").text("Please fill in required field").css("color", "red");
};

//Validate NAME
const validateName = function () {
    let $inputName = $("input#name").val();
    let submitName;
    if ($inputName.length < 1) {
        //Add error indicator and return false
        errorIndicator("input#name");
        submitName = false;
    } else {
        //Remove error indicator and return true
        $("input#name").removeClass("error");
        $("span#error").hide();
        submitName = true;
    };
};

//Validate EMAIL
const validateEmail = function () {
    let $inputEmail = $("input#mail").val();
    const regEx = /^\S+@\S+$/;
    let validEmail = regEx.test($inputEmail);
    let submitEmail;
    if ($inputEmail.length < 1 || !validEmail) {
        //Add error indicator and return false
        errorIndicator("input#mail");
        submitEmail = false;
    } else {
        //Remove error indicator and return true
        $("input#mail").removeClass("error");
        $("span#error").hide();
        submitEmail = true;
    };
};

//Validate ACTIVITY
const validateActivity = function () {
    let submitActivity;
    //Loop through ALL checkbox elements
    checkboxes.each(function () {
        if (totalActivityCost === 0) {
            //Add error indicator
            $("p").after($("<span></span>").attr("id", "error"));
            $("span#error").text("Please fill in required field").css("color", "red");
            submitActivity = false;
            return submitActivity;
        } else {
            //Remove error indicator
            $("span#error").hide();
            submitActivity = true;
            return submitActivity;
        };
    });
};

//Create function to validate CREDIT CARD info IF payment option is selected
//Validate CREDIT CARD number
const validateCreditCard = function () {
    let submitCCNum;
    let inputCCNum = $("input#cc-num").val;
    const regEx = /^\d{4}\s?\d{4}\s?\d{4}\s?(\d{4})?$/;
    if (inputCCNum !== regEx || inputCCNum.length < 1) {
        //Add error indicator
        errorIndicator("input#cc-num");
        submitCCNum = false;
    } else {
        //Remove error indicator
        $("span#error").hide();
        submitCCNum = true;
        return submitCCNum;
    }; 
};

//Validate ZIP CODE
// const validateZipCode = function () {

// };

//Validate CVV
// const validateCVV = function () {

// };



//Submit Event Listener
$("form").on("submit", function (event) {
    event.preventDefault();
    validateName();
    validateEmail();
    validateActivity();
    $("select#payment").on ("change", function (event) {
        if ($(event.target).val() === "Credit Card") {
            validateCreditCard();
            // validateZipCode();
            // validateCVV();
        };
    });
});
