const bcrypt = require('bcryptjs')
const Airtable = require('airtable')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const users = await base('Customers')
  const body = await JSON.parse(event.body)
  const createJwtCookie = (userId, email) => {
    const secretKey = '-----BEGIN RSA PRIVATE KEY-----\n' + process.env.JWT_SECRET_KEY + '\n-----END RSA PRIVATE KEY-----'

    const token = jwt.sign({ userId, email }, secretKey, {
      algorithm: 'RS256',
      expiresIn: '100 days'
    })

    return cookie.serialize('jwt', token, {
      secure: process.env.NETLIFY_DEV !== 'true',
      httpOnly: true,
      path: '/'
    })
  }

  await users.select({
    maxRecords: 1,
    filterByFormula: `Email='${body.email.trim().toLowerCase()}'`
  }).eachPage(async records => {
    console.log('records')
    if (records.length) {
      const matches = await bcrypt.compare(body.password, records[0].fields.Password)
      if (matches) {
        callback(null, {
          statusCode: 200,
          headers: {
            'Set-Cookie': createJwtCookie(records[0].id, body.email.trim().toLowerCase()),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: records[0].id,
            email: body.email.trim().toLowerCase(),
            message: `${body.email.trim().toLowerCase()} logged in.`
          }),
          ok: true
        })
      } else {
        callback(null, {
          statusCode: 401,
          body: JSON.stringify({
            message: 'Unauthorized: Email or password incorrect.'
          }),
          ok: false
        })
      }
    } else {
      callback(null, {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Unauthorized: Email or password incorrect.'
        }),
        ok: false
      })
    }
  })
}
