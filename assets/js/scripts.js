// I need to display the day, month, and date in the jumbotron

// I need a timeblock for each hour of a workday - perhaps 8-6 to cover all bases

// I need a section to display the hour, have a text input section, and a save section / button for each timeblock

// I need to determine what the current hour is

// all hours prior to the current should have a disabled save button

// current hour should have a differnt background color and active save button

// Hours after current should have a distinct color and active save button

// When a task is saved, it should be saved to text input, and saved to local storage 

// Saving to local storage should be a key of time and a value = to task text

//Declare Variables
var now = luxon.DateTime.local().toFormat('MMMM dd, yyyy')
var currentDate = '';
var currentHour = parseInt(luxon.DateTime.local().toFormat('H'))
var workHours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM']
$('#currentDay').text(now);

//Functions
// JavaScript function that wraps everything
$(document).ready(function () {

    //Initialization function - Clears calendar if Local Storage Items are from previous day
    function intit() {
        currentDate = luxon.DateTime.local().toFormat('yyyyLLdd')
        if (currentDate.toString() === localStorage.getItem('currentDate')) {
            return;
        }
        else {
            removeTasks = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];
            for (key of removeTasks) {
                localStorage.removeItem(key);
            }
            localStorage.setItem('currentDate', currentDate);
            location.reload();
        }

    }

    intit();

    //For loop to create Hours Blocks, Task Blocks and Save Buttons
    for (var i = 0; i < workHours.length; i++) {
        plannerHour = i + 9;
        //Hour Block Creation
        var newHourRow = $('<div>');
        newHourRow.attr('class', 'row time-block hour')
        newHourRow.attr('id', workHours[i]);
        $('.container').append(newHourRow);
        //Hour Display creation
        var newHourDisplay = $('<p>');
        newHourDisplay.attr('class', 'col-xs-12 col-sm-2 col-md-1 hour-text');
        newHourDisplay.text(workHours[i])
        newHourRow.append(newHourDisplay);
        //Text area Creation
        var newHourTextArea = $('<textarea>');
        newHourTextArea.attr('data-idx', workHours[i]);
        var setTask = localStorage.getItem(workHours[i]);
        newHourTextArea.val(setTask);
        newHourRow.append(newHourTextArea);

        //Save Button Creation
        var newHourSaveBtn = $('<button>');
        newHourSaveBtn.attr('class', 'col-xs-12 col-sm-2 col-md-1 saveBtn');
        newHourSaveBtn.html('<span class="save-icon"><i class="fas fa-save"></i></span><span class="save-text">SAVE</span>');
        newHourSaveBtn.attr('data-idx', workHours[i]);
        newHourSaveBtn.attr('title', 'Save');
        newHourRow.append(newHourSaveBtn);

        //Change Textarea and Save Button based on if hour is past, present, or future
        if (plannerHour === currentHour) {
            newHourTextArea.attr('class', 'col-xs-12 col-sm-8 col-md-10 present');
            newHourTextArea.attr('placeholder', 'Enter your task');
        } else if (plannerHour > currentHour) {
            newHourTextArea.attr('class', 'col-xs-12 col-sm-8 col-md-10 future');
            newHourTextArea.attr('placeholder', 'Enter your task');
        } else {
            newHourTextArea.attr('class', 'col-xs-12 col-sm-8 col-md-10 past');
            newHourTextArea.attr('disabled', true);
            newHourSaveBtn.attr('disabled', true);
            newHourSaveBtn.attr('style', 'background-color:#CAEDF6;');
            newHourTextArea.prop('placeholder');

        }

    }

    $(".saveBtn").on("click", function () {
        console.log(this)
        var time = $(this).siblings('textarea').attr('data-idx');
        var value = $(this).siblings('textarea').val().trim()
        localStorage.setItem(time, value)
        console.log(time);
    })

});