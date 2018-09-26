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
