interface Props {
  accountName: string
}

function AccountCard({ accountName }: Props) {
  return accountName === 'No Accounts' ? (
    <h1>No Available Accounts</h1>
  ) : (
    <div>
      <h1>{accountName}</h1>
    </div>
  )
}

export default AccountCard
