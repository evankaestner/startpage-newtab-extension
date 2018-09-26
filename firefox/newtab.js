chrome.storage.local.get(["urlKey"], function(result) {
  if (result.urlKey) {
    url = result.urlKey;
  } else {
    url = "https://evankaestner.github.io/startpage/";
  }
  window.location.replace(url);
});
