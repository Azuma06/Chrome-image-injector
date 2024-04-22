console.log('popup.js');

document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const imageUrlInput = document.getElementById('imageUrlInput');
  const applyButton = document.getElementById('applyButton');

  // Get the last state from the browser's local storage
  chrome.storage.local.get('switchState', function(data) {
    const lastState = data.switchState;
    if (lastState !== undefined) {
      toggleSwitch.checked = lastState;
    }
  });

  // Send a message to the background script when the switch is toggled
  toggleSwitch.addEventListener('change', function() {
    const switchState = toggleSwitch.checked;
    chrome.storage.local.set({ 'switchState': switchState });
    chrome.runtime.sendMessage({ toggleExtension: true, state: switchState });
  });

  // Send a message to the content script to change the image URL
  applyButton.addEventListener('click', () => {
    const newImageUrl = imageUrlInput.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'changeImageUrl', imageUrl: newImageUrl });
    });
  });
});