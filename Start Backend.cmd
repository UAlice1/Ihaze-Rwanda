@echo off
cd /d "%~dp0"
where python >nul 2>nul
if errorlevel 1 goto bundled
python -m backend.server
goto done
:bundled
if exist "C:\Users\hp\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" (
  "C:\Users\hp\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m backend.server
) else (
  echo Python 3 is needed. Install it from python.org, or open dist\index.html for standalone mode.
)
:done
pause
