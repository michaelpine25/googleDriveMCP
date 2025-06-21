import * as dotenv from 'dotenv'
dotenv.config()

import http from 'http'
import open from 'open'
import url from 'url'
import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const PORT = 3000
const TOKEN_PATH = path.join(process.cwd(), 'token.json')

const REDIRECT_URI = `http://localhost:${PORT}`
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

async function getAccessToken() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
  })

  const server = http.createServer(async (req, res) => {
    if (!req.url) return

    const query = new url.URL(req.url, REDIRECT_URI).searchParams
    const code = query.get('code')
    if (code) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(
        '<h1>Authentication successful!</h1><p>You can close this tab.</p>'
      )

      server.close()

      try {
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2))
        console.log(`Token stored to ${TOKEN_PATH}`)
      } catch (err) {
        console.error('Error retrieving access token:', err)
      }
    }
  })

  server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
    open(authUrl, { wait: false }).then((cp) => cp.unref())
  })
}

getAccessToken().catch(console.error)
