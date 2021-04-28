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

