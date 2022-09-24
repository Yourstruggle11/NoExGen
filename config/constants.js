import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const TEMPLATE_DIR = path.join(__dirname, '..', 'templates')

// all users can read and write but cannot execute
export const MODE_0666 = parseInt('0666', 8)

// read and execute access for everyone and also write access for the owner of the file.
export const MODE_0755 = parseInt('0755', 8)
