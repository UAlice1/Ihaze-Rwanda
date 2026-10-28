@echo off
cd /d "%~dp0frontend"
if not exist node_modules\next\dist\bin\next (
  echo Dependencies are missing. Run npm ci in the frontend folder first.
  pause
  exit /b 1
)
echo AgriInsight frontend: http://127.0.0.1:3000
echo Start Backend.cmd separately for the Python API.
if exist .next\BUILD_ID (
  node node_modules\next\dist\bin\next start --hostname 127.0.0.1 --port 3000
) else (
  node node_modules\next\dist\bin\next dev --hostname 127.0.0.1 --port 3000
)
pause
