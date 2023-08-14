import React, { useState } from "react"

import Stack from "@mui/material/Stack"

import { useSubstrateState } from "../../lib/substrate-lib"
import { TxButton } from "../../lib/substrate-lib/components"
import CopyToClipboardButton from "./CopyButton"

export default function Main(props) {
  const [status, setStatus] = useState(null)
  const [sendAmount, setSendAmount] = useState(0)

  const onAmountChange = (event) => {
    setSendAmount(event.target.value)
  }

  const { keyring, storedMNRVColdkey } = useSubstrateState()
  const MNRVTipWallet = storedMNRVColdkey
  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map((account) => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

  return (
    <>
      <h1 className=" text-slate-800 text-3xl sm:text-3xl font-thin">Tip NorthTensor</h1>
      <br />
      <form className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="standard-number" className="block text-slate-700 ">
            Tip Amount in Tao
          </label>
          <input
            id="standard-number"
            type="number"
            value={sendAmount}
            onChange={onAmountChange}
            className="block w-full px-4 py-2 leading-tight bg-white border border-slate-300 rounded appearance-none focus:outline-none focus:bg-white focus:border-slate-500"
          />
        </div>
      </form>
      <Stack sx={{ m: 2 }} spacing={2} direction="column">
        <TxButton
          label="Tip"
          type="SIGNED-TX"
          setStatus={setStatus}
          attrs={{
            palletRpc: "balances",
            callable: "transfer",
            inputParams: [MNRVTipWallet, sendAmount * 10 ** 9],
            paramFields: [true, true],
          }}
        />
        <CopyToClipboardButton copyText={`btcli transfer --dest ${MNRVTipWallet} --amount ${sendAmount}`} />
      </Stack>
    </>
  )
}
