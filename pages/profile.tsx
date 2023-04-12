import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'


const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="leading-loose text-3xl sm:text-3xl font-thin flex justify-center items-start h-screen bg-gray-200">
      <div className="leading-loose max-w-4xl w-full mx-4 sm:mx-auto mt-8 p-8 bg-gray-100 shadow-md rounded-lg">
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={[]}/>
        ) : (
          <Account session={session} />
        )}
      </div>
    </div>
  )
}

export default Home
