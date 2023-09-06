import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import Account from './Account'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <main className="flex-1">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {!session && <h3 className="mt-10 font-semibold">Sign in to your account</h3>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                className: {
                  input:
                    'block w-full border-gray-300 shadow-sm focus:ring-primary focus:!border-primary sm:text-sm !rounded-full ',
                  button:
                    'w-full relative flex items-center justify-center before:absolute before:inset-0 !rounded-full before:transition before:duration-300 active:duration-75 font-semibold !bg-primary text-white !border-primary ',
                  anchor: ' hover:!text-primary',
                  message: '',
                },
              }}
              providers={[]}
            />
          ) : (
            <Account session={session} />
          )}
        </div>
      </div>
    </main>
  )
}
