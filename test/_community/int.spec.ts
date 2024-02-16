import payload from '../../packages/payload/src'
import { devUser } from '../credentials'
import { initPayloadTest } from '../helpers/configHelpers'
import { postsSlug } from './collections/Posts'
import { testsSlug } from './collections/Test'

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

  it('local API example', async () => {
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
  })

  it('add localized text entry to versioned collection', async () => {
    const newEntry = await fetch(`${apiUrl}/${testsSlug}`, {
      method: 'POST',
      headers: { ...headers, Authorization: `JWT ${jwt}` },
      body: JSON.stringify({
        text: 'Localized text entry',
      }),
    }).then((res) => res.json())

    expect(newEntry.doc.text).toEqual('Localized text entry')
  })

  it('add localized array entry to versioned collection', async () => {
    const newEntry = await fetch(`${apiUrl}/${testsSlug}`, {
      method: 'POST',
      headers: { ...headers, Authorization: `JWT ${jwt}` },
      body: JSON.stringify({
        items: [
          {
            text: 'Localized array entry',
          },
        ],
      }),
    }).then((res) => res.json())

    expect(newEntry.doc).toBeDefined()
    expect(newEntry.doc).toHaveProperty('items')
    expect(newEntry.doc.items).toHaveLength(1)
    expect(newEntry.doc.items[0].text).toEqual('Localized array entry')
  })
})
