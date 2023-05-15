import React from 'react'
import AccountSelector from './AccountSelector'


import { useSubstrateState } from '../../lib/substrate-lib'

function Main(props) {

  return (
      <AccountSelector />
  )
}


export default function WalletHeader(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
