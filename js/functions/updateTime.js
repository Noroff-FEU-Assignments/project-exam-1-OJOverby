// Function for formating time from the API to a more readable state

function updateTime (date) {
    // Construct new date object from the input
    const newDate = new Date(date);
    // Format the date to display DD/MM/YY
  const updatedTime = newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    separator: '/'
  });
  // Return the formated string
  return updatedTime;
  }
  // Export the function
  export {updateTime};