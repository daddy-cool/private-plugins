chrome.storage.sync.get('whitelist', function (wl) {
  if (Object.keys(wl).length === 0) {
    chrome.storage.sync.set({whitelist:
      {
        '*': []
      }
    }, function() {
      console.log("saved");
    });
  }
});
