const getParams = (req, res, next) => {
  req._params = req.params;
  next();
};

module.exports = getParams;
