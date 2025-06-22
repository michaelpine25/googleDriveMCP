import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Folder, ListFoldersResponse } from '../types.js'

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

export const listAllFolders = async (): Promise<ListFoldersResponse> => {
  try {
    const folderQuery = `mimeType = 'application/vnd.google-apps.folder' and trashed = false`
    const folderRes = await drive.files.list({
      q: folderQuery,
      fields: 'files(id, name)',
      spaces: 'drive',
      pageSize: 1000,
    })

    const folders: Folder[] =
      folderRes.data.files?.map((folder) => ({
        id: folder.id,
        name: folder.name,
      })) || []

    return {
      success: true,
      folders,
    }
  } catch (error) {
    console.error('Error listing client folders:', error)
    return {
      success: false,
      message: `Error listing client folders: ${error}`,
    }
  }
}
