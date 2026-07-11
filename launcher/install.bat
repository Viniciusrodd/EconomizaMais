
@echo off

REM ensures that the terminal's working directory is changed to the same directory where the .bat file is saved
cd /d "%~dp0.."

REM containers init
docker compose up -d

REM pull ollama model image
docker exec economizaMais-ollama ollama pull mistral:7b-instruct-q4_0

pause