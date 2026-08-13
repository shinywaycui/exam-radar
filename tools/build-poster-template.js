const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'assets', 'shinyway-info-template.jpg');
const output = path.join(root, 'js', 'posterTemplateData.js');
const base64 = fs.readFileSync(source).toString('base64');

fs.writeFileSync(
  output,
  `/* 由 tools/build-poster-template.js 自动生成，解决 file:// 下 Canvas 无法导出的问题。 */\nwindow.POSTER_TEMPLATE_DATA="data:image/jpeg;base64,${base64}";\n`,
  'utf8',
);

console.log(`已生成 ${path.relative(root, output)}`);
