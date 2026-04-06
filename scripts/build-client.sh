echo "Starting client build..."
set -e

cd ../client || exit
npm install
npm run build

echo "Client build completed!"