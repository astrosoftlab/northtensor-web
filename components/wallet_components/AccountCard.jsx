import React from 'react'

import Stack from "@mui/material/Stack"


// import HeaderPathing from './HeaderPathing'

function AccountCard({ accountName }) {
  
  // console.log("card acccount", account.meta.name)
  // console.log('curracc', account.address.substring(0, 6))
  return (
    (accountName === 'No Accounts' ? 
      (
        <h1>
          No Available Accounts
        </h1>
      ) : 
      (
      <div>
      <h1>{accountName}</h1>
      {/* <p>{account.address.substring(0, 10)}...</p> */}
      </div>
      ))
  );
}

export default AccountCard;