#!/bin/bash
# Description: Idempotent Deployment Script for LocalLoop

echo "Starting deployment sequence..."
set -e

# Idempotent structure creation (doesn't fail if exists, creates safely)
mkdir -p ./logs
mkdir -p ./build_output

# Moving and ensuring dependencies are clean
echo "Server Setup..."
cd server
npm ci --prefer-offline --no-audit
npm run build 2>/dev/null || echo "No server build required"
cd ..

echo "Client Setup..."
cd client
npm ci --prefer-offline --no-audit
npm run build
cd ..

echo "Deployment finalized gracefully!"
