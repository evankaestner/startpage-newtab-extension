var startpageURL;

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
  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "newtab.js"});
  });
}

backgroundLoad();

chrome.storage.local.get(["urlKey"], function(result) {
  if (result.urlKey) {
    startpageURL = result.urlKey;
  } else {
    startpageURL = "https://evankaestner.github.io/startpage/";
  }
});

chrome.tabs.onUpdated.addListener(function(tab) {
  chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
    url: startpageURL
  }, function(tabArray) {
      if (tabArray.length > 0 && tabArray[0].status === "complete") {
        chrome.permissions.contains({
          origins: [tabArray[0].url]
        }, function(result) {
          if (result) {
            chrome.tabs.executeScript(tabArray[0].id, {file: 'content.js', runAt: 'document_end'});
          }
        });
      }
  });
});
