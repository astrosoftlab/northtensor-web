import { createContext } from 'react'

import {
  AdminCtx,
  ApiCtx,
  BalanceVisibilityCtx,
  CreateAccountCtx,
  EvtMgrCtx,
  EvtTxCtx,
  LocalStorageAccountCtx
} from './types'

const BalanceVisibleContext = createContext<BalanceVisibilityCtx>({
  balanceVisibility: true,
  setBalanceVisibility: () => console.log()
})
const AccountContext = createContext<CreateAccountCtx>({
  account: {} as LocalStorageAccountCtx,
  setCurrentAccount: (t: LocalStorageAccountCtx) => console.log(t)
})
const AdminContext = createContext<AdminCtx>({} as AdminCtx)
const ApiContext = createContext<ApiCtx>({} as ApiCtx)
const EvtMgrContext = createContext<EvtMgrCtx>([])
const EvtTxContext = createContext<EvtTxCtx>([])

export { AccountContext, AdminContext, ApiContext, BalanceVisibleContext, EvtMgrContext, EvtTxContext }
