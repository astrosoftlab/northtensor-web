import { useSubstrateState } from "@lib/substrate-lib"

import AccountSelector from "./AccountSelector"

function Main() {
  return <AccountSelector />
}

export default function WalletHeader() {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main /> : null
}
