import { z } from 'zod'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { returnFile } from '../functions/returnFile.js'

export function registerReturnFileTool(server: McpServer) {
  server.tool(
    'get-file-download-link',
    'Retrieves a direct download link for a specific file in the client’s Google Drive. This is typically used after identifying the desired file to provide access for download or online viewing.',
    {
      fileId: z
        .string()
        .describe('The ID of the file to retrieve the download link for'),
    },
    async ({ fileId }) => {
      try {
        const response = await returnFile(fileId)

        if (response?.success) {
          return {
            content: [
              {
                type: 'text',
                text: `Download **${response.file?.name}**:\n${response.file?.downloadLink}\n\nView Online:\n${response.file?.viewLink}`,
              },
            ],
          }
        } else {
          return {
            content: [
              {
                type: 'text',
                text:
                  response.message ||
                  'Failed to retrieve the file download link.',
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
              text: `Error retrieving file download link: ${error}`,
            },
          ],
          isError: true,
        }
      }
    }
  )
}
