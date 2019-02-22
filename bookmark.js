// Validate form inputs
function validateForm(siteName, siteUrl) {
  if(!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if(!siteUrl.match(regex)) {
  alert('Please use a valid Url');
  return false;
  }

  return true;
}
