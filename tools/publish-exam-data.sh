#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

DATA_FILE="小语种考试营销雷达_数据模板_V2.xlsx"
LEGACY_FILE="小语种考试营销雷达数据模板V2.xlsx"

if [[ ! -f "$DATA_FILE" && -f "$LEGACY_FILE" ]]; then
  mv "$LEGACY_FILE" "$DATA_FILE"
  echo "已自动恢复标准表格文件名：$DATA_FILE"
fi

if [[ ! -f "$DATA_FILE" ]]; then
  echo "错误：未找到 $ROOT_DIR/$DATA_FILE" >&2
  echo "请确认 Excel 已保存到项目目录，且文件名未被修改。" >&2
  exit 1
fi

# 项目级身份不依赖电脑主机名，避免 localhost 环境无法提交。
git config user.name "$(git config user.name 2>/dev/null || echo shinywaycui)"
git config user.email "$(git config user.email 2>/dev/null || echo shinywaycui@users.noreply.github.com)"

echo "[1/5] 同步 GitHub main，并保护尚未提交的本地修改……"
git pull --rebase --autostash origin main

echo "[2/5] 根据 V2 表格生成网站数据……"
node tools/build-local-data.js

echo "[3/5] 暂存表格和网站数据……"
git add "$DATA_FILE" js/localExcelData.js

if git diff --cached --quiet; then
  echo "没有检测到新的表格内容；检查是否有尚未推送的提交……"
else
  echo "[4/5] 创建数据提交……"
  git commit --no-gpg-sign -m "更新考试数据"
fi

echo "[5/5] 推送到 GitHub main……"
if ! git push origin main; then
  echo "远程刚有新提交，正在安全同步后重试一次……"
  git pull --rebase --autostash origin main
  git push origin main
fi

echo "上传成功：GitHub main 已更新，Cloudflare Pages 将自动部署。"
