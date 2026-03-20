@echo off
cd /d "%~dp0"

echo Iniciando servidor do Portfolio...
echo.

REM Tenta usar Python primeiro
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Portfolio disponivel em: http://localhost:8000
    echo Abrindo no Chrome...
    timeout /t 1 >nul
    start chrome http://localhost:8000
    python -m http.server 8000
) else (
    REM Se Python nao estiver disponivel, tenta Node.js
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Portfolio disponivel em: http://localhost:8000
        echo Abrindo no Chrome...
        timeout /t 1 >nul
        start chrome http://localhost:8000
        npx http-server -p 8000
    ) else (
        echo.
        echo ERRO: Nenhum servidor encontrado!
        echo Instale Python ou Node.js para usar este script.
        echo.
        pause
    )
)
