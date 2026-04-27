# Stage 1: Build the application
FROM node:18-alpine AS builder
WORKDIR /app

# Copy root package.json and lock files
COPY package.json package-lock.json* ./
COPY backend/package.json backend/

# Install dependencies for the monorepo workspace
RUN npm install

# Copy the rest of the backend source code
COPY backend/ backend/

# Build the backend application
RUN npm run build --workspace=backend

# Stage 2: Run the application
FROM node:18-alpine
WORKDIR /app

# Copy built assets and dependencies from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package.json ./backend/

# Expose the port the app runs on
EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production

# Start the application
CMD ["node", "backend/dist/server.js"]
