import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";

// import HeaderPathing from './HeaderPathing'

function AccountCard({ account }) {
  
  // console.log("card acccount", account.meta.name)
  // console.log('curracc', account.address.substring(0, 6))
  return (
    (!account ? 
      (
        <h1>
          No Active Account
        </h1>
      ) : 
      (
      <Stack direction="row">
        {/* <Identicon
          size={32}
          theme="polkadot"
          value={account.address}
          onCopy={() => {
            CopyToClipboard(account.address);
            } 
          } 
        /> */}
        <Stack direction="column">
          <h1>{account.meta.name}</h1>
          <p>{account.address.substring(0, 10)}...</p>
        </Stack>
      </Stack>))
  );
}

export default AccountCard;