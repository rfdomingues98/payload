import path from 'path'

import { postgresAdapter } from '../../packages/db-postgres/src'
import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import { devUser } from '../credentials'
import { Test } from './collections/Test'
import { MenuGlobal } from './globals/Menu'

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [
    // ...add more collections here
    Test,
  ],
  globals: [
    MenuGlobal,
    // ...add more globals here
  ],
  graphQL: {
    schemaOutputFile: './test/_community/schema.graphql',
  },

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: 'postgres://postgres:postgres@localhost:5432/payload_test',
    },
  }),

  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })
  },
})
