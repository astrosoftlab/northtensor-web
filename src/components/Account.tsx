import Modal from "react-modal"

import { useEffect, useState } from "react"

import { Session, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

import ColdkeyModal from "@components/tailwindui/ColdkeyModal"
import ColdkeyInput from "@components/tailwindui/InputLabelled"

import { Database } from "../lib/utils/database.type"

type Profiles = Database["public"]["Tables"]["profiles"]["Row"]

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles["username"]>(null)
  const [website, setWebsite] = useState<Profiles["website"]>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null)
  const [ss58_coldkeys, setSS58Coldkeys] = useState<Profiles["ss58_coldkeys"]>(null)
  const [showModal, setShowModal] = useState(false)
  const [newColdkeyName, setNewColdkeyName] = useState("")
  const [newColdkeyValue, setNewColdkeyValue] = useState("")
  const [isAddColdkeyModalOpen, setIsAddColdkeyModalOpen] = useState(false)

  useEffect(() => {
    getProfile()
  }, [session])

  function handleColdkeyInputChange(index: number, newName: string, newColdkey: string, newWatched: boolean) {
    setSS58Coldkeys((prevColdkeys) => {
      if (prevColdkeys === null) return prevColdkeys
      if (prevColdkeys[index] === null) return prevColdkeys
      const coldkey = prevColdkeys[index]
      if (typeof coldkey !== "object") return prevColdkeys
      const updatedColdkey = {
        ...coldkey,
        name1: newName,
        coldkey: newColdkey,
        watched: newWatched,
      }
      const updatedColdkeys = [...prevColdkeys]
      updatedColdkeys[index] = updatedColdkey
      return updatedColdkeys
    })
  }

  function addNewColdkey(newName: string, newColdkey: string) {
    setSS58Coldkeys((prevColdkeys) => {
      if (prevColdkeys === null) {
        const updatedColdkeys = [
          {
            name1: newName,
            coldkey: newColdkey,
            watched: true,
            validated: false,
          },
        ]
        return updatedColdkeys
      } else {
        const updatedColdkeys = [
          ...prevColdkeys,
          {
            name1: newName,
            coldkey: newColdkey,
            watched: true,
            validated: false,
          },
        ]
        return updatedColdkeys
      }
    })
  }

  function handleRemoveColdkey(index: number) {
    setSS58Coldkeys((prevColdkeys) => {
      if (prevColdkeys === null) return prevColdkeys
      const updatedColdkeys = [...prevColdkeys]
      updatedColdkeys.splice(index, 1)
      return updatedColdkeys
    })
  }

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error("No user")

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, ss58_coldkeys`)
        .eq("id", user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setSS58Coldkeys(data.ss58_coldkeys)
      }
    } catch (error) {
      alert("Error loading user data!")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    ss58_coldkeys,
  }: {
    username: Profiles["username"]
    website: Profiles["website"]
    avatar_url: Profiles["avatar_url"]
    ss58_coldkeys: Profiles["ss58_coldkeys"]
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error("No user")

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        ss58_coldkeys,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from("profiles").upsert(updates)
      if (error) throw error
      alert("Profile updated!")
    } catch (error) {
      alert("Error updating the data!")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    // Handle form submission
  }

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <div>
          <div className="pb-12 border-b border-white/10">
            <h2 className="text-base font-semibold leading-9 text-slate-900">Profile</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-slate-900">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md bg-slate-100 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-slate-500">
                    <span className="flex items-center pl-3 select-none text-slate-500 sm:text-sm"></span>
                    <input
                      type="text"
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value)}
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-12 border-b border-white/10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-slate-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 bg-slate-100 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-slate-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 bg-slate-100 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    value={session.user.email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 bg-slate-100 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-slate-500 sm:text-sm sm:leading-6"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm isolate">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                Coldkeys
              </label>
              <button
                type="button"
                className="rounded-md bg-slate-500 px-1 py-1.5 text-sm font-semibold text-slate-100 shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                onClick={() => setIsAddColdkeyModalOpen(true)}
              >
                Add coldkey
              </button>
            </div>
            <ul>
              {ss58_coldkeys?.map((key, index) => {
                if (typeof key !== "object" || Array.isArray(key)) return null
                return (
                  <li id={key?.coldkey as string} key={key?.coldkey as string}>
                    <ColdkeyInput
                      onInputChange={handleColdkeyInputChange}
                      name={key?.name1}
                      coldkey={key?.coldkey}
                      watched={key?.watched}
                      validated={key?.validated}
                      index={index}
                      onDelete={() => handleRemoveColdkey(index)}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end mt-6 gap-x-6">
          <button
            type="button"
            className="px-3 py-2 text-sm font-semibold rounded-md shadow-sm bg-slate-500 text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            onClick={() => supabase.auth.signOut()}
          >
            Log Out
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-sm font-semibold rounded-md shadow-sm bg-slate-500 text-slate-100 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            onClick={() => updateProfile({ username, website, avatar_url, ss58_coldkeys })}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </form>
      <Modal
        isOpen={isAddColdkeyModalOpen}
        onRequestClose={() => setIsAddColdkeyModalOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "rgba(0, 0, 0, 0)",
          },
        }}
      >
        <ColdkeyModal
          name={`New Coldkey ${ss58_coldkeys ? ss58_coldkeys.length : 1}`}
          coldkey={""}
          onSave={addNewColdkey}
          onClose={() => setIsAddColdkeyModalOpen(false)}
          newBool={true}
        />
      </Modal>
    </>
  )
}
