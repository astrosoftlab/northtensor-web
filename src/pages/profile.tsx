import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

import Account from "@components/Account"

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <main className="flex-1">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {!session && (
            <>
              <h2 className="mt-10 text-3xl font-bold leading-9 tracking-tight text-center sm:text-4xl text-slate-900">
                Sign in to your account
              </h2>
            </>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                className: {
                  input:
                    "block w-full border-gray-300 shadow-sm focus:ring-primary focus:!border-primary sm:text-sm !rounded-full !font-sans",
                  button:
                    "w-full relative flex items-center justify-center before:absolute before:inset-0 !rounded-full before:transition before:duration-300 active:duration-75 font-semibold !bg-primary text-white !border-primary !font-sans",
                  anchor: "!font-sans hover:!text-primary",
                  message: "!font-sans",
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