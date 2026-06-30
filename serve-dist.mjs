import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const port = Number(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
}

function send(res, statusCode, headers, body) {
  res.writeHead(statusCode, headers)
  res.end(body)
}

function resolveAsset(requestPath) {
  const normalized = path.normalize(requestPath).replace(/^([.]{2}[\\/])+/, '')
  const filePath = path.join(distDir, normalized)
  const resolved = path.resolve(filePath)

  if (!resolved.startsWith(distDir)) {
    return null
  }

  return resolved
}

http
  .createServer((req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
    let pathname = url.pathname

    if (pathname === '/') {
      pathname = '/index.html'
    }

    const filePath = resolveAsset(pathname)
    if (!filePath) {
      send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not found')
      return
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not found')
        return
      }

      const ext = path.extname(filePath).toLowerCase()
      send(res, 200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' }, data)
    })
  })
  .listen(port, host, () => {
    console.log(`Static preview ready at http://localhost:${port}/`)
  })
