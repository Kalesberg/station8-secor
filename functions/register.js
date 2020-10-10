const bcrypt = require('bcryptjs')
const Airtable = require('airtable')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const users = await base('Customers')
  const body = await JSON.parse(event.body)
  const password = await bcrypt.hash(body.password, 10)

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
    if (!records.length) {
      const user = await users.create([
        {
          fields: {
            'First Name': body.firstName,
            'Last Name': body.lastName,
            Company: body.company,
            Email: body.email.trim().toLowerCase(),
            'Phone Number': body.phone,
            Password: password,
            'Address Line 1': body.addressLineOne,
            'Address Line 2': body.addressLineTwo,
            City: body.city,
            State: body.state,
            ZIP: body.zip
          }
        }
      ])
      callback(null, {
        statusCode: 200,
        headers: {
          'Set-Cookie': createJwtCookie(user[0].id, body.email.trim().toLowerCase()),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: user[0].id,
          email: body.email.trim().toLowerCase()
        }),
        ok: true
      })
    } else {
      callback(null, {
        statusCode: 201,
        body: JSON.stringify({
          message: 'User already exists'
        }),
        ok: true
      })
    }
  })
}
