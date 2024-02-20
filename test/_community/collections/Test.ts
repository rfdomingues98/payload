import type { CollectionConfig } from '../../../packages/payload/src/collections/config/types'

import { Hero } from '../blocks/Hero'
export const Test: CollectionConfig = {
  slug: 'test',
  fields: [
    {
      name: 'block',
      type: 'blocks',
      blocks: [Hero],
    },
  ],
}
