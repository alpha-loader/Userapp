# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Next.js application source code
COPY . .

# Build the Next.js application for production
RUN npm run build

# Production image, copy all the files and configurations we need
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# You only need to copy next.config.js if you have one
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js listens on
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]
