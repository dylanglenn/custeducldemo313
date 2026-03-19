/**
 * SafeStar Service API - Local Mock Server
 * =========================================
 * 
 * This mock server simulates the SafeStar Service API endpoints discovered in the repository.
 * 
 * Base URL in environments: https://b7a35e0d-179a-4374-a049-7230404e4fe9.mock.pstmn.io
 * 
 * MOCKED ENDPOINTS:
 * -----------------
 * Display:
 *   - GET /display - Get message display upon completed safety checks
 * 
 * Driver Safety:
 *   - POST   /driver/:id - Create Driver Safety Profile
 *   - GET    /driver/:id - Retrieve Driver Safety Profile
 *   - PUT    /driver/:id - Update Driver Safety Profile
 *   - DELETE /driver/:id - Delete Driver Safety Profile
 * 
 * Vehicle Safety:
 *   - POST   /vehicle/:id - Create Vehicle Safety Profile
 *   - GET    /vehicle/:id - Retrieve Vehicle Safety Profile
 *   - PATCH  /vehicle/:id - Update Vehicle Safety Profile
 *   - DELETE /vehicle/:id - Delete Vehicle Safety Profile
 * 
 * Safety Scan:
 *   - POST   /run      - Run safety scan
 *   - GET    /run/:id  - Get run status
 *   - DELETE /run/:id  - Cancel run
 * 
 * Reporting:
 *   - POST /diagnostics/generate/:vehicleId - Run diagnostic and generate report
 *   - GET  /diagnostics/:id                 - Retrieve diagnostic report
 *   - POST /diagnostics/send/:id            - Send diagnostic report
 * 
 * Run with: PORT=4500 node postman/mocks/local-mock-server.js
 */

const http = require('http');

// Helper to parse URL and extract path parameters
function parseUrl(reqUrl, pattern) {
  const reqParts = reqUrl.split('/').filter(Boolean);
  const patternParts = pattern.split('/').filter(Boolean);
  
  if (reqParts.length !== patternParts.length) return null;
  
  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = reqParts[i];
    } else if (patternParts[i] !== reqParts[i]) {
      return null;
    }
  }
  return params;
}

// Helper to collect request body
function collectBody(req, callback) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      callback(body ? JSON.parse(body) : {});
    } catch (e) {
      callback({});
    }
  });
}

