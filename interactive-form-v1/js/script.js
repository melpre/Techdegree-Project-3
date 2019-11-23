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

console.log($designOptions);
console.log($colorOptions);


//ACTIVITY REGISTRATION




