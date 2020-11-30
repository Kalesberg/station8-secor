const Airtable = require('airtable')

exports.handler = async (event, context, callback) => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const quotes = await base('Quotes')
  const body = await JSON.parse(event.body)
  console.log(body.attachment)

  const quote = await quotes.create([
    {
      fields: {
        Status: 'Pending',
        Customer: body.user ? [body.user] : null,
        'Full Name': body.customer.name,
        Email: body.customer.email,
        Company: body.customer.company,
        'Phone Number': body.customer.phone,
        'Special Requirements': body.customer.requirements,
        Attachments: body.attachment ? [body.attachment] : null,
        'Quote JSON': JSON.stringify(body.quote),
        Items: body.markdown
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
