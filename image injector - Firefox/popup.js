console.log('popup.js');

document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const imageUrlInput = document.getElementById('imageUrlInput');
  const applyButton = document.getElementById('applyButton');

  toggleSwitch.addEventListener('change', function() {
    const switchState = toggleSwitch.checked;
    browser.storage.local.set({ 'switchState': switchState });
    browser.runtime.sendMessage({ toggleExtension: true, state: switchState });
  });

  applyButton.addEventListener('click', () => {
    const newImageUrl = imageUrlInput.value;
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      browser.tabs.sendMessage(activeTab.id, { action: 'changeImageUrl', imageUrl: newImageUrl });
    });
  });
});
