const express = require('express');
const axios = require('axios');

const app = express();

// Define a route to handle the URL search
app.get('/search', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('Please provide a URL');
  }

  try {
    const archiveResponse = await axios.get(`https://web.archive.org/web/${url}`);
    const urlscanResponse = await axios.get(`https://urlscan.io/api/v1/search/?q=domain:${url}`);
    const virusTotalResponse = await axios.get(`https://www.virustotal.com/api/v3/domains/${url}`);

    const report = {
      archive: archiveResponse.data, // Adjust according to the response structure
      urlscan: urlscanResponse.data,
      virusTotal: virusTotalResponse.data
    };

    res.json(report);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
