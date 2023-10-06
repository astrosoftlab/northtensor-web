import { useCallback, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import { Session, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { Database } from '@lib/utils/database.type'

import ColdkeyInput from './ColdkeyInput'
import ColdkeyModal from './ColdkeyModal'

type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [first_name, setFirstName] = useState<Profiles['first_name']>(null)
  const [last_name, setLastName] = useState<Profiles['last_name']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const [ss58_coldkeys, setSS58Coldkeys] = useState<Profiles['ss58_coldkeys']>(null)
  const [showModal, setShowModal] = useState(false)
  const [newColdkeyName, setNewColdkeyName] = useState('')
  const [newColdkeyValue, setNewColdkeyValue] = useState('')
  const [isAddColdkeyModalOpen, setIsAddColdkeyModalOpen] = useState(false)

  function handleColdkeyInputChange(index: number, newName: string, newColdkey: string, newWatched: boolean) {
    setSS58Coldkeys((prevColdkeys) => {
      if (prevColdkeys === null) return prevColdkeys
      if (prevColdkeys[index] === null) return prevColdkeys
      const coldkey = prevColdkeys[index]
      if (typeof coldkey !== 'object') return prevColdkeys
      const updatedColdkey = {
        ...coldkey,
        name1: newName,
        coldkey: newColdkey,
        watched: newWatched
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
            validated: false
          }
        ]
        return updatedColdkeys
      } else {
        const updatedColdkeys = [
          ...prevColdkeys,
          {
            name1: newName,
            coldkey: newColdkey,
            watched: true,
            validated: false
          }
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

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, website, avatar_url, ss58_coldkeys`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setSS58Coldkeys(data.ss58_coldkeys)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [supabase, user])

  async function updateProfile({
    username,
    first_name,
    last_name,
    website,
    avatar_url,
    ss58_coldkeys
  }: {
    username: Profiles['username']
    first_name: Profiles['first_name']
    last_name: Profiles['last_name']
    website: Profiles['website']
    avatar_url: Profiles['avatar_url']
    ss58_coldkeys: Profiles['ss58_coldkeys']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        first_name,
        last_name,
        website,
        avatar_url,
        ss58_coldkeys,
        updated_at: new Date().toISOString()
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    // Handle form submission
  }

  useEffect(() => {
    getProfile()
  }, [session, getProfile])

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <div>
          <div className="pb-8">
            <Input label="User name" placeholder="johndoe" value={username || ''} onChange={(v) => setUsername(v)} />
          </div>
          <div className="pb-8">
            <Input label="First name" placeholder="john" value={first_name || ''} onChange={(v) => setFirstName(v)} />
          </div>
          <div className="pb-8">
            <Input label="Last name" placeholder="doe" value={last_name || ''} onChange={(v) => setLastName(v)} />
          </div>
          <div className="pb-8">
            <Input label="Email address" placeholder="johndoe@example.com" value={session.user.email} readOnly />
          </div>
          <div className="rounded-md shadow-sm isolate md:mb-[25px] mb-[19px]">
            <div className="flex flex-col">
              {ss58_coldkeys?.map((key, index) => {
                if (typeof key !== 'object' || Array.isArray(key)) return null
                return (
                  <ColdkeyInput
                    key={index}
                    onInputChange={handleColdkeyInputChange}
                    name={key?.name1 as string}
                    coldkey={key?.coldkey as string}
                    watched={key?.watched as boolean}
                    validated={key?.validated as boolean}
                    index={index}
                    totalLength={ss58_coldkeys.length}
                    onDelete={() => handleRemoveColdkey(index)}
                  />
                )
              })}
            </div>
          </div>

          <Button
            full
            size="lg"
            color="white"
            className="md:mb-[25px] mb-[19px]"
            onClick={() => setIsAddColdkeyModalOpen(true)}
          >
            <div className="font-bold">Add Coldkey</div>
          </Button>
        </div>

        <div className="flex items-center justify-end mt-6 gap-x-3">
          <Button full size="lg" color="blur" onClick={() => supabase.auth.signOut()}>
            Log Out
          </Button>
          <Button
            full
            size="lg"
            disabled={loading}
            onClick={() => updateProfile({ username, first_name, last_name, website, avatar_url, ss58_coldkeys })}
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
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: 'rgba(0, 0, 0, 0)'
          }
        }}
      >
        <ColdkeyModal
          name={`New Coldkey ${ss58_coldkeys ? ss58_coldkeys.length : 1}`}
          coldkey={''}
          onSave={addNewColdkey}
          onClose={() => setIsAddColdkeyModalOpen(false)}
          newBool={true}
        />
      </Modal>
    </>
  )
}
