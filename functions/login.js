const bcrypt = require('bcryptjs')
const { customers } = require('../src/functions/airtable.ts')
const { createJwtCookie } = require('../src/functions/jwt.ts')

exports.handler = async (event, context, callback) => {
  const users = await customers()
  const body = await JSON.parse(event.body)

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
