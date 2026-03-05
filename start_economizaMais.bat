@echo off
title Inicializando Economiza+...

echo ============================================
echo   INICIANDO SISTEMA ECONOMIZA+
echo ============================================
echo.

set "SCRIPT_DIR=%~dp0"
set "SHORTCUT=%USERPROFILE%\Desktop\Economiza+.lnk"

REM -----------------------------------------------------------
REM CRIA ATALHO APENAS NA PRIMEIRA EXECUÇÃO
REM -----------------------------------------------------------
if not exist "%SHORTCUT%" (
    echo Criando atalho na área de trabalho...
    powershell -Command "$s = (New-Object -COM WScript.Shell).CreateShortcut('%SHORTCUT%'); $s.TargetPath = '%SCRIPT_DIR%start_economizaMais.bat'; $s.WorkingDirectory = '%SCRIPT_DIR:~0,-1%'; $s.IconLocation = '%SCRIPT_DIR%frontend\favicon.ico'; $s.Description = 'Economiza+ - Iniciar Sistema Completo'; $s.Save()"
    echo ✓ Atalho criado!
    echo.
)

REM -----------------------------------------------------------
REM PARAR SERVIÇOS EXISTENTES (SE NECESSÁRIO)
REM -----------------------------------------------------------

REM Encontrar e matar processos Node.js nas portas específicas
for /f "tokens=5" %%i in ('netstat -ano ^| find ":5115" ^| find "LISTENING"') do taskkill /F /PID %%i >nul 2>&1
for /f "tokens=5" %%i in ('netstat -ano ^| find ":5173" ^| find "LISTENING"') do taskkill /F /PID %%i >nul 2>&1

timeout /t 3 >nul

REM -----------------------------------------------------------
REM INICIAR TODOS OS SERVIÇOS
REM -----------------------------------------------------------

echo Iniciando Backend...
start "Economiza+ Backend" cmd /k "cd /D "%SCRIPT_DIR%backend" && npm run dev"

timeout /t 2 >nul

echo Iniciando Frontend...
start "Economiza+ Frontend" cmd /k "cd /D "%SCRIPT_DIR%frontend" && npm run dev"

timeout /t 2 >nul

REM -----------------------------------------------------------
REM AGUARDAR E ABRIR NAVEGADOR
REM -----------------------------------------------------------
echo.
echo Aguardando servicos inicializarem...
timeout /t 10 >nul

echo Abrindo Economiza+ no navegador...
start http://localhost:5173/

echo.
echo ============================================
echo  SISTEMA INICIADO COM SUCESSO!
echo ============================================
echo.
echo Servicos ativos:
echo - Backend: http://localhost:5115 
echo - Frontend: http://localhost:5173
echo.
echo Para parar: Feche as janelas dos servicos
echo Para reiniciar: Clique novamente no atalho
echo.
pause