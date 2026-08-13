const fs = require('fs');
const path = require('path');
const XLSX = require('../lib/xlsx.full.min.js');

const root = path.resolve(__dirname, '..');
const sourceArg = process.argv[2] || '小语种考试营销雷达_数据模板_V2.xlsx';
const sourcePath = path.isAbsolute(sourceArg) ? sourceArg : path.join(root, sourceArg);
const sourceName = path.basename(sourcePath);
const outputPath = path.join(root, 'js', 'localExcelData.js');
const workbook = XLSX.read(fs.readFileSync(sourcePath), { type: 'buffer', cellDates: true });
const raw = {};
const pad = value => String(value).padStart(2, '0');
const serializeCell = value => value instanceof Date && !Number.isNaN(value)
  ? `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
  : value;

for (const sheetName of workbook.SheetNames) {
  raw[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    defval: '',
    raw: true,
  }).map(row => Object.fromEntries(Object.entries(row).map(([key, value]) => [key, serializeCell(value)])));
}

const stat = fs.statSync(sourcePath);
const payload = {
  fileName: sourceName,
  sourceModifiedAt: stat.mtime.toISOString(),
  raw,
};

fs.writeFileSync(
  outputPath,
  `/* 由 tools/build-local-data.js 根据 ${sourceName} 自动生成，请勿手工修改。 */\nwindow.LOCAL_EXCEL_DATA=${JSON.stringify(payload)};\n`,
  'utf8',
);

console.log(`已生成 ${path.relative(root, outputPath)}`);
console.log(`工作表：${workbook.SheetNames.join('、')}`);
