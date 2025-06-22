import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { listFilesInFolder } from '../functions/listFilesInFolder.js'
import { ListFilesResponse } from '../types.js'

export function registerListFilesInFolderTool(server: McpServer) {
  server.tool(
    'list-files-in-folder',
    'Retrieves all files within a specified folder in the client’s Google Drive. This is typically used after selecting the correct folder to locate a specific document requested by the user.',
    {
      folderId: z.string().describe('The ID of the folder to list files from'),
    },
    async ({ folderId }) => {
      try {
        const response: ListFilesResponse = await listFilesInFolder(folderId)

        if (response?.success) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(response.files, null, 2),
              },
            ],
          }
        } else {
          return {
            content: [
              {
                type: 'text',
                text: 'Failed to retrieve files in the folder.',
              },
            ],
            isError: true,
          }
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error listing files in folder: ${error}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
