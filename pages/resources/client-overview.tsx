import { getAllPostIds, getPostData, PostData } from '../../lib/docs';
import Head from 'next/head';
import Date from '../../components/date';
import HelloWorld from '../../documentation/resources/client-overview.mdx';
import { MDXProvider } from '@mdx-js/react';
import SidebarNav from '@/components/tailwindui/SidebarNav';

export default function Post({ postData }: { postData: PostData & { contentHtml: string } }) {
  return (
    <>
      <Head>
        <title>Blah </title>
      </Head>
      <div className='flex h-screen'>
      <div className='w-1/6 bg-gray-200 p4'>
          <SidebarNav />
        </div>
      <main className="md:max-xl:flex-wrap flex-col items-center px-20 py-10 min-h-screen dark:text-gray-200">
      <article className="prose dark:prose-invert prose-lg dark:text-gray-200">
        <h1 className="text-3xl sm:text-5xl font-thin dark:text-gray-200">Blah</h1>
          <Date dateString="2023-01-01" />
         <HelloWorld />
      </article>
      </main>
      </div>
    </>
  );
}

