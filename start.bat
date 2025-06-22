@echo off
setlocal enabledelayedexpansion

REM Laptop Store Startup Script for Windows
REM This script starts both the backend (FastAPI) and frontend (React) servers

title Laptop Store - Starting Application

REM Create logs directory
if not exist "logs" mkdir logs

REM Log files
set BACKEND_LOG=logs\backend.log
set FRONTEND_LOG=logs\frontend.log
set SETUP_LOG=logs\setup.log

REM Function to print timestamped messages
set "timestamp="
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set "timestamp=%%I"
set "current_time=%timestamp:~8,2%:%timestamp:~10,2%:%timestamp:~12,2%"

echo [%current_time%] 🚀 Starting Laptop Store Application...
echo %date% %time%: Starting application setup > "%SETUP_LOG%"

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH. Please install Python 3.8+ and try again.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH. Please install Node.js 16+ and try again.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed or not in PATH. Please install npm and try again.
    pause
    exit /b 1
)

echo [%current_time%] ✓ Prerequisites checked

REM Backend Setup
echo [%current_time%] 🐍 Setting up backend...

cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo [%current_time%] Creating Python virtual environment...
    python -m venv venv >> "..\%SETUP_LOG%" 2>&1
    if errorlevel 1 (
        echo [ERROR] Failed to create virtual environment. Check %SETUP_LOG% for details.
        cd ..
        pause
        exit /b 1
    )
    echo [%current_time%] ✓ Virtual environment created
) else (
    echo [%current_time%] Virtual environment already exists
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Upgrade pip and install dependencies
echo [%current_time%] Installing/updating backend dependencies...
python -m pip install --upgrade pip >> "..\%SETUP_LOG%" 2>&1
pip install -r requirements.txt >> "..\%SETUP_LOG%" 2>&1
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies. Check %SETUP_LOG% for details.
    cd ..
    pause
    exit /b 1
)
echo [%current_time%] ✓ Backend dependencies installed

REM Start backend server
echo [%current_time%] Starting backend server on http://localhost:8000...
start "Laptop Store Backend" /min cmd /c "python main.py > "..\%BACKEND_LOG%" 2>&1"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

echo [%current_time%] ✓ Backend server started

cd ..

REM Frontend Setup
echo [%current_time%] ⚛️  Setting up frontend...

cd frontend

REM Install frontend dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo [%current_time%] Installing frontend dependencies...
    npm install >> "..\%SETUP_LOG%" 2>&1
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies. Check %SETUP_LOG% for details.
        cd ..
        pause
        exit /b 1
    )
    echo [%current_time%] ✓ Frontend dependencies installed
) else (
    echo [%current_time%] Frontend dependencies already exist
)

REM Start frontend server
echo [%current_time%] Starting frontend server on http://localhost:3000...
start "Laptop Store Frontend" /min cmd /c "npm start > "..\%FRONTEND_LOG%" 2>&1"

REM Wait a moment for frontend to start
timeout /t 5 /nobreak >nul

echo [%current_time%] ✓ Frontend server started

cd ..

echo.
echo [%current_time%] 🎉 Application started successfully!
echo.
echo 📍 Application URLs:
echo    • Frontend: http://localhost:3000
echo    • Backend API: http://localhost:8000
echo    • API Documentation: http://localhost:8000/docs
echo.
echo 📝 Log files:
echo    • Setup: %SETUP_LOG%
echo    • Backend: %BACKEND_LOG%
echo    • Frontend: %FRONTEND_LOG%
echo.
echo 🌐 Opening application in browser in 5 seconds...
timeout /t 5 /nobreak >nul

REM Open the application in the default browser
start http://localhost:3000

echo.
echo ⚠️  Both servers are now running in separate windows.
echo    Close those windows or press Ctrl+C in them to stop the servers.
echo.
echo Press any key to exit this script (servers will continue running)...
pause >nul

REM Note: The backend and frontend processes will continue running
REM in their own command windows even after this script exits
