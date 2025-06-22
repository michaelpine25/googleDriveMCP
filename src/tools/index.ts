import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerListAllFoldersTool } from './listAllFolders.tools.js'

export function registerAllTools(server: McpServer) {
  registerListAllFoldersTool(server)
}
