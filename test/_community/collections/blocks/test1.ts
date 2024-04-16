import type { Block } from '../../../../packages/payload/src/exports/types'

export const Test1Block: Block = {
  slug: 'test1',
  fields: [
    {
      type: 'group',
      name: 'parent',
      fields: [
        {
          type: 'checkbox',
          name: 'enableLink',
        },
        {
          type: 'group',
          name: 'child',
          fields: [
            {
              type: 'email',
              name: 'link',
            },
            {
              type: 'text',
              name: 'text',
            },
          ],
        },
      ],
    },
  ],
}
