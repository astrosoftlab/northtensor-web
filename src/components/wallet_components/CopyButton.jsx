import { useState } from "react"

import { Button, Snackbar } from "@mui/material"

const CopyToClipboardButton = ({ copyText, displayText = null }) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(copyText)
  }

  return (
    <>
      <Button onClick={handleClick}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {displayText !== null ? displayText : copyText}{" "}
          {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15V5h13" />
            </svg>
          }
        </div>
      </Button>
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={2000} message="Copied to clipboard" />
    </>
  )
}

export default CopyToClipboardButton
