import { defineConfig } from "kysely-ctl";
import { dialect } from './src/database'

export default defineConfig({
  dialect,
  migrations: {
    migrationFolder: './src/database/migrations'
  }
})