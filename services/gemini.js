const GEMINI_API_KEY = '<gemini-api-key>';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function summarizeContent(content) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Please provide a concise summary of the following content in atleast 5 bullet points and at max 10 points. Return output in HTML format: ${content}`
          }]
        }]
      })
    });

    const data = await response.json();
    // Clean up the response by removing HTML code fence markers if present
    let summary = data.candidates[0].content.parts[0].text;
    summary = summary.replace(/^```html\n/, '').replace(/\n```$/, '');
    return summary;
  } catch (error) {
    console.error('Error summarizing content:', error);
    return 'Failed to generate summary. Please try again.';
  }
} 