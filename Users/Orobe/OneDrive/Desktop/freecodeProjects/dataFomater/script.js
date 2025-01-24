// Get references to HTML elements
const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// Get current date and time components
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

// Format the current date as "day-month-year"
const formattedDate = `${day}-${month}-${year}`;
// Display the formatted date in the paragraph
currentDateParagraph.innerText = formattedDate;

// Add event listener to the dropdown for changes
dateOptionsSelectElement.addEventListener("change", () => {
  // Switch based on the selected option's value
  switch (dateOptionsSelectElement.value) {
    // If "yyyy-mm-dd" option is selected
    case "yyyy-mm-dd":
      // Reverse the order of day, month, and year and display in paragraph
      currentDateParagraph.innerText = formattedDate
        .split("-")
        .reverse()
        .join("-");
      break;
    // If "mm-dd-yyyy-h-mm" option is selected
    case "mm-dd-yyyy-h-mm":
      // Display month, day, year, hours, and minutes in paragraph
      currentDateParagraph.innerText = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    // For any other option, display the default formatted date
    default:
      currentDateParagraph.textContent = formattedDate;
      break;
  }
});
const timezoneSelectElement = document.getElementById("timezone-options");

// Function to populate timezone options
function populateTimezones() {
  const timezones = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneOptions = Intl.DateTimeFormat().resolvedOptions().timeZone;

  timezoneOptions.forEach((timezone) => {
    const option = document.createElement("option");
    option.value = timezone;
    option.textContent = timezone;
    timezoneSelectElement.appendChild(option);
  });
}

// Call the function to populate timezone options
populateTimezones();
