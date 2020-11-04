const bcrypt = require('bcryptjs')
const Airtable = require('airtable')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const users = await base('Customers')
  const body = await JSON.parse(event.body)
  const editing = await body.editing
  const password = await bcrypt.hash(body.Password, 10)

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

  const fields = () => {
    if (editing === 'company') {
      return {
        Company: body.Company.trim()
      }
    }
    if (editing === 'address') {
      return {
        'Address Line 1': body['Address Line 1'].trim(),
        'Address Line 2': body['Address Line 2'].trim(),
        City: body.City.trim(),
        State: body.State.trim(),
        ZIP: body.ZIP.trim()
      }
    }
    if (editing === 'name') {
      return {
        'First Name': body['First Name'].trim(),
        'Last Name': body['Last Name'].trim()
      }
    }
    if (editing === 'phone') {
      return {
        'Phone Number': body['Phone Number']
      }
    }
    if (editing === 'email') {
      return {
        Email: body.Email.trim().toLowerCase()
      }
    }
    if (editing === 'password') {
      return {
        Password: password
      }
    }
  }

  const user = await users.update([{
    id: body.userId,
    fields: fields()
  }])

  callback(null, {
    statusCode: 200,
    headers: {
      'Set-Cookie': createJwtCookie(user[0].id, user[0].fields.Email.trim().toLowerCase()),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: user[0].id,
      email: user[0].fields.Email.trim().toLowerCase()
    }),
    ok: true
  })
}
