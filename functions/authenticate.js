const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const { clearCookie } = require('../src/functions/jwt.ts')
const { publicKey } = require('../src/functions/publicKey.ts')
const { customers } = require('../src/functions/airtable.ts')

exports.handler = async event => {
  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)
  console.log('jwt', cookies.jwt)
  if (!cookies || !cookies.jwt) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        msg: 'There is no jwt cookie, so the request is unauthorized'
      })
    }
  }

  try {
    const payload = jwt.verify(cookies.jwt, publicKey)
    const users = await customers()
    const user = await users.find(payload.userId)
    delete user.fields.Password
    delete user.fields.Name

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: payload.userId,
        email: payload.email,
        user: user.fields
        // user: {
        //   firstName: user.fields['First Name'],
        //   lastName: user.fields['Last Name'],
        //   email: user.fields.Email,
        //   company: user.fields.Company,
        //   phone: user.fields['Phone Number'],
        //   address1: user.fields['Address Line 1'],
        //   address2: user.fields['Address Line 2'],
        //   city: user.fiels.City,
        //   state: user.fields.State,
        //   zipCode: user.fields.zipCode
        // }
      })
    }
  } catch (err) {
    return {
      statusCode: 401,
      headers: {
        'Set-Cookie': clearCookie(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ msg: err.message })
    }
  }
}
