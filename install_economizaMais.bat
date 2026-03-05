@echo off
if "%1"=="" (
   cmd /k "%~f0" run
   exit
)

goto main


:main
title Instalador Economiza+
color 0A


echo =====================================================
echo              INSTALADOR ECONOMIZA+
echo =====================================================
echo.
echo Este instalador vai configurar seu ambiente local.
echo Certifique-se de que voce extraiu o projeto corretamente.
echo.
pause


echo.
echo -----------------------------------------------------
echo 1) VERIFICANDO NODE.JS
echo -----------------------------------------------------
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js NAO FOI ENCONTRADO!
    echo Baixe e instale pelo site oficial:
    echo https://nodejs.org/en/download
    echo.
    pause
    exit /b
) ELSE (
    echo ✔ Node.js encontrado!
)


echo.
echo -----------------------------------------------------
echo 2) VERIFICANDO NPM
echo -----------------------------------------------------
call npm --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ NPM nao encontrado!
    echo O NPM deve vir instalado junto com o Node.js.
    echo Reinstale o Node pelo site oficial:
    echo https://nodejs.org/en/download
    echo.
    pause
    exit /b
) ELSE (
    echo ✔ NPM encontrado!
)


echo.
echo -----------------------------------------------------
echo 3) VERIFICANDO MODELO DE IA
echo -----------------------------------------------------
ollama --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Baixando modelo Mistral...
    ollama pull mistral
) ELSE (
    echo ✔ Ollama encontrado!
)


echo.
echo -----------------------------------------------------
echo 4) AVISO SOBRE MYSQL
echo -----------------------------------------------------
echo ⚠️ Certifique-se de que o MySQL esteja instalado
echo e com o servico ATIVO antes de iniciar o sistema.
echo.
pause


echo.
echo -----------------------------------------------------
echo 5) INSTALANDO DEPENDENCIAS DO BACKEND
echo -----------------------------------------------------
if exist backend (
    cd backend
    call npm install
    cd ..
    echo ✔ Backend instalado com sucesso!
) ELSE (
    echo ❌ Pasta /backend NAO encontrada!
    echo Verifique se voce extraiu o projeto corretamente.
    pause
    exit /b
)


echo.
echo -----------------------------------------------------
echo 6) INSTALANDO DEPENDENCIAS DO FRONTEND
echo -----------------------------------------------------
if exist frontend (
    cd frontend
    call npm install
    cd ..
    echo ✔ Frontend instalado com sucesso!
) ELSE (
    echo ❌ Pasta /frontend NAO encontrada!
    echo Verifique se voce extraiu o projeto corretamente.
    pause
    exit /b
)


echo.
echo =====================================================
echo        INSTALACAO FINALIZADA COM SUCESSO!
echo =====================================================
echo.
echo Agora execute:
echo start_economizaMais.bat
echo.
pause
exit /b
