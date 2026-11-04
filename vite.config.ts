import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  // Use the repository path for the published app.
  // Keep the root path for local development and browser tests.
  base: command === 'build' ? '/todo-typescript-exam/' : '/',
}));