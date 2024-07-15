const adminAuth = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).send({ error: "Access denied." });
  }
};

module.exports = adminAuth;
