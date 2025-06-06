FROM oven/bun:latest

WORKDIR /app

COPY . .

# Install Turbo globally
RUN bun add -g turbo@latest

WORKDIR /app/apps/web

ARG NODE_ENV=production
RUN bun install
RUN bun run build

ENV NODE_ENV=production
# running the app
EXPOSE 3000
CMD ["bun", "run", "start"]