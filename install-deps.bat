@echo off
setlocal
cd /d "%~dp0"

where pnpm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] pnpm 未安装或不在 PATH 中。
  echo 请先安装 Node.js 20+ 和 pnpm。
  exit /b 1
)

echo [INFO] 正在安装依赖...
pnpm install
if errorlevel 1 (
  echo [ERROR] 依赖安装失败。
  exit /b 1
)

echo [OK] 依赖安装完成。
exit /b 0
