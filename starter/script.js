var timeDisplayEl = $('#time-display');
var rightNow;

// Get the current time and display 
$(document).ready(function () {
    displayTime();
    loadData() 
});

// Get current date
function displayTime() {
   
    rightNow = dayjs().format('DD MMM YYYY');
    timeDisplayEl.text(rightNow);

    // If currentDate is not set, use today's date
    if(!localStorage.getItem('currentDate')) {
        localStorage.setItem('currentDate', rightNow);
    }

}

// Assign colour to block depending on whether time associated with block is in the past, present or future
document.addEventListener('DOMContentLoaded', function () {
    const currentTime = new Date().getHours();
    const timeBlocks = document.querySelectorAll('.time-block');

    timeBlocks.forEach(block => {
        const blockHour = parseInt(block.getAttribute('data-hour'), 10);

        if (blockHour < currentTime) {
            block.classList.add('past');
        } else if (blockHour === currentTime) {
            block.classList.add('present');
        } else {
            block.classList.add('future');
        }
    });
});

//  Save user input into local storage when 'save' button clicked
$(document).ready(function () {
    $('.container').on('click', '.saveBtn', function () {
        var hourTime = $(this).closest('.time-block').find('.hour').text(); // Make sure this matches your data attribute
        console.log('Hour:', hourTime);
        var userText = $(this).closest('.time-block').find('.description').val();
        console.log("User Text:", userText);
        savingData(hourTime, userText);
    });
})

// Saving data from time blocks into local storage
function savingData(hourTime, userText) {
    localStorage.setItem('work-block-' + hourTime, userText);
    console.log('Data saved for hour ' + hourTime + ': ' + userText); 
}

// If currentDate doesn't match rightNow, clear local storage
function loadData() {
    console.log(typeof localStorage.getItem('currentDate'))
    if(localStorage.getItem('currentDate') !== rightNow){
        localStorage.clear();
        localStorage.setItem('currentDate', rightNow);

    }
    // Get items from local storage
    for (var i = 1; i <= 12; i++) {

        if (i < 6 || i === 12) {
            $(`#event-${i}`).val(localStorage.getItem(`work-block-${i}PM`));
        }
        else {
            $(`#event-${i}`).val(localStorage.getItem(`work-block-${i}AM`));
        }
    }
}


