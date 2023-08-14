import Modal from "react-modal"

import { useEffect, useState } from "react"

import { Session, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

import ColdkeyModal from "@components/tailwindui/ColdkeyModal"
import ColdkeyInput from "@components/tailwindui/InputLabelled"

import { Database } from "../lib/utils/database.type"
import { Button } from "./ui/Buttons"
import { InputGroup, TextInput } from "./ui/Inputs"

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
          <h2 className="mb-6 text-3xl font-semibold leading-9 sm:text-4xl text-slate-900">Profile</h2>
          <div className="pb-8">
            <TextInput
              rounded
              label="User name"
              placeholder="johndoe"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="pb-8">
            <InputGroup rounded>
              <TextInput label="First name" placeholder="john" />
              <TextInput label="Last name" placeholder="doe" />
            </InputGroup>
          </div>
          <div className="pb-8">
            <TextInput
              rounded
              label="Email address"
              placeholder="johndoe@example.com"
              value={session.user.email}
              readOnly
            />
          </div>
          <div className="py-0.5 rounded-md shadow-sm isolate">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">
                Coldkeys
              </label>
              <Button size="sm" onClick={() => setIsAddColdkeyModalOpen(true)}>
                Add Coldkey
              </Button>
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

        <div className="flex items-center justify-end mt-6 gap-x-3">
          <Button className="min-w-[100px]" color="secondary" onClick={() => supabase.auth.signOut()}>
            Log Out
          </Button>
          <Button
            className="min-w-[100px]"
            disabled={loading}
            onClick={() => updateProfile({ username, website, avatar_url, ss58_coldkeys })}
          >
            Save
          </Button>
        </div>
      </form>
      <Modal
        ariaHideApp={false}
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
