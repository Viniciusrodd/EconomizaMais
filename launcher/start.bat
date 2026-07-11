
@echo off

REM ensures that the terminal's working directory is changed to the same directory where the .bat file is saved
cd /d "%~dp0.."

REM containers init
docker compose up -d

REM app init
timeout /t 5 /nobreak >nul
start http://localhost:3000

pause