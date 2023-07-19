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
        <title> Get Started </title>
      </Head>
      <div className='flex flex-col md:flex-row h-fill'>
        <div className='w-3/4 p-4'>
        <h1 className="text-3xl sm:text-5xl dark:text-gray-100 font-thin center">Get Started</h1>
        <br/ >
        
        <h3> Wallet </h3>
        <Link href="/docs/talisman-general-guide"> Talisman Wallet (desktop) </Link>
        <br />
        <Link href="/docs/nova-general-guide"> Nova Wallet (mobile) </Link>
        <h3> Buy </h3>
        <h3>Centralized Exchange (CEX): </h3>
        <Link href="/docs/purchase-tao">Outside the US or with a VPN (desktop)</Link>
        <br />
        <Link href="/docs/purchase-tao-mobile"> Outside the US or with a VPN (mobile) </Link>
        <br />
        <h3>Decentralized Exchange (DEX): </h3>
        <p>Using Ethereum, Uniswap, and Taobridge (coming soon)</p>

        <h2> Stake </h2>
        <Link href="/docs/staking"> Staking on North Tensor </Link>

      </div>
      </div>
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
