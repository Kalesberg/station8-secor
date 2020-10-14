const Airtable = require('airtable')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const quotes = await base('Quotes')
  const body = await JSON.parse(event.body)
  console.log(body)

  const quote = await quotes.create([
    {
      fields: {
        Status: 'Pending',
        Customer: [body.user],
        'Full Name': body.customer.name,
        Email: body.customer.email,
        Company: body.customer.company,
        'Phone Number': body.customer.phone,
        'Special Requirements': body.customer.requirements,
        Attachments: [{ url: body.customer.attachments }]
      }
    }
  ])
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      id: quote[0].id
    }),
    ok: true
  })
}
