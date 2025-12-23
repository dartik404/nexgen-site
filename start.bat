@echo off
chcp 65001 >nul
title Nexgen Site Launcher

echo ===============================================
echo    NEXGEN SITE LAUNCHER
echo ===============================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не установлен!
    echo.
    echo Пожалуйста, скачайте и установите Node.js:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ВНИМАНИЕ] PNPM не установлен!
    echo Устанавливаю PNPM...
    npm install -g pnpm
    if %errorlevel% neq 0 (
        echo [ОШИБКА] Не удалось установить PNPM
        pause
        exit /b 1
    )
)

if not exist "node_modules" (
    echo [УСТАНОВКА] Устанавливаю зависимости...
    pnpm install
    if %errorlevel% neq 0 (
        echo [ОШИБКА] Не удалось установить зависимости
        pause
        exit /b 1
    )
)

echo.
echo [ЗАПУСК] Запускаю сервер разработки...
echo.
echo Сайт будет доступен по адресу: http://localhost:5173
echo Для остановки нажмите Ctrl+C
echo.

pnpm run dev
