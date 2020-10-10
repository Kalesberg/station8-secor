
const Airtable = require('airtable')

const customers = async () => {
  const base = await new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE_ID)
  const customers = await base('Customers')
  return customers
}

module.exports = { customers }
