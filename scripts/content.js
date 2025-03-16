function extractPageContent() {
  // Get main content, excluding navigation, footer, etc.
  try {
    const mainContent = document.body.innerText;
    
    // Basic cleaning of the content
    const cleanContent = mainContent
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 5000); // Limit content length
      
    return cleanContent;
  } catch (error) {
    console.error('Error extracting content:', error);
    return 'Failed to extract content from page.';
  }
}

// Listen for message from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    try {
      sendResponse({ content: extractPageContent() });
    } catch (error) {
      sendResponse({ content: 'Error: Could not extract page content' });
    }
    return true; // Required for async response
  }
}); 