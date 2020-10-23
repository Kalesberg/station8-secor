const Airtable = require('airtable')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const applications = await base('Job Applications')
  const body = await JSON.parse(event.body)

  const application = await applications.create([
    {
      fields: {
        Status: 'Pending',
        Name: body.applicant.name,
        Position: body.applicant.position,
        Email: body.applicant.email,
        'Phone Number': body.applicant.phone,
        Resume: body.attachment ? [body.attachment] : null,
        Message: body.applicant.message
      }
    }
  ])
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      id: application[0].id
    }),
    ok: true
  })
}
