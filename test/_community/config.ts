import { postgresAdapter } from '../../packages/db-postgres/src'
import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import { devUser } from '../credentials'
import { MediaCollection } from './collections/Media'
import { Pages } from './collections/Pages'
import { PostsCollection, postsSlug } from './collections/Posts'
import { MenuGlobal } from './globals/Menu'

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [
    PostsCollection,
    MediaCollection,
    Pages,
    // ...add more collections here
  ],
  globals: [
    MenuGlobal,
    // ...add more globals here
  ],
  graphQL: {
    schemaOutputFile: './test/_community/schema.graphql',
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
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

    await payload.create({
      collection: postsSlug,
      data: {
        text: 'example post',
      },
    })
  },
})
