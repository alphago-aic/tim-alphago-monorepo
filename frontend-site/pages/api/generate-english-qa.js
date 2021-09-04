// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const resp = await fetch('http://api.sqna.xyz/api2-generative/', {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await resp.json()
    res.status(200).json(data)
  }
}
