const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

const PORT = 8000;
const HOST = 'localhost';

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath).toLowerCase();

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Erro ao processar: ' + err.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[extname] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    const url = `http://${HOST}:${PORT}`;
    console.log('\n✅ Servidor iniciado!');
    console.log(`📍 Acesse em: ${url}`);
    console.log('\n▶️ Abrindo no Chrome...');
    console.log('Pressione Ctrl+C para parar o servidor\n');

    // Abre automaticamente no Chrome
    const isWindows = os.platform() === 'win32';
    const isMac = os.platform() === 'darwin';
    const isLinux = os.platform() === 'linux';

    if (isWindows) {
        exec(`start chrome "${url}"`);
    } else if (isMac) {
        exec(`open -a "Google Chrome" "${url}"`);
    } else if (isLinux) {
        exec(`google-chrome "${url}"`);
    } else {
        console.log(`Acesse manualmente: ${url}`);
    }
});
