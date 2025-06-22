import { ListFilesResponse } from '../types.js'
import { drive } from '../google/googleClient.js'

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
