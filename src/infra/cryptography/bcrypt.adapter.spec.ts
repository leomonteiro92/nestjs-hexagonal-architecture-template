import { BcryptAdapter } from './bcrypt.adapter'

describe('BcryptAdapter', () => {
  let adapter: BcryptAdapter

  beforeEach(() => {
    adapter = new BcryptAdapter(10)
  })

  describe('hash and compare', () => {
    it('should hashed string can be compared properly', async () => {
      const str = 'abcdefg'
      const hashed = await adapter.hash(str)
      expect(adapter.compare(str, hashed)).resolves.toEqual(true)
    })

    it('should not be compared to wrong hashed string', async () => {
      const str = 'abcdefg'
      const hashed = await adapter.hash(str)
      expect(adapter.compare('wrong', hashed)).resolves.toEqual(false)
    })
  })
})
