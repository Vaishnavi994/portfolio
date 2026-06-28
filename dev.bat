@echo off
setlocal

cd /d "%~dp0"
node serve-dist.mjs

endlocal
