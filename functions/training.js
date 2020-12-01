const Airtable = require('airtable')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const messages = await base('Contact Form Submissions')
  const body = await JSON.parse(event.body)
  console.log(body.attachment)

  const message = await messages.create([
    {
      fields: {
        Status: 'Pending',
        Email: body.email,
        Message: 'Training information request'
      }
    }
  ])
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      id: message[0].id
    }),
    ok: true
  })
}
