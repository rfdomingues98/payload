import type { Block } from '../../../packages/payload/src/exports/types'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      required: true,
      defaultValue: 'highImpact',
      options: [
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              label: 'Link Type',
              type: 'radio',
              options: [
                {
                  label: 'Internal link',
                  value: 'reference',
                },
                {
                  label: 'Custom URL',
                  value: 'custom',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
