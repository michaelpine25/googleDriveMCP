import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { registerAllTools } from './tools/index.js'

const server = new McpServer({
  name: 'Google Drive',
  version: '1.0.0',
})

// Register all tools
registerAllTools(server)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Google Drive MCP Server running on stdio')
}

main().catch((err) => {
  console.error('MCP Server failed to start:', err)
  process.exit(1)
})
