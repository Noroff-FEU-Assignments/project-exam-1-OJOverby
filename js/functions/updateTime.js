// Function for formating time from the API to a more readable state

function updateTime (date) {
    const newDate = new Date(date);
  const updatedTime = newDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    separator: '/'
  });
  return updatedTime;
  }

  export {updateTime};