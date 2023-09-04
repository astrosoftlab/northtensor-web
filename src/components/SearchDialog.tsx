'use client'

import * as React from 'react'

// import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/Dialog'
import { Input } from '@components/ui/Input'

import { CornerDownLeft, Frown, Loader, Search, User, Wand, X } from 'lucide-react'
import type { CreateCompletionResponse } from 'openai'
import { SSE } from 'sse.js'

function promptDataReducer(
  state: any[],
  action: {
    index?: number
    answer?: string | undefined
    status?: string
    query?: string | undefined
    type?: 'remove-last-item' | string
  },
) {
  // set a standard state to use later
  let current = [...state]

  if (action.type) {
    switch (action.type) {
      case 'remove-last-item':
        current.pop()
        return [...current]
      default:
        break
    }
  }

  // check that an index is present
  if (action.index === undefined) return [...state]

  if (!current[action.index]) {
    current[action.index] = { query: '', answer: '', status: '' }
  }

  current[action.index].answer = action.answer

  if (action.query) {
    current[action.index].query = action.query
  }
  if (action.status) {
    current[action.index].status = action.status
  }

  return [...current]
}

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState<string>('')
  const [question, setQuestion] = React.useState<string>('')
  const [answer, setAnswer] = React.useState<string | undefined>('')
  const eventSourceRef = React.useRef<SSE>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [promptIndex, setPromptIndex] = React.useState(0)
  const [promptData, dispatchPromptData] = React.useReducer(promptDataReducer, [])

  const cantHelp = answer?.trim() === "Sorry, I don't know how to help with that."

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen(true)
      }

      if (e.key === 'Escape') {
        console.log('esc')
        handleModalToggle()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  function handleModalToggle() {
    setOpen(!open)
    setSearch('')
    setQuestion('')
    setAnswer(undefined)
    setPromptIndex(0)
    dispatchPromptData({ type: 'remove-last-item' })
    setHasError(false)
    setIsLoading(false)
  }

  const handleConfirm = React.useCallback(
    async (query: string) => {
      setAnswer(undefined)
      setQuestion(query)
      setSearch('')
      dispatchPromptData({ index: promptIndex, answer: undefined, query })
      setHasError(false)
      setIsLoading(true)

      const eventSource = new SSE(`api/vector-search`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        payload: JSON.stringify({ query }),
      })

      function handleError<T>(err: T) {
        setIsLoading(false)
        setHasError(true)
        console.error(err)
      }

      eventSource.addEventListener('error', handleError)
      eventSource.addEventListener('message', (e: any) => {
        try {
          setIsLoading(false)

          if (e.data === '[DONE]') {
            setPromptIndex((x) => {
              return x + 1
            })
            return
          }

          const completionResponse: CreateCompletionResponse = JSON.parse(e.data)
          const text = completionResponse.choices[0].text

          setAnswer((answer) => {
            const currentAnswer = answer ?? ''

            dispatchPromptData({
              index: promptIndex,
              answer: currentAnswer + text,
            })

            return (answer ?? '') + text
          })
        } catch (err) {
          handleError(err)
        }
      })

      eventSource.stream()

      eventSourceRef.current = eventSource

      setIsLoading(true)
    },
    [promptIndex, promptData],
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(search)

    handleConfirm(search)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-base flex gap-2 items-center px-4 py-2 z-50 relative
        text-slate-500 hover:text-slate-700 transition-colors rounded-md
        border border-slate-200  hover:border-slate-300 
        min-w-[300px]"
      >
        <Search width={15} />
        <span className="h-5 border border-l"></span>
        <span className="inline-block ml-4">Ask About our Docs</span>
      </button>
      <Dialog open={open}>
        <DialogContent className="sm:max-w-[850px] text-black">
          <DialogHeader>
            <DialogTitle>AI Resource Search</DialogTitle>
            <DialogDescription>I may make things up.</DialogDescription>
            <hr />
            <button className="absolute top-0 p-2 right-2" onClick={() => setOpen(false)}>
              <X className="w-4 h-4 " />
            </button>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 text-slate-700">
              {question && (
                <div className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 p-2 text-center rounded-full bg-slate-100 ">
                    <User width={18} />{' '}
                  </span>
                  <p className="mt-0.5 font-semibold text-slate-700 ">{question}</p>
                </div>
              )}

              {isLoading && (
                <div className="relative flex w-5 h-5 ml-2 animate-spin">
                  <Loader />
                </div>
              )}

              {hasError && (
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 p-2 text-center bg-red-100 rounded-full">
                    <Frown width={18} />
                  </span>
                  <span className="text-slate-700 ">Failure. Please check your connection.</span>
                </div>
              )}

              {answer && !hasError ? (
                <div className="flex items-center gap-4 ">
                  <span className="flex items-center justify-center w-8 h-8 p-2 text-center rounded-full bg-slate-500">
                    <Wand width={18} className="text-white" />
                  </span>
                  <h3 className="font-semibold">Response:</h3>
                  <div dangerouslySetInnerHTML={{ __html: answer }} />
                </div>
              ) : null}

              <div className="relative">
                <Input
                  placeholder="Ask a question..."
                  name="search"
                  value={search}
                  onChange={(v) => setSearch(v)}
                  className="col-span-3"
                />
                <CornerDownLeft
                  className={`absolute top-3 right-5 h-4 w-4 text-slate-300 transition-opacity ${
                    search ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
              <div className="text-xs text-slate-500 ">
                Or try:{' '}
                <button
                  type="button"
                  className="px-1.5 py-0.5
                  bg-slate-50 
                  hover:bg-slate-100 
                  rounded border border-slate-200 
                  transition-colors"
                  onClick={(_) => setSearch('What is Bittensor?')}
                >
                  What is Bittensor?
                </button>
                <button
                  type="button"
                  className="px-1.5 py-0.5
                  bg-slate-50 
                  hover:bg-slate-100 
                  rounded border border-slate-200 
                  transition-colors"
                  onClick={(_) => setSearch('How do I stake?')}
                >
                  How do I stake?
                </button>
              </div>
            </div>
            <DialogFooter>
              <button
                type="submit"
                className="px-4 py-2 font-bold rounded bg-slate-500 hover:bg-slate-700 text-slate-100"
              >
                Submit
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
