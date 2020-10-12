const bcrypt = require('bcryptjs')
const Airtable = require('airtable')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const users = await base('Customers')
  const body = await JSON.parse(event.body)
  const createJwtCookie = (userId, email) => {
    const secretKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----
`

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
