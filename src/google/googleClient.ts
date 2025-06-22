import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TOKEN_PATH = path.resolve(__dirname, '../../token.json')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'))
oauth2Client.setCredentials(token)

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token || tokens.access_token) {
    const newToken = {
      ...token,
      ...tokens,
      expiry_date: tokens.expiry_date || token.expiry_date,
    }
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(newToken, null, 2))
  }
})

export const drive = google.drive({ version: 'v3', auth: oauth2Client })
