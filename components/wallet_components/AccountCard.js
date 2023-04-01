import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Identicon from "@polkadot/react-identicon";



function AccountCard({ account }) {
  return (
    (!account ? (<h1>No Active Account</h1>) : (<><Identicon
      size={32}
      theme="polkadot"
      value={account.address}
      onCopy={() => {
        CopyToClipboard(account.address);
      } } /><h1>{account.text}</h1></>))
  );
}

export default AccountCard;