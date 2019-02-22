// Listen for submit
const form = document.getElementById('myForm');
form.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)) {
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteUrl
  }

  if (localStorage.getItem('bookmarks') === null) {
    let bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // clear form
  document.getElementById('myForm').reset();

  fetchBookmarks();

  e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (let i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url === url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // get output
  let bookmarksResult = document.getElementById('bookmarksResult');

  // build output
  bookmarksResult.innerHTML='';

  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarksResult.innerHTML += '<div class="card card-body bg-light">'
                                + '<h3 class="name">'
                                + name
                                + '<a class="btn btn-default link" target="_blank" href="'+ url +'">Visit site</a>'
                                + '<a onclick="deleteBookmark(\''+ url +'\')" class="btn btn-danger del-link" href="#">Delete</a>'
                                + '</h3>'
                                + '</div>';
  }
}

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
