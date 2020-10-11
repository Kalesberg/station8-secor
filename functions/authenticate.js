const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const Airtable = require('airtable')

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
    const publicKey = `-----BEGIN PUBLIC KEY-----
    MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxUZOF8b0ak854VjhblhM
    LXQcpwY+j89e9zMdfwG5OD+yv74lvuFajcA9P2zbwFJvfcCJyakHxZ2oeNc9WlXR
    L8Z7/26YJlhxMlgNe8Jvx8V7LiY7DpwaqNnQreltBBvf9YlkGETtJi3ifrFrBU0F
    tAVqaBK3v11YmFAE/2fx1m/InGEC8o03xFCKNBPnpqL/VNYFP2UODBCnu9sXmr3M
    ZxrVJPr2ku0lK5XkUDcjEa+rcYqq/0h1EA6IymRsoJvYg5Pn0yB2VJhny3xOAtXM
    2zcRhl99s30R+/BbcLXidGGt/azcy5D0gKIr7MivXmtZCMXurNfHbe1fMbI7YQWK
    ZdfNuWffPFVsVNVkjBYe0dNWTxxqLHYGcg5oIEG9SDDEO1VCyQFp2SvLygrgBvcN
    uLb/UUOBc0Ye42l3A2focKS1IQvTjN6xjd6WuQptEEMaPnUik3qr59BtArkjaeeR
    TmDquzJaJtcpKPNhIS6PU0YTlEtHD+YSpcCOTvcsMnyvA5oqktBFabULQrBpagMv
    h+Nxh+eGBF2A6wr0OQA4zy1ri6Rma9qw33jcfTyOZeC/9JeqdHWoWDuFu+e/EgiK
    zisNQ8kaC3zaUbA9VpkV0q44lPBOhzMpQLAus33Cuvz5Cyaaw+qpWh0LCx6u0ssz
    rJCjnlrAGTUa7lS91ketId8CAwEAAQ==
    -----END PUBLIC KEY-----
    `
    const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
    const users = await base('Customers')
    const payload = jwt.verify(cookies.jwt, publicKey)
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
      })
    }
  } catch (err) {
    return {
      statusCode: 401,
      headers: {
        'Set-Cookie': 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ msg: err.message })
    }
  }
}
