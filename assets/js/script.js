var appointmentTextEl = "";
var appointmentTimeEl = "";
var currentDate;
var currentTime;
var currentContainer;
var tempArr = [];
var storedAppointment;
var returnedAppointment;

$(window).on("load", function () {
  currentDate = moment().format("LLLL");
  $("#currentDay").append(currentDate);
});

//
function renderEvents() {
  storedAppointment = JSON.parse(localStorage.getItem("events"));
  if (storedAppointment !== null) {
    for (i = 0; i < storedAppointment.length; i++) {
      returnedAppointment = storedAppointment[i];
      details = returnedAppointment.details;
      timeIndex = returnedAppointment.time;
      timeIndex = timeIndex.replace(":00", "");
      if (details !== null) {
        $("#" + timeIndex)
          .children("div")
          .children("div")
          .children("textarea")
          .val(details);
      }
    }
  }
}

renderEvents();

for (i = 0; i <= 23; i++) {
  currentContainer = i;
  if (currentTime == i) {
    $("#" + currentContainer).addClass("present");
    $("#" + currentContainer)
      .children("div")
      .children("div")
      .children("textarea")
      .addClass("present");
  } else if (currentTime > i) {
    $("#" + currentContainer).addClass("past");
    $("#" + currentContainer)
      .children("div")
      .children("div")
      .children("textarea")
      .addClass("past");
  } else {
    $("#" + currentContainer).addClass("future");
    $("#" + currentContainer)
      .children("div")
      .children("div")
      .children("textarea")
      .addClass("future");
  }
}


