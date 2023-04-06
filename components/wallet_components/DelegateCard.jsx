import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";
import { Button, Snackbar } from '@mui/material'

// import HeaderPathing from './HeaderPathing'

function DelegateCard({ accountName, accountAddress }) {
  
    const CopyToClipboardButton = () => {
        const [open, setOpen] = useState(false)
        const handleClick = () => {
          setOpen(true)
          navigator.clipboard.writeText(accountAddress)
        }
        
        return (
            <>
              <Button onClick={handleClick}>Delegate Hotkey</Button>
              <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
              />
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

export default DelegateCard;