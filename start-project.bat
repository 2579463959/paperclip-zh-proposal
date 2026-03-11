@echo off
setlocal
cd /d "%~dp0"

where pnpm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] pnpm 未安装或不在 PATH 中。
  echo 请先安装 Node.js 20+ 和 pnpm。
  exit /b 1
)

if not exist "node_modules" (
  echo [INFO] 未检测到 node_modules，先安装依赖...
  call "%~dp0install-deps.bat"
  if errorlevel 1 exit /b 1
)

echo [INFO] 正在启动 Paperclip...
start "Paperclip" http://localhost:3100
pnpm dev:once
