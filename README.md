# Google Drive MCP

This project connects Claude Desktop to your Google Drive via the Model Context Protocol (MCP), allowing Claude to access and interact with your Drive files and folders securely.

## Setup and Usage

Follow these steps in order to get the app running:

1. **Get Google OAuth Credentials**

   - Go to the [Google Cloud Console Credentials page](https://console.cloud.google.com/apis/credentials) to create a project and enable the Google Drive API.
   - Create **OAuth 2.0 Client IDs** credentials with application type **Desktop app**.
   - Note your **Client ID**, **Client Secret**, and set your **Redirect URI** to `http://localhost:3000`.

2. **Create a `.env` File**

   In the root of your project, create a `.env` file and add the following variables:

CLIENT_ID=your-client-id-here
CLIENT_SECRET=your-client-secret-here
REDIRECT_URI=http://localhost:3000

3. **Install Dependencies**

```
npm install
```

4. **Generate Google API Token**

```
npm run tokenGenerator
```

This will open a browser to authenticate with Google and save a token.json file in your project root.

5. **Build the project**

```
npm run build
```

6. **Install Claude Desktop (if not already installed)**
   Download and install Claude Desktop from https://claude.ai/download.

7. **Configure Claude Desktop MCP Servers**
   Open the Claude Desktop MCP Server
   Open the Claude Desktop config file at:

   macOS/Linux:
   ~/Library/Application Support/Claude/claude_desktop_config.json

   Windows:
   %APPDATA%\Claude\claude_desktop_config.json

Add the following MCP server configuration, adjusting the path to your build output and environment variables accordingly:

```
{
  "mcpServers": {
    "googleDrive": {
      "command": "node",
      "args": ["path/to/your/build/index.js"],
      "env": {
        "CLIENT_ID": "your-actual-client-id",
        "CLIENT_SECRET": "your-actual-client-secret",
        "REDIRECT_URI": "http://localhost:3000"
      }
    }
  }
}
```

8. **Restart Claude Desktop**

**Notes**
Ensure `.env` and `token.json` are added to `.gitignore` and never committed to version control.

The `token.json` contains your OAuth tokens, allowing token refresh without re-authentication.

The MCP server runs locally and communicates with Claude Desktop over standard input/output (stdio).
