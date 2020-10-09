
const Airtable = require('airtable')
const bcrypt = require('bcryptjs')
const { createJwtCookie } = require('../src/functions/createJwtCookie.ts')

exports.handler = async function (event, context, callback) {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const customers = await base('Customers')
  const body = await JSON.parse(event.body)
  const password = await bcrypt.hash(body.password, 10)

  await customers.select({
    maxRecords: 1,
    filterByFormula: `Email='${body.email.trim().toLowerCase()}'`
  }).eachPage(async records => {
    if (!records.length) {
      const user = await customers.create([
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
