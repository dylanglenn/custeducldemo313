const http = require('http');

const server = http.createServer((req, res) => {
  const { method, url, headers } = req;

  // ─── DISPLAY ───────────────────────────────────────────────────────────────

  // @endpoint GET /display
  if (method === 'GET' && url === '/display') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "message": " Hey Alex! Safety score: 100 - perfect drive vibes 😄 Keep it up: smooth accel/brake + stay alert. New codes found: P0300(misfire), P0420(catalyst), P0455(EVAP leak—check gas cap), P0171(lean), P0128(coolant/thermostat). 📅 Book service soon to avoid mpg drop. 🔧",
      "html": "<div>🚗✅ Hey Alex! Safety score: <b>100</b>—perfect drive vibes 😄 Keep it up: smooth accel/brake + stay alert. New codes found: <b>P0300</b>(misfire), <b>P0420</b>(catalyst), <b>P0455</b>(EVAP leak—check gas cap), <b>P0171</b>(lean), <b>P0128</b>(coolant/thermostat). 📅 Book service soon to avoid mpg drop. 🔧</div>"
    }));
    return;
  }

  // ─── DRIVER SAFETY ─────────────────────────────────────────────────────────

  // @endpoint POST /driver/:id
  if (method === 'POST' && /^\/driver\/[^/]+$/.test(url)) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "profileId": "1",
        "driver": {
          "firstName": "Alex",
          "lastName": "Johnson",
          "license": {
            "issueDate": "2022-05-14",
            "expiry": "2026-05-14",
            "issuingState": "CA",
            "restrictions": ["B"]
          },
          "email": "alex.johnson@example.com"
        },
        "safetyScore": 100,
        "hardStops": 0,
        "speeding": 0,
        "nightDrives": 0,
        "weather": 0,
        "ignoredWarnings": 0
      }));
    });
    return;
  }

  // @endpoint GET /driver/:id
  if (method === 'GET' && /^\/driver\/[^/]+$/.test(url)) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "profileId": "1",
      "driver": {
        "firstName": "Alex",
        "lastName": "Johnson",
        "license": {
          "issueDate": "2022-05-14",
          "expiry": "2026-05-14",
          "issuingState": "CA",
          "restrictions": ["B"]
        },
        "email": "alex.johnson@example.com"
      },
      "safetyScore": 100,
      "hardStops": 0,
      "speeding": 0,
      "nightDrives": 0,
      "weather": 0,
      "ignoredWarnings": 0
    }));
    return;
  }

  // @endpoint PUT /driver/:id
  if (method === 'PUT' && /^\/driver\/[^/]+$/.test(url)) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "profileId": "1",
        "driver": {
          "firstName": "Alex",
          "lastName": "Johnson",
          "license": {
            "issueDate": "2022-05-14",
            "expiry": "2026-05-14",
            "issuingState": "CA",
            "restrictions": ["B"]
          },
          "email": "alex.johnson@example.com"
        },
        "safetyScore": 95,
        "hardStops": 0,
        "speeding": 1,
        "nightDrives": 0,
        "weather": 0,
        "ignoredWarnings": 0
      }));
    });
    return;
  }

  // @endpoint DELETE /driver/:id
  if (method === 'DELETE' && /^\/driver\/[^/]+$/.test(url)) {
    res.writeHead(204);
    res.end();
    return;
  }

  // ─── VEHICLE SAFETY ────────────────────────────────────────────────────────

  // @endpoint POST /vehicle/:id
  if (method === 'POST' && /^\/vehicle\/[^/]+$/.test(url)) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "vehicleId": "2a8d3c55-0f3a-4c31-8a2a-3f2fd3a33d2d",
        "profileId": "aa7f3f4a-6d6d-4b39-a11a-3cf8c9fe0a5b",
        "createdAt": "2026-03-12T10:25:01.000Z",
        "updatedAt": "2026-03-12T10:25:01.000Z",
        "status": "ACTIVE",
        "riskScore": 12,
        "vin": "1HGCM82633A004352",
        "make": "Toyota",
        "model": "Camry",
        "year": 2021,
        "metrics": {
          "hardCorneringEvents": 0,
          "hardBrakingEvents": 0,
          "speedingEvents": 0
        }
      }));
    });
    return;
  }

  // @endpoint GET /vehicle/:id
  if (method === 'GET' && /^\/vehicle\/[^/]+$/.test(url)) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "vehicle": {
        "id": 123,
        "vin": "1HGCM82633A004352",
        "make": "Honda",
        "model": "Accord",
        "year": 2020,
        "mileage": 45000
      },
      "tpms": "OK",
      "tailLights": "OK",
      "oilPressure": "OK",
      "sensors": "OK",
      "defrost": "OK",
      "airbags": "OK",
      "battery": "OK",
      "newCode": true,
      "activeCodes": ["P0300", "P0420", "P0455", "P0171", "P0128"]
    }));
    return;
  }

  // @endpoint PATCH /vehicle/:id
  if (method === 'PATCH' && /^\/vehicle\/[^/]+$/.test(url)) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "vin": "1HGCM82633A004352",
        "tpms": "OK",
        "tailLights": "OK",
        "oilPressure": "OK",
        "sensors": "OK",
        "defrost": "OK",
        "airbags": "OK",
        "battery": "OK",
        "newCode": false,
        "activeCodes": ["P0300", "P0420", "P0455", "P0171", "P0128"]
      }));
    });
    return;
  }

  // @endpoint DELETE /vehicle/:id
  if (method === 'DELETE' && /^\/vehicle\/[^/]+$/.test(url)) {
    res.writeHead(204);
    res.end();
    return;
  }

  // ─── SAFETY SCAN ───────────────────────────────────────────────────────────

  // @endpoint POST /run
  if (method === 'POST' && url === '/run' && headers['x-mock-response-code'] === '500') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
            "error": {
            "code": "UNEXPECTED_ERROR",
            "message": "An unexpected error occurred.",
            "details": {}
        }
    }));
    });
    return;
  }

  if (method === 'POST' && url === '/run') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "run": "1",
        "status": "QUEUED"
      }));
    });
    return;
  }

  // @endpoint GET /run/:id
  if (method === 'GET' && /^\/run\/[^/]+$/.test(url)) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "run": "1",
      "status": "COMPLETE"
    }));
    return;
  }

  // @endpoint DELETE /run/:id
  if (method === 'DELETE' && /^\/run\/[^/]+$/.test(url)) {
    res.writeHead(200);
    res.end();
    return;
  }

  // ─── REPORTING ─────────────────────────────────────────────────────────────

  // @endpoint POST /diagnostics/generate/:vehicleId
  if (method === 'POST' && /^\/diagnostics\/generate\/[^/]+$/.test(url)) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "status": "queued",
        "id": "1"
      }));
    });
    return;
  }

  // @endpoint GET /diagnostics/:id
  if (method === 'GET' && /^\/diagnostics\/[^/]+$/.test(url)) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "id": "1",
      "status": "success",
      "report": {
        "timestamp": "2026-03-13T10:15:00Z",
        "status": "FAILED",
        "job": {
          "jobId": "JOB-784512",
          "type": "VehicleSafetyScan",
          "completed": true,
          "durationMs": 4823,
          "apiVersion": "v2.4.1"
        },
        "vehicle": {
          "id": 1,
          "vin": "{VEHICLE_IDENTIFICATION_NUMBER}",
          "make": "Honda",
          "model": "Accord",
          "year": 2020,
          "mileage": 45000
        },
        "checks": {
          "tpms": { "status": "OK", "severity": "NONE" },
          "tailLights": { "status": "OK", "severity": "NONE" },
          "oilPressure": { "status": "OK", "severity": "NONE" },
          "sensors": { "status": "OK", "severity": "NONE" },
          "defrost": { "status": "OK", "severity": "NONE" },
          "airbags": { "status": "OK", "severity": "NONE" },
          "battery": { "status": "OK", "voltage": 12.6, "severity": "NONE" }
        },
        "diagnostics": {
          "newCodeDetected": true,
          "activeCodes": [
            { "code": "P0300", "description": "Random/Multiple Cylinder Misfire Detected", "severity": "CRITICAL", "recommendedAction": "Inspect ignition system, spark plugs, and fuel injectors immediately." },
            { "code": "P0420", "description": "Catalyst System Efficiency Below Threshold", "severity": "MAJOR", "recommendedAction": "Inspect catalytic converter and oxygen sensors." },
            { "code": "P0455", "description": "Evaporative Emission System Leak (Large Leak)", "severity": "MAJOR", "recommendedAction": "Check fuel cap, EVAP hoses, and purge valve." },
            { "code": "P0171", "description": "System Too Lean (Bank 1)", "severity": "MAJOR", "recommendedAction": "Inspect for vacuum leaks and check fuel delivery system." },
            { "code": "P0128", "description": "Coolant Thermostat Temperature Below Regulating Temperature", "severity": "MODERATE", "recommendedAction": "Inspect thermostat and coolant temperature sensor." }
          ],
          "failureReason": "Active diagnostic trouble codes detected during safety scan."
        },
        "summary": {
          "overallSafetyStatus": "NOT SAFE TO RELEASE",
          "criticalIssues": 1,
          "majorIssues": 3,
          "moderateIssues": 1,
          "notes": "Vehicle passed physical safety component checks but failed due to active engine diagnostic trouble codes."
        }
      }
    }));
    return;
  }

  // @endpoint POST /diagnostics/send/:id
  if (method === 'POST' && /^\/diagnostics\/send\/[^/]+$/.test(url)) {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      res.writeHead(204);
      res.end();
    });
    return;
  }

  // ─── FALLBACK ──────────────────────────────────────────────────────────────
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Mock route not defined', method, url }));
});

const PORT = process.env.PORT || 4500;
server.listen(PORT, () => console.log('SafeStar mock server running on port ' + PORT));
