// Global variables
var appointmentTextEl = "";
var appointmentTimeEl = "";
var storedAppointment;
var returnedAppointment;
var currentDate;
var currentTime;
var currentContainer;
var appointmentArray = [];


// Function using jQuery and moment.js to display current day/time
$(window).on("load", function () {
  currentDate = moment().format("LLLL");
  $("#currentDay").append(currentDate);
  currentTime = moment().format("H");

// Rendering the appointment in the time slot the user inputs
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

  // Loop for the hours and tracking the hours to determine if its in the past, present, or future
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

// Click of the save button saves the user input/appointment and time block to local storage
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
  appointmentArray = JSON.parse(localStorage.getItem("appointments"));
  if (appointmentArray === null) {
    localStorage.setItem(
      "appointments",
      JSON.stringify([{ time: appointmentTimeEl, details: appointmentTextEl }])
    );
  } else {
    appointmentArray.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointmentArray));
  }
  $(this)
    .parent("div")
    .children("div")
    .children("textarea")
    .replaceWith(
      $("<textarea>" + appointmentTextEl.addClass("textarea") + "</textarea>")
    );
})
