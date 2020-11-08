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
        Customer: [body.user],
        Name: body.name,
        Email: body.email,
        Company: body.company,
        'Phone Number': body.phone,
        Message: body.requirements,
        Attachments: body.attachment ? [body.attachment] : null
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
