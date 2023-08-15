import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";
import { Button, Snackbar } from '@mui/material'

// import HeaderPathing from './HeaderPathing'

function AccountIdenticon({ account }) {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(account.address)
  }
  
  // console.log("card acccount", account.meta.name)
  // console.log('curracc', account.address.substring(0, 6))
  return (
    (!account ? 
      (
        <></>
      ) : 
      (
        <Box component="span" className="px-4">
        <Identicon
            size={40}
            theme="polkadot"
            value={account.address}
            onCopy={() => {
            handleClick()
            } 
            } 
        />
        <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied Account Address to clipboard"
          />
        </Box>
      ))
  );
}

export default AccountIdenticon;