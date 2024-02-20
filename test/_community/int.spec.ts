import payload from '../../packages/payload/src'
import { devUser } from '../credentials'
import { initPayloadTest } from '../helpers/configHelpers'

require('isomorphic-fetch')

let apiUrl
let jwt

const headers = {
  'Content-Type': 'application/json',
}
const { email, password } = devUser
describe('_Community Tests', () => {
  // --__--__--__--__--__--__--__--__--__
  // Boilerplate test setup/teardown
  // --__--__--__--__--__--__--__--__--__
  beforeAll(async () => {
    const { serverURL } = await initPayloadTest({ __dirname, init: { local: false } })
    apiUrl = `${serverURL}/api`

    const response = await fetch(`${apiUrl}/users/login`, {
      body: JSON.stringify({
        email,
        password,
      }),
      headers,
      method: 'post',
    })

    const data = await response.json()
    jwt = data.token
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy(payload)
    }
  })

  // --__--__--__--__--__--__--__--__--__
  // You can run tests against the local API or the REST API
  // use the tests below as a guide
  // --__--__--__--__--__--__--__--__--__

  /* it('local API example', async () => {
    const newPost = await payload.create({
      collection: postsSlug,
      data: {
        text: 'LOCAL API EXAMPLE',
      },
    })

    expect(newPost.text).toEqual('LOCAL API EXAMPLE')
  })

  it('rest API example', async () => {
    const newPost = await fetch(`${apiUrl}/${postsSlug}`, {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `JWT ${jwt}`,
      },
      body: JSON.stringify({
        text: 'REST API EXAMPLE',
      }),
    }).then((res) => res.json())

    expect(newPost.doc.text).toEqual('REST API EXAMPLE')
  }) */

  it('test adding new entry', async () => {
    const testData = {
      block: [
        {
          type: 'highImpact',
          blockType: 'hero',
          link: {
            type: 'reference',
          },
        },
      ],
    }

    const newEntry = await payload.create({
      collection: 'test',
      data: testData,
    })

    expect(newEntry).toBeDefined()
    expect(newEntry.block[0].type).toEqual('highImpact')
    expect(newEntry.block[0].link.type).toEqual('reference')
  })
})
