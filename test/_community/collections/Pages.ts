import type { CollectionConfig } from '../../../packages/payload/src/exports/types'

import { SectionBlock } from './blocks/section1'
import { Test1Block } from './blocks/test1'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [SectionBlock, Test1Block],
    },
  ],
}
