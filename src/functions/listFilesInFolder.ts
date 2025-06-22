import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { ListFilesResponse } from '../types.js'

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

export const listFilesInFolder = async (
  folderId: string
): Promise<ListFilesResponse> => {
  try {
    const fileQuery = `'${folderId}' in parents and trashed = false`
    const fileRes = await drive.files.list({
      q: fileQuery,
      fields: 'files(id, name)',
      spaces: 'drive',
      pageSize: 1000,
    })

    const files =
      fileRes.data.files?.map((file) => ({
        id: file.id,
        name: file.name,
      })) || []

    return {
      success: true,
      files,
    }
  } catch (error) {
    console.error('Error listing files in folder:', error)
    return {
      success: false,
      message: `Error listing files in folder: ${error}`,
    }
  }
}
