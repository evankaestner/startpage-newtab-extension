var url;

function backgroundLoad() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.pin) {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
          var current = tabs[0];
          chrome.tabs.update(current.id, {'pinned': true});
        });
      }
    }
  );
  chrome.commands.onCommand.addListener(function(command) {
    if (command == "toggle-pin") {
      chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        var current = tabs[0];
        chrome.tabs.update(current.id, {'pinned': !current.pinned});
      });
    }
  });
  getUrl();
}

function getUrl() {
  chrome.storage.local.get(["urlKey"], function(result) {
    if (result.urlKey) {
      url = result.urlKey;
    } else {
      url = "https://evankaestner.github.io/startpage/";
    }
    chrome.contentSettings.popups.set({
      'primaryPattern': url+"*",
      'setting': "allow",
      'scope': 'regular'
    });
  });
}

backgroundLoad();
