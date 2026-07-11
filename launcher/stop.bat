
@echo off

REM ensures that the terminal's working directory is changed to the same directory where the .bat file is saved
cd /d "%~dp0.."

REM containers stop
docker compose stop

pause