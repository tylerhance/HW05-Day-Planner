var eventTextEl = "";
var eventTimeEl = "";
var currentDate;
var currentTime;
var currentContainer;
var tempArr = [];
var storedEvents;
var returnedEvents;

$(window).on("load", function () {
    currentDate = moment().format('LLLL');
    $("#currentDay").append(currentDate);
})

// 
function renderEvents(){
    storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents!== null) {
        for (i = 0; i < storedEvents.length; i++) {
            returnedEvents = storedEvents[i];
            details = returnedEvents.details;
            timeIndex = returnedEvents.time;
            timeIndex = timeIndex.replace(":00", "");
            if (details !== null) {
                $('#' + timeIndex).children("div").children("textarea").val(details);
            }
        }
    }
}