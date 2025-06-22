export interface MCPTool {
  name: string
  description: string
  parameters: any
  invoke: (input: { arguments: any }) => Promise<any>
}

export interface ListFoldersResponse {
  success: boolean
  folders?: Folder[]
  message?: string
}

export interface Folder {
  id: string | null | undefined
  name: string | null | undefined
}

export interface ListFilesResponse {
  success: boolean
  files?: File[]
  message?: string
}

export interface ReturnFileResponse {
  success: boolean
  file?: File
  message?: string
}

export interface File {
  id: string | null | undefined
  name: string | null | undefined
  viewLink?: string | null
  downloadLink?: string | null
}
