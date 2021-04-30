// Global variables
var appointmentTextEl = "";
var appointmentTimeEl = "";
var currentDate;
var currentTime;
var currentContainer;
var eventArray = [];
var storedAppointment;
var returnedAppointment;

// Function using jQuery and moment.js to display current day/time
$(window).on("load", function () {
  currentDate = moment().format("LLLL");
  $("#currentDay").append(currentDate);
  currentTime = moment().format("H");

  function renderAppointments() {
    storedAppointment = JSON.parse(localStorage.getItem("appointments"));
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
  renderAppointments();

  
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
});

$(".saveBtn").click(function () {
  appointmentTextEl = $(this)
    .parent("div")
    .children("div")
    .children("textarea")
    .val();
  appointmentTimeEl = $(this).parent("div").parent().attr("id");
  appointment = {
    time: appointmentTimeEl,
    details: appointmentTextEl,
  };
  eventArray = JSON.parse(localStorage.getItem("appointments"));
  if (eventArray === null) {
    localStorage.setItem(
      "appointments",
      JSON.stringify([{ time: appointmentTimeEl, details: appointmentTextEl }])
    );
  } else {
    eventArray.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(eventArray));
  }
  $(this)
    .parent("div")
    .children("div")
    .children("textarea")
    .replaceWith(
      $("<textarea>" + appointmentTextEl.addClass("textarea") + "</textarea>")
    );
})
