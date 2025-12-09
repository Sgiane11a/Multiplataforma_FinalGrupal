// Middleware para logging de requests
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;
  
  console.log(`${timestamp} - ${method} ${url} - IP: ${ip}`);
  
  // Log del body para requests POST/PUT
  if ((method === 'POST' || method === 'PUT') && req.body && Object.keys(req.body).length > 0) {
    console.log('📋 Body recibido:', JSON.stringify(req.body, null, 2));
  }
  
  next();
};

module.exports = logger;