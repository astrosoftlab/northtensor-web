// This component will simply add utility functions to your developer console.
import { ApiPromise } from '@polkadot/api'
import { Keyring } from '@polkadot/keyring'
import * as util from '@polkadot/util'
import * as utilCrypto from '@polkadot/util-crypto'

import { useSubstrateState } from '..'

interface SubstrateState {
  api: ApiPromise
  apiState: string
  keyring: Keyring
  keyringState: string
}

declare global {
  interface Window {
    api: any
    keyring: any
    util: any
    utilCrypto: any
  }
}

export default function DeveloperConsole(): null {
  const { api, apiState, keyring, keyringState }: SubstrateState = useSubstrateState()
  if (apiState === 'READY') {
    window.api = api
  }
  if (keyringState === 'READY') {
    window.keyring = keyring
  }

  window.util = util
  window.utilCrypto = utilCrypto

  return null
}
