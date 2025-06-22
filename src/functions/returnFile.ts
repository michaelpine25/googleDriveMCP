import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ReturnFileResponse } from '../types.js'

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

const drive = google.drive({ version: 'v3', auth: oauth2Client })

export const returnFile = async (
  fileId: string
): Promise<ReturnFileResponse> => {
  try {
    const res = await drive.files.get({
      fileId,
      fields: 'id, name, webViewLink, webContentLink',
      alt: 'json',
    })

    const file = res.data

    return {
      success: true,
      file: {
        id: file.id,
        name: file.name,
        viewLink: file.webViewLink,
        downloadLink: file.webContentLink,
      },
    }
  } catch (error) {
    console.error('Error getting file download link:', error)
    return {
      success: false,
      message: `Error getting file download link: ${error}`,
    }
  }
}
