FROM oven/bun:latest

WORKDIR /app

COPY . .

# Install Turbo globally
RUN bun add -g turbo@latest

RUN bun install
RUN bun turbo run build
# RUN bun turbo run db:migrate:prod

WORKDIR /app/apps/backend

ENV NODE_ENV=production

# running the app
EXPOSE 3200
CMD ["bun", "run", "dist/src/index.js", "--port", "3200"]
