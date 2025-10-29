const { formatResponse } = require('../tools/helper')

require('dotenv').config()

exports.checkBearerToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length)
    if (token === process.env.SCRAPPER_API_KEY) {
      next()
    } else {
      res.status(403).json(formatResponse('error', null, 'Forbidden action'))
    }
  } else {
    res.status(403).json(formatResponse('error', null, 'Forbidden action'))
  }
}
