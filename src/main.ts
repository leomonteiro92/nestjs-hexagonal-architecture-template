import { bootstrap } from './app'

async function startLocal() {
  const instance = await bootstrap()
  instance.listen(3000, '0.0.0.0')
}

startLocal()
