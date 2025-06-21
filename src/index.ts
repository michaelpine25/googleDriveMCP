import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { listAllFolders } from './tools/listAllFolders.js'
import { ListFoldersResponse } from './tools/interface.js'

const server = new McpServer({
  name: 'Google Drive',
  version: '1.0.0',
  capabilities: {
    resources: {},
    tools: {},
  },
})

server.tool(
  'list-all-folders',
  'List all folders that exist in the clients google drive account',
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

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Google Drive MCP Server running on stdio')
}

main().catch((err) => {
  console.error('MCP Server failed to start:', err)
  process.exit(1)
})
