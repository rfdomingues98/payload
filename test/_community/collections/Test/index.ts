import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

export const testsSlug = 'tests'

export const TestsCollection: CollectionConfig = {
  fields: [
    {
      name: 'text',
      type: 'text',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
  versions: true,
  slug: testsSlug,
}
