import React, { useEffect } from "react"

// import StakeForm from "./StakeForm"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { useSubstrate } from "../../lib/substrate-lib"
import { DelegateColumn, DelegateExtra, DelegateInfo, DelegateInfoRow } from "../../lib/utils/types"
import { Accordion, AccordionDetails, AccordionSummary } from "./Accordion"
import DelegateCard from "./DelegateCard"

// import { Theme, Typography, makeStyles } from "@material-ui/core"
// import '../assets/styles/DelegateRow.css'

interface Props {
  delegate: DelegateInfo
  columns: DelegateColumn[]
  unit?: string
  coldkey_ss58: string
  expanded: string | false
  onChange?: () => void
  refreshMeta: () => void
  delegateExtra: DelegateExtra | undefined
}

// const useStyles = makeStyles((theme: Theme) => ({
//     stake_display: {
//         fontWeight: "bold",
//         color: theme.palette.text.primary
//     }
//   }))

export default function DelegateRow({
  columns,
  unit,
  delegate,
  expanded,
  onChange,
  refreshMeta,
  coldkey_ss58,
  delegateExtra,
}: Props) {
  const [delegate_row, setDelegateRow] = React.useState<DelegateInfoRow>({} as DelegateInfoRow)

  const {
    setCurrentAccount,
    state: { keyring, currentAccount, balanceSigFigures },
  } = useSubstrate()

  useEffect(() => {
    let _row: DelegateInfoRow = {
      stake: 0,
      take: delegate.take,
      owner_ss58: delegate.owner_ss58,
      delegate_ss58: delegate.delegate_ss58,
      total_stake: delegate.total_stake,
      nominators: delegate.nominators.length,
      personal_stake: delegate.personal_stake,
    }
    delegate.nominators.filter(([nom, staked]: [string, number]) => {
      if (nom === coldkey_ss58) {
        _row = {
          ..._row,
          stake: staked,
        }
      }
    })

    setDelegateRow({
      ...delegate_row,
      ..._row,
    })
  }, [delegate, coldkey_ss58])

  return (
    <React.Fragment>
      {!!Object.keys(delegate_row).length && (
        <Accordion expanded={expanded === delegate_row.delegate_ss58} onChange={onChange} id="delegates">
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
              {columns.map((column) => {
                if (!["delegate_ss58"].includes(column.id)) {
                  return null
                }
                const value: string | number = delegate_row[column.id]
                return (
                  <React.Fragment key={column.id}>
                    {column.id === "delegate_ss58" && (
                      <DelegateCard accountName={delegateExtra?.name || ""} accountAddress={value.toString()} />
                      // <AccountCard account={{ address: value.toString(), name: delegateExtra?.name || ""  }}  />
                      // <AccountCard account={keyring.getPair(value.toString())}  />
                      // <h1>{value.toString()} - {delegateExtra?.name || ""}</h1>
                    )}
                  </React.Fragment>
                )
              })}
              <Stack direction="column" className="delegatestats-headings">
                {columns.map((column) => {
                  if (!["total_stake"].includes(column.id)) {
                    return null
                  }
                  const value: string | number = delegate_row[column.id]
                  const formattedValue =
                    typeof value === "number" ? parseFloat(value.toFixed(balanceSigFigures)) : value
                  return (
                    <React.Fragment key={column.id}>
                      <Stack direction="row" alignItems="center">
                        <Typography>Total Stake: </Typography>
                        <h1>{formattedValue}</h1>
                      </Stack>
                    </React.Fragment>
                  )
                })}
                {columns.map((column) => {
                  if (!["stake"].includes(column.id)) {
                    return null
                  }
                  const value: string | number = delegate_row[column.id]
                  const parsedValue = parseInt(value.toString()) / 10 ** 9
                  const formattedparsedValue =
                    typeof parsedValue === "number" ? parseFloat(parsedValue.toFixed(balanceSigFigures)) : parsedValue
                  return (
                    <React.Fragment key={column.id}>
                      <Stack direction="row" alignItems="center">
                        <Typography>Your Stake: </Typography>
                        <h1>{formattedparsedValue}</h1>
                      </Stack>
                    </React.Fragment>
                  )
                })}
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
              {columns.map((column) => {
                if (!["owner_ss58"].includes(column.id)) {
                  return null
                }
                const value: string | number = delegate_row[column.id]
                return (
                  <React.Fragment key={column.id}>
                    {column.id === "owner_ss58" && (
                      <Box flex={3}>
                        <DelegateCard accountName={"Delegate Coldkey"} accountAddress={value.toString()} />
                        {/* <h1>{value.toString()} - {"Delegate Coldkey"}</h1> */}
                        {/* <AccountCard account={keyring.getPair(value.toString())}  /> */}
                        {/* <AccountCard account={{ address: value.toString(), name: "Delegate Coldkey" }} /> */}
                      </Box>
                    )}
                  </React.Fragment>
                )
              })}
              <Stack direction="column" justifyContent="space-between" alignItems="center" width="100%" flex={2}>
                {columns.map((column) => {
                  if (!["stake", "nominators"].includes(column.id)) {
                    return null
                  }
                  const value: string | number = delegate_row[column.id]
                  return (
                    <React.Fragment key={column.id}>
                      {["nominators"].includes(column.id) && typeof value === "number" && (
                        <React.Fragment>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                            <Typography
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              Nominators:{" "}
                            </Typography>
                            <Typography>{value.toString()}</Typography>
                          </Stack>
                        </React.Fragment>
                      )}
                      {["stake"].includes(column.id) && typeof value === "number" && (
                        <React.Fragment>
                          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                            <Typography
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              Your Stake:{" "}
                            </Typography>
                            <h1>{parseInt(value.toString()) / 10 ** 9}</h1>
                          </Stack>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )
                })}
              </Stack>
            </Stack>
            <Box justifyContent="flex-end" flexDirection="row" alignItems="center">
              {/* <ErrorBoundary> */}
              {/* <StakeForm hotkeyAddr={delegate_row.delegate_ss58} stake={delegate_row.stake} refreshMeta={refreshMeta} /> */}
              {/* </ErrorBoundary> */}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </React.Fragment>
  )
}
