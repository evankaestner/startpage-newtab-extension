var alreadyLoaded;
var auto;
var def;
var inc;
var custom;

function getKeys() {
  chrome.storage.local.get(["autoKey", "defKey", "incKey", "customKey"], function(result) {
    if (result.autoKey) {
      auto = result.autoKey;
    } else {
      auto = false;
    }
    if (result.defKey) {
      def = result.defKey;
    } else {
      def = "NrBEoGnLOvYTAukoA";
    }
    if (result.incKey) {
      inc = result.incKey;
    } else {
      inc = "NrBEBNQGlBiAmRTqhWm7UYLraA";
    }
    if (result.customKey) {
      custom = JSON.parse(result.customKey);
    } else {
      custom = JSON.parse(JSON.stringify([{"alias": "example", "hash": "NrBEoGnLNBRAHgQwLYAcA2BTWub9AGZQBdEoA"}], null, 2));
    }
    content();
  });
}

function content() {
  if (chrome.extension.inIncognitoContext) {
    defaultHash(inc);
  } else {
    defaultHash(def);
  }
  if (auto === true) {
    chrome.extension.sendMessage({pin: true}, function(response) {});
  }
  loadAlias();
}

function defaultHash(hash) {
  var code = `defaultHash="${hash}";retrieveHash();toPanel();saveSettings();`;
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
}

function loadAlias() {
  var checkAlias = `
  document.getElementById('search-form').onsubmit = function() {
    `;
    for (var i = 0; i < custom.length; i++) {
      checkAlias += `
      if (document.getElementById('search-input').value == "#${custom[i].alias}") {
        retrieveHash("${custom[i].hash}");toPanel();saveSettings();
        document.getElementById('search-form').reset();
        return false;
      }
      `
    }
    checkAlias += `
    else {
      formOnSubmit(document.getElementById('search-input').value);
      return false;
    }
  }
  `
  var script = document.createElement('script');
  script.textContent = checkAlias;
  (document.head||document.documentElement).appendChild(script);
}

if (!alreadyLoaded) {
  getKeys();
  alreadyLoaded = true;
}
