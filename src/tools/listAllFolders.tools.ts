import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { listAllFolders } from '../functions/listAllFolders.js'
import { ListFoldersResponse } from '../types.js'

export function registerListAllFoldersTool(server: McpServer) {
  server.tool(
    'list-all-folders',
    'Retrieves all folders from the client’s Google Drive. This is typically used as the first step to help the language model infer which specific folder to search in for a given document request.',
    {},
    async () => {
      try {
        const response: ListFoldersResponse = await listAllFolders()

        if (response?.success) {
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(response.folders, null, 2),
              },
            ],
          }
        } else {
          return {
            content: [
              {
                type: 'text',
                text: 'Failed to retrieve folders',
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
              text: `Error listing folders: ${error}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
