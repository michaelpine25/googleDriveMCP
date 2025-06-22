import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerListAllFoldersTool } from './listAllFolders.tools.js'
import { registerListFilesInFolderTool } from './listFilesInFolder.tools.js'

export function registerAllTools(server: McpServer) {
  registerListAllFoldersTool(server)
  registerListFilesInFolderTool(server)
}
