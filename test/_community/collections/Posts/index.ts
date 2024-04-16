import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { mediaSlug } from '../Media'
import { Test1Block } from '../blocks/test1'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'associatedMedia',
      access: {
        create: () => true,
        update: () => false,
      },
      relationTo: mediaSlug,
      type: 'upload',
    },
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [Test1Block],
    },
  ],
  slug: postsSlug,
}
