// Imports a fetch library. Netlify Functions run on Node.js.
const fetch = require('node-fetch');

// This is the main function that Netlify will run.
exports.handler = async function(event, context) {
  // Get the secret API key from the environment variables.
  const apiKey = process.env.NASA_API_KEY;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      // If the API returns an error, pass it along.
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `NASA API Error: ${response.statusText}` }),
      };
    }
    const data = await response.json();

    // If everything is successful, return the data to the frontend.
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // Handle network errors or other issues.
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Internal Server Error: ${error.message}` }),
    };
  }
};
