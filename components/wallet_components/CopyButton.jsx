import { Button, Snackbar } from '@mui/material'
import React, { useState, useEffect } from 'react'

const CopyToClipboardButton = ({copyText}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(copyText)
    }
    
    return (
        <>
          <Button onClick={handleClick}>{copyText}</Button>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboardButton