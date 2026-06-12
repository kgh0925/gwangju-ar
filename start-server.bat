@echo off
cd /d "%~dp0"
"C:\Users\alstj\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 8000 --bind 127.0.0.1
pause