// Helper to send JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  const { method } = req;
  const url = req.url.split('?')[0]; // Remove query string

  // @endpoint GET /display
  if (method === 'GET' && url === '/display') {
    sendJson(res, 200, {
      message: 'All safety checks completed successfully',
      status: 'OK',
      timestamp: new Date().toISOString(),
      displayText: 'Vehicle is safe to drive. Have a safe trip!'
    });
    return;
  }

  // @endpoint POST /driver/:id
  let params = parseUrl(url, '/driver/:id');
  if (method === 'POST' && params) {
    collectBody(req, (body) => {
      sendJson(res, 201, {
        id: params.id,
        message: 'Driver safety profile created successfully',
        createdAt: new Date().toISOString(),
        profile: {
          driverId: params.id,
          safetyScore: 100,
          totalTrips: 0,
          incidents: 0,
          ...body
        }
      });
    });
    return;
  }

  // @endpoint GET /driver/:id
  if (method === 'GET' && params) {
    sendJson(res, 200, {
      id: params.id,
      driverId: params.id,
      safetyScore: 95,
      totalTrips: 127,
      incidents: 2,
      lastTripDate: '2024-01-15T10:30:00Z',
      status: 'active',
      certifications: ['defensive_driving', 'hazmat'],
      createdAt: '2023-06-01T08:00:00Z',
      updatedAt: new Date().toISOString()
    });
    return;
  }

  // @endpoint PUT /driver/:id
  if (method === 'PUT' && params) {
    collectBody(req, (body) => {
      sendJson(res, 200, {
        id: params.id,
        message: 'Driver safety profile updated successfully',
        updatedAt: new Date().toISOString(),
        profile: {
          driverId: params.id,
          safetyScore: body.safetyScore || 95,
          totalTrips: body.totalTrips || 127,
          incidents: body.incidents || 2,
          ...body
        }
      });
    });
    return;
  }

  // @endpoint DELETE /driver/:id
  if (method === 'DELETE' && params) {
    sendJson(res, 200, {
      id: params.id,
      message: 'Driver safety profile deleted successfully',
      deletedAt: new Date().toISOString()
    });
    return;
  }

  // @endpoint POST /vehicle/:id
  params = parseUrl(url, '/vehicle/:id');
  if (method === 'POST' && params) {
    collectBody(req, (body) => {
      sendJson(res, 201, {
        id: params.id,
        message: 'Vehicle safety profile created successfully',
        createdAt: new Date().toISOString(),
        profile: {
          vehicleId: params.id,
          vin: body.vin || 'MOCK_VIN_12345678901234567',
          tpms: body.tpms || 'OK',
          tailLights: body.tailLights || 'OK',
          oilPressure: body.oilPressure || 'OK',
          sensors: body.sensors || 'OK',
          defrost: body.defrost || 'OK',
          airbags: body.airbags || 'OK',
          battery: body.battery || 'OK',
          newCode: body.newCode || false,
          activeCodes: body.activeCodes || []
        }
      });
    });
    return;
  }

  // @endpoint GET /vehicle/:id
  if (method === 'GET' && params) {
    sendJson(res, 200, {
      id: params.id,
      vehicleId: params.id,
      vin: '1HGBH41JXMN109186',
      tpms: 'OK',
      tailLights: 'OK',
      oilPressure: 'OK',
      sensors: 'OK',
      defrost: 'OK',
      airbags: 'OK',
      battery: 'OK',
      newCode: false,
      activeCodes: [],
      lastInspection: '2024-01-10T14:00:00Z',
      status: 'active',
      createdAt: '2023-05-15T09:00:00Z',
      updatedAt: new Date().toISOString()
    });
    return;
  }

  // @endpoint PATCH /vehicle/:id
  if (method === 'PATCH' && params) {
    collectBody(req, (body) => {
      sendJson(res, 200, {
        id: params.id,
        message: 'Vehicle safety profile updated successfully',
        updatedAt: new Date().toISOString(),
        profile: {
          vehicleId: params.id,
          ...body
        }
      });
    });
    return;
  }

  // @endpoint DELETE /vehicle/:id
  if (method === 'DELETE' && params) {
    sendJson(res, 200, {
      id: params.id,
      message: 'Vehicle safety profile deleted successfully',
      deletedAt: new Date().toISOString()
    });
    return;
  }

  // @endpoint POST /run
  if (method === 'POST' && url === '/run') {
    collectBody(req, (body) => {
      sendJson(res, 201, {
        runId: Math.floor(Math.random() * 10000),
        status: 'running',
        vehicle: body.vehicle || '1002',
        driver: body.driver || '1001',
        startedAt: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 60000).toISOString(),
        message: 'Safety scan initiated successfully'
      });
    });
    return;
  }

  // @endpoint GET /run/:id
  params = parseUrl(url, '/run/:id');
  if (method === 'GET' && params) {
    sendJson(res, 200, {
      runId: params.id,
      status: 'completed',
      vehicle: '1002',
      driver: '1001',
      startedAt: '2024-01-15T10:00:00Z',
      completedAt: new Date().toISOString(),
      results: {
        overallStatus: 'PASS',
        checksPerformed: 12,
        checksPassed: 12,
        checksFailed: 0,
        warnings: 0
      }
    });
    return;
  }

  // @endpoint DELETE /run/:id
  if (method === 'DELETE' && params) {
    sendJson(res, 200, {
      runId: params.id,
      message: 'Safety scan run cancelled successfully',
      cancelledAt: new Date().toISOString()
    });
    return;
  }

  // @endpoint POST /diagnostics/generate/:vehicleId
  params = parseUrl(url, '/diagnostics/generate/:vehicleId');
  if (method === 'POST' && params) {
    collectBody(req, (body) => {
      sendJson(res, 201, {
        reportId: Math.floor(Math.random() * 10000),
        vehicleId: params.vehicleId,
        status: 'generated',
        generatedAt: new Date().toISOString(),
        message: 'Diagnostic report generated successfully',
        summary: {
          totalIssues: 0,
          criticalIssues: 0,
          warnings: 1,
          recommendations: ['Schedule routine maintenance within 30 days']
        }
      });
    });
    return;
  }

  // @endpoint GET /diagnostics/:id
  params = parseUrl(url, '/diagnostics/:id');
  if (method === 'GET' && params) {
    sendJson(res, 200, {
      reportId: params.id,
      vehicleId: '1002',
      generatedAt: '2024-01-15T11:00:00Z',
      status: 'complete',
      diagnostics: {
        engine: { status: 'OK', details: 'No issues detected' },
        transmission: { status: 'OK', details: 'Operating normally' },
        brakes: { status: 'OK', details: 'Brake pads at 75%' },
        battery: { status: 'OK', details: 'Voltage: 12.6V' },
        tires: { status: 'WARNING', details: 'Front left tire pressure low' },
        emissions: { status: 'OK', details: 'Within acceptable range' }
      },
      activeCodes: [],
      recommendations: ['Check front left tire pressure']
    });
    return;
  }

  // @endpoint POST /diagnostics/send/:id
  params = parseUrl(url, '/diagnostics/send/:id');
  if (method === 'POST' && params) {
    collectBody(req, (body) => {
      sendJson(res, 200, {
        reportId: params.id,
        message: 'Diagnostic report sent successfully',
        sentAt: new Date().toISOString(),
        recipient: body.recipient || 'safestar-service@example.com',
        deliveryStatus: 'delivered'
      });
    });
    return;
  }

  // Fallback: 404 for unmocked routes
  sendJson(res, 404, {
    error: 'Mock route not defined',
    method: method,
    url: url,
    message: 'This endpoint is not mocked. Add a handler for this route if needed.'
  });
});

const PORT = process.env.PORT || 4500;
server.listen(PORT, () => {
  console.log(`SafeStar Service API Mock Server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET    /display`);
  console.log(`  POST   /driver/:id`);
  console.log(`  GET    /driver/:id`);
  console.log(`  PUT    /driver/:id`);
  console.log(`  DELETE /driver/:id`);
  console.log(`  POST   /vehicle/:id`);
  console.log(`  GET    /vehicle/:id`);
  console.log(`  PATCH  /vehicle/:id`);
  console.log(`  DELETE /vehicle/:id`);
  console.log(`  POST   /run`);
  console.log(`  GET    /run/:id`);
  console.log(`  DELETE /run/:id`);
  console.log(`  POST   /diagnostics/generate/:vehicleId`);
  console.log(`  GET    /diagnostics/:id`);
  console.log(`  POST   /diagnostics/send/:id`);
});
