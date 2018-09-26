function restoreOptions() {
  chrome.storage.local.get(["autoKey", "urlKey", "defKey", "incKey", "customKey"], function(result) {
    if (result.autoKey) {
      document.getElementById("auto").checked = result.autoKey;
    } else {
      document.getElementById("auto").checked = false;
    }
    if (result.urlKey) {
      document.getElementById("url").value = result.urlKey;
    } else {
      document.getElementById("url").value = "https://evankaestner.github.io/startpage/";
    }
    if (result.defKey) {
      document.getElementById("def").value = result.defKey;
    } else {
      document.getElementById("def").value = "NrBEoGnLOvYTAukoA";
    }
    if (result.incKey) {
      document.getElementById("inc").value = result.incKey;
    } else {
      document.getElementById("inc").value = "NrBEBNQGlBiAmRTqhWm7UYLraA";
    }
    if (result.customKey) {
      document.getElementById("custom").value = JSON.stringify(JSON.parse(result.customKey), null, 2);
    } else {
      document.getElementById("custom").value = JSON.stringify([{"alias": "example", "hash": "NrBEoGnLNBRAHgQwLYAcA2BTWub9AGZQBdEoA"}], null, 2);
    };
  });
}

function saveOptions() {
  chrome.storage.local.set({
    "autoKey": document.getElementById("auto").checked,
    "urlKey": document.getElementById("url").value,
    "defKey": document.getElementById("def").value,
    "incKey": document.getElementById("inc").value,
    "customKey": document.getElementById("custom").value
  }, function() {
    if (document.getElementById("url").value) {
      chrome.permissions.contains({
        origins: [document.getElementById("url").value]
      }, function(result) {
        if (!result) {
          chrome.permissions.request({
            origins: [document.getElementById("url").value]
          }, function(granted) {
            chrome.runtime.reload();
          });
        }
      });
    }
  });
}

restoreOptions();
document.getElementById("submit").onclick = saveOptions;
