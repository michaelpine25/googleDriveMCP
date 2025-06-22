import { ReturnFileResponse } from '../types.js'
import { drive } from '../google/googleClient.js'

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
