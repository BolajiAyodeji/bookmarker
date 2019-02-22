// Listen for submit
const form = document.getElementById('myForm');
form.addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // Get form values
  let siteName = document.getElementById('siteName').value;
  let siteUrl = document.getElementById('siteUrl').value;

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

  e.preventDefault();
}
