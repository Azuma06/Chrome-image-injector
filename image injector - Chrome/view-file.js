// view-file.js
console.log('view-file.js');

let imageUrl = 'https://congressoemfoco.uol.com.br/wp-content/uploads/141209JFC3765_l.jpg';
let style;

function applyBackgroundImage() {
  // Check if the background image is already applied
  if (!style) {
    style = document.createElement('style');
    style.textContent = `* { background-image: url('${imageUrl}'); background-repeat: repeat; background-attachment: fixed; }`;
    document.head.appendChild(style);
  }
}

function revertBackgroundImage() {
  if (style) {
    document.head.removeChild(style);
    style = null;
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'applyChanges') {
    applyBackgroundImage();
  } else if (request.action === 'revertChanges') {
    revertBackgroundImage();
  } else if (request.action === 'changeImageUrl') {
    // Update the imageUrl variable with the new URL
    imageUrl = request.imageUrl;
    // Reapply the background image with the new URL
    revertBackgroundImage();
    applyBackgroundImage();
  }
});