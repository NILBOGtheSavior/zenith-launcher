FROM node:22-bookworm-slim
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY backend/package.json ./backend/package.json

RUN pnpm install --frozen-lockfile --filter backend...

COPY backend ./backend

EXPOSE 3000
CMD ["node", "backend/src/index.js"]
