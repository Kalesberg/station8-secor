const { publicKey } = require('../src/functions/publicKey.ts')

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain'
    },
    body: publicKey
  }
}
