import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '@/components/Account'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="min-h-screen bg-slate-200">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          { !session &&
            <>
              <img
                className="mx-auto h-16 w-auto"
                src="/images/newlogo.svg"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900">
                Sign in to your account
              </h2>
            </>
          }
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!session ? (
            <Auth supabaseClient={supabase}     appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0f172a',
                    brandAccent: '#475569',
                  },
                },
              },
            }} providers={[]}/>
          ) : (
            <Account session={session} />
          )}
        </div>
      </div>
    </div>
  )
}