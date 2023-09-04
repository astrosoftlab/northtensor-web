import { useState } from 'react'

import { Button, Snackbar } from '@mui/material'
import Stack from '@mui/material/Stack'

interface Props {
  accountName: string
  accountAddress: string
}

function DelegateCard({ accountName, accountAddress }: Props) {
  const CopyToClipboardButton = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(accountAddress)
    }

    return (
      <>
        <Button onClick={handleClick}>Copy Address</Button>
        <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={2000} message="Copied to clipboard" />
      </>
    )
  }
  // console.log("card acccount", account.meta.name)
  // console.log('curracc', account.address.substring(0, 6))
  return (
    <Stack direction="row">
      <Stack direction="column">
        <h1>{accountName}</h1>
        {/* <p>{accountAddress.substring(0, 10)}...</p> */}
        <CopyToClipboardButton />
      </Stack>
    </Stack>
  )
}

export default DelegateCard
