#!/bin/bash

# Laptop Store Startup Script
# This script starts both the backend (FastAPI) and frontend (React) servers

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create logs directory
LOGS_DIR="logs"
mkdir -p "$LOGS_DIR"

# Log files
BACKEND_LOG="$LOGS_DIR/backend.log"
FRONTEND_LOG="$LOGS_DIR/frontend.log"
SETUP_LOG="$LOGS_DIR/setup.log"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')]${NC} $1"
}

print_error() {
    echo -e "${RED}[$(date '+%H:%M:%S')]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')]${NC} $1"
}

# Function to cleanup background processes
cleanup() {
    print_status "Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
        print_status "Backend server stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
        print_status "Frontend server stopped"
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

print_status "🚀 Starting Laptop Store Application..."
echo "$(date): Starting application setup" > "$SETUP_LOG"

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    print_error "Python3 is not installed. Please install Python 3.8+ and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm and try again."
    exit 1
fi

print_success "✓ Prerequisites checked"

# Backend Setup
print_status "🐍 Setting up backend..."

cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    print_status "Creating Python virtual environment..."
    python3 -m venv venv >> "../$SETUP_LOG" 2>&1
    print_success "✓ Virtual environment created"
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip and install dependencies
print_status "Installing/updating backend dependencies..."
pip install --upgrade pip >> "../$SETUP_LOG" 2>&1
pip install -r requirements.txt >> "../$SETUP_LOG" 2>&1
print_success "✓ Backend dependencies installed"

# Start backend server
print_status "Starting backend server on http://localhost:8000..."
python main.py > "../$BACKEND_LOG" 2>&1 &
BACKEND_PID=$!

# Check if backend started successfully
sleep 3
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    print_error "❌ Backend failed to start. Check $BACKEND_LOG for details."
    exit 1
fi

print_success "✓ Backend server started (PID: $BACKEND_PID)"

cd ..

# Frontend Setup
print_status "⚛️  Setting up frontend..."

cd frontend

# Install frontend dependencies if node_modules doesn't exist or package.json is newer
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    print_status "Installing/updating frontend dependencies..."
    npm install >> "../$SETUP_LOG" 2>&1
    print_success "✓ Frontend dependencies installed"
else
    print_status "Frontend dependencies are up to date"
fi

# Start frontend server
print_status "Starting frontend server on http://localhost:3000..."
npm start > "../$FRONTEND_LOG" 2>&1 &
FRONTEND_PID=$!

# Check if frontend started successfully
sleep 5
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    print_error "❌ Frontend failed to start. Check $FRONTEND_LOG for details."
    cleanup
    exit 1
fi

print_success "✓ Frontend server started (PID: $FRONTEND_PID)"

cd ..

print_success "🎉 Application started successfully!"
echo ""
print_status "📍 Application URLs:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend API: http://localhost:8000"
echo "   • API Documentation: http://localhost:8000/docs"
echo ""
print_status "📝 Log files:"
echo "   • Setup: $SETUP_LOG"
echo "   • Backend: $BACKEND_LOG"
echo "   • Frontend: $FRONTEND_LOG"
echo ""
print_warning "Press Ctrl+C to stop both servers"

# Wait for user interrupt
wait
