console.log('background.js');

browser.runtime.onInstalled.addListener(function() {
    enableExtensionFunctionality();
});
  
browser.runtime.onStartup.addListener(function() {
    enableExtensionFunctionality();
});

browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.toggleExtension) {
    if (request.state) {
      enableExtensionFunctionality();
      console.log('enabled');
    } else {
      disableExtensionFunctionality();
      console.log('disabled');
    }
  }
});

function enableExtensionFunctionality() {
  browser.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      browser.tabs.sendMessage(tab.id, { action: 'applyChanges' });
    });
  });
  console.log('Extension enabled');
}

function disableExtensionFunctionality() {
  browser.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      browser.tabs.sendMessage(tab.id, { action: 'revertChanges' });
    });
  });
  console.log('Extension disabled');
}
