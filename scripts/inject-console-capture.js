const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', '.next', 'static');
const scriptPath = path.join(__dirname, '..', 'public', 'dashboard-console-capture.js');

function injectScript(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      injectScript(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const script = fs.readFileSync(scriptPath, 'utf8');
      
      if (!content.includes('dashboard-console-capture')) {
        content = content.replace(
          '</head>',
          `<script>${script}</script></head>`
        );
        fs.writeFileSync(filePath, content);
        console.log(`Injected console capture into ${file}`);
      }
    }
  });
}

injectScript(buildDir);