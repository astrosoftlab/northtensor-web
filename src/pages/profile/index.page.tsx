import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { PageLabel } from '@components/ui/PageLabel'

import Account from './Account'

export default function Home() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <main className="container flex-1">
      <div className="flex flex-col items-center justify-center lg:py-[44px] py-[33px] lg:px-8">
        {!session && <PageLabel label="MOST" text="Promising Projects" />}
        <div className="lg:mx-auto lg:mb-[75px] mb-[56px]">
          {session ? (
            <h1 className="mt-10 lg:max-w-[966px] text-center">My Profile</h1>
          ) : (
            <h1 className="mt-10 lg:max-w-[966px] text-center">Sign in to Your Account</h1>
          )}
        </div>

        <div className="card lg:w-full lg:max-w-[654px] lg:p-[40px] p-[30px]">
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                className: {
                  label: 'lg:!text-[16px] !text-[12px] !text-white !font-inter',
                  input:
                    'text-input !block !w-full lg:!px-[25px] !px-[18px] lg:!py-[17px] !py-[12px] !border !border-blur hover:!border-blur-light !bg-[#FFFFFF10] lg:!rounded-lg rounded-md !text-white',
                  button:
                    'w-full relative flex items-center justify-center lg:!py-[17px] !py-[12px] lg:!text-[20px] !text-[15px] !font-inter before:absolute before:inset-0 lg:!rounded-lg rounded-md before:transition before:duration-300 active:duration-75 !bg-primary text-white !border-primary ',
                  anchor: 'lg:!text-[14px] !text-[11px] !text-white !font-inter hover:!text-primary',
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
    </main>
  )
}
