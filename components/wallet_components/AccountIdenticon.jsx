import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";

// import HeaderPathing from './HeaderPathing'

function AccountIdenticon({ account }) {
  
  // console.log("card acccount", account.meta.name)
  // console.log('curracc', account.address.substring(0, 6))
  return (
    (!account ? 
      (
        <></>
      ) : 
      (
        <Box component="span" >
        <Identicon
            size={40}
            theme="polkadot"
            value={account.address}
            onCopy={() => {
            CopyToClipboard(account.address);
            } 
            } 
        />
        </Box>
      ))
  );
}

export default AccountIdenticon;