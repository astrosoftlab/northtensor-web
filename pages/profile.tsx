import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../components/Account'


const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container dark:text-gray-200 text-gray-800 text-3xl sm:text-3xl font-thin" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <Account session={session} />
      )}
    </div>
  )
}

export default Home