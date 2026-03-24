const http = require("http");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Normalize URL by removing query strings for matching
  const normalizedUrl = url.split("?")[0];

  // === DISPLAY ===

  // @endpoint GET /display
  if (method == "GET" && url == "/display") {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Display/.resources/Get message display upon completed safety checks.resources/examples/200 - Display custom message after successful run.example.yaml", res);
  }

  // === DRIVER SAFETY ===

  // @endpoint POST /driver/:id
  if (method == "POST" && url == "/driver/:id") {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Driver Safety/.resources/Create Driver Safety Profile.resources/examples/201 Created - Profile Created.example.yaml", res);
  }

  // @endpoint GET /driver/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Driver Safety/Retrieve Driver Safety Profile.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Driver Safety/.resources/Retrieve Driver Safety Profile.resources/examples/200 OK - Profile Found.example.yaml", res);
  }

  // @endpoint PUT /driver/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Driver Safety/Update Driver Safety Profile.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Driver Safety/.resources/Update Driver Safety Profile.resources/examples/200 OK - Profile Updated.example.yaml", res);
  }

  // @endpoint DELETE /driver/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Driver Safety/Delete Driver Safety Profile.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Driver Safety/.resources/Delete Driver Safety Profile.resources/examples/204 No Content - Profile Deleted.example.yaml", res);
  }

  // === REPORTING ===

  // @endpoint POST /diagnostics/generate/:vehicleId
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Reporting/Run diagnostic and generate report.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Reporting/.resources/Run diagnostic and generate report.resources/examples/201 - Diagnostic report generated successfully.example.yaml", res);
  }

  // @endpoint GET /diagnostics/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Reporting/Retrieve diagnostic report.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Reporting/.resources/Retrieve diagnostic report.resources/examples/200 - Report sucessfully retrieve.example.yaml", res);
  }

  // @endpoint POST /diagnostics/send/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Reporting/Send diagnostic report.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Reporting/.resources/Send diagnostic report.resources/examples/204 - Report sent successfully.example.yaml", res);
  }

  // === VEHICLE SAFETY ===

  // @endpoint POST /vehicle/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Vehicle Safety/Create Vehicle Safety Profile.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Vehicle Safety/.resources/Create Vehicle Safety Profile.resources/examples/201 Created - Vehicle Profile Created.example.yaml", res);
  }

  // @endpoint GET /vehicle/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Vehicle Safety/Retrieve Vehicle Safety Profile.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Vehicle Safety/.resources/Retrieve Vehicle Safety Profile.resources/examples/200 OK - Vehicle Profile Found.example.yaml", res);
  }

  // @endpoint PATCH /vehicle/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Vehicle Safety/Update Vehicle Safety Profile.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Vehicle Safety/.resources/Update Vehicle Safety Profile.resources/examples/200 OK - Vehicle Profile Updated.example.yaml", res);
  }

  // @endpoint DELETE /vehicle/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Vehicle Safety/Delete Vehicle Safety Profile.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Vehicle Safety/.resources/Delete Vehicle Safety Profile.resources/examples/204 No Content - Vehicle Profile Deleted.example.yaml", res);
  }

  // === VEHICLE SAFETY - SAFETY SCAN ===

  // @endpoint POST /run
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Vehicle Safety/Safety Scan/Run.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Vehicle Safety/Safety Scan/.resources/Run.resources/examples/201 - Run started successfully.example.yaml", res);
  }

  // @endpoint GET /run/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Vehicle Safety/Safety Scan/Run Status.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Vehicle Safety/Safety Scan/.resources/Run Status.resources/examples/200 - Completed run retrieved successfully.example.yaml", res);
  }

  // @endpoint DELETE /run/:id
  if (pm.mock.matchRequest("postman/collections/SafeStar Service API/Vehicle Safety/Safety Scan/Cancel Run.request.yaml", req)) {
    return pm.mock.sendExample("postman/collections/SafeStar Service API/Vehicle Safety/Safety Scan/.resources/Cancel Run.resources/examples/204 - Run cancelled successfully.example.yaml", res);
  }

  // 404 Fallback for unmocked routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Mock route not defined", method, url }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
