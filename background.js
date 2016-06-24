chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

    console.log('received in listener');
  sendResponse({farewell: "goodbye"});

});

chrome.storage.sync.set({whitelist:
  {
    global: [
      'Widevine Content Decryption Module',
      'Chrome PDF Viewer',
      'Native Client',
      //'Shockwave Flash',
      'Chrome PDF Viewer'
    ],
    b: 'a'
  }
}, function() {
  console.log("saved");
});
