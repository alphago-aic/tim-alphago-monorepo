// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const resp = await fetch('http://34.87.146.224:8000/generative', {
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
