import Layout from '../../components/Layout';
import Head from 'next/head';
import Link from "next/link";
import { Inter } from 'next/font/google'
import Date from '@/components/date';
import { SearchDialog } from '@/components/SearchDialog';
import SidebarNav from '@/components/tailwindui/SidebarNav';
import { getAllPostIds, getPostData, getSortedPostsData, PostData } from '@/lib/docs';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ postData }: { postData: PostData[] }) {
  return (
    <>
      <Head>
        <title>Get Started</title>
      </Head>
      <div className='flex flex-col md:flex-row justify-center min-h-screen'>
        <div className='w-3/4 p-4'>
          <h1 className="text-4xl sm:text-6xl font-bold dark:text-slate-100 text-slate-800 mb-4"></h1>
          <br />

          <div className="md:grid grid-cols-3 gap-8 justify-center block md:gap-8"> {/* Added block class for mobile stacking */}
            {/* Wallet Panel */}
            <div class="overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-600 shadow">
              <div class="px-4 py-5 sm:p-6">
                <h2 className="text-3xl sm:text-4xl font-semibold dark:text-slate-50 text-slate-800 mb-2">Wallet</h2>
                <Link href="/docs/talisman-general-guide" className="dark:text-slate-200 text-slate-700 text-xl hover:underline">Talisman Wallet (desktop)</Link>
                <br />
                <Link href="/docs/nova-general-guide" className="dark:text-slate-200 text-slate-700 text-xl hover:underline">Nova Wallet (mobile)</Link>
              </div>
            </div>

            {/* Buy Panel */}
            <div class="overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-600 shadow mt-8 md:mt-0"> {/* Added margin for mobile spacing */}
              <div class="px-4 py-5 sm:p-6">
                <h2 className="text-3xl sm:text-4xl font-semibold dark:text-slate-50 text-slate-800 mb-2">Buy</h2>
                <h3 className="text-2xl sm:text-2xl font-semibold dark:text-slate-50 text-slate-800 mt-4 mb-2 underline">Centralized Exchange (CEX):</h3>
                <Link href="/docs/purchase-tao" className="dark:text-slate-200 text-slate-700 text-xl hover:underline">Outside the US or with a VPN (desktop)</Link>
                <br />
                <Link href="/docs/purchase-tao-mobile" className="dark:text-slate-200 text-slate-700 text-xl hover:underline">Outside the US or with a VPN (mobile)</Link>
                <h3 className="text-2xl sm:text-2xl font-semibold dark:text-slate-50 text-slate-800 mt-6 mb-2 underline">Decentralized Exchange (DEX):</h3>
                <p className="dark:text-slate-200" >Using Ethereum, Uniswap, and Taobridge (coming soon)</p>
              </div>
            </div>

            {/* Stake Panel */}
            <div class="overflow-hidden rounded-lg dark:bg-slate-600 bg-slate-100 shadow mt-8 md:mt-0"> {/* Added margin for mobile spacing */}
              <div class="px-4 py-5 sm:p-6">
                <h2 className="text-3xl sm:text-4xl font-semibold dark:text-slate-50 text-slate-800 mb-2">Stake</h2>
                <Link href="/docs/staking" className="dark:text-slate-200 text-slate-700 text-xl hover:underline">Staking on North Tensor</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-center items-center">
        {/* Your footer content here */}
      </footer>
    </>
  );
}



export async function getStaticProps() {
  // Add the "await" keyword like this:
  const postData = getSortedPostsData();

  return {
    props: {
      postData,
    },
  };
}
