/******************************************
Treehouse Techdegree:
FSJS project 3 - Form Validation
******************************************/


//NAME
// On page load, cursor appears in 'Name' field
$("#name").focus();

//JOB ROLE
//Initially hide "Job Role: Other" input field and show when JavaScript is disabled
$("#other-title").hide();
//When "Job Role: Other" is selected, "Other input field" is displayed
//Add event listener to the "other" <option> element:
    //Select the element then pass in event method
$("#title option:last").on('selected', function(){
    $("#other-title").show();
});

//T-SHIRT INFO
//Hide 'Select theme' option from 'Design menu'
$("select#design option:first").hide();
//Update the 'Color' option to read 'Please select a T-shirt theme'
$("select#color").prepend($('<option>Please select a T-shirt theme.</option>').val("pleaseselecttshirt"));
$(document).ready(function() {
    $("select#color option").filter(function() {
        return $(this).val() == "pleaseselecttshirt"; 
    }).prop('selected', true);
    $("select#color option").hide();
});
//When one of two themes selected, only appropriate colors will show.




