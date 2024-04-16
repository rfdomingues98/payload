import type { Block } from '../../../../packages/payload/src/exports/types'

import { Test1Block } from './test1'

export const SectionBlock: Block = {
  slug: 'section',
  fields: [
    {
      type: 'blocks',
      name: 'blocks',
      blocks: [Test1Block],
    },
  ],
}
