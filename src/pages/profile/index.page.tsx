import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { PageLabel } from '@components/ui/PageLabel'

import Account from './Account'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <main>
      <div className="container">
        <div className="flex flex-col items-center justify-center sm:py-[44px] py-[33px] sm:px-8">
          {!session && <PageLabel label="MOST" text="Promising Projects" />}
          <div className="sm:mx-auto sm:mb-[75px] mb-[56px]">
            {session ? (
              <h1 className="mt-10 sm:max-w-[966px] text-center">My Profile</h1>
            ) : (
              <h1 className="mt-10 sm:max-w-[966px] text-center">Sign in to Your Account</h1>
            )}
          </div>

          <div className="card w-full sm:max-w-[654px] sm:p-[40px] p-[30px]">
            {!session ? (
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  className: {
                    label: 'sm:!text-[16px] !text-[12px] !text-white !font-inter',
                    input:
                      'text-input !block !w-full sm:!px-[25px] !px-[18px] sm:!py-[17px] !py-[12px] !border !border-blur hover:!border-blur-light !bg-[#FFFFFF10] sm:!rounded-lg rounded-md !text-white',
                    button:
                      'w-full relative flex items-center justify-center sm:!py-[17px] !py-[12px] sm:!text-[20px] !text-[15px] !font-inter before:absolute before:inset-0 sm:!rounded-lg rounded-md before:transition before:duration-300 active:duration-75 !bg-primary text-white !border-primary ',
                    anchor: 'sm:!text-[14px] !text-[11px] !text-white !font-inter hover:!text-primary',
                    message: '!font-inter'
                  }
                }}
                providers={[]}
              />
            ) : (
              <Account session={session} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
