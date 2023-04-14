import Layout from '../../components/Layout';
import { getAllPostIds, getPostData, getSortedPostsData, PostData } from '../../lib/docs';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ postData }: { postData: PostData[] }) {
  return (
    <>
      <Head>
        <title> Resources </title>
      </Head>
      <article>
      <main className="main flex flex-col items-center p-14 min-h-screen">
        <h1 className="text-3xl sm:text-5xl dark:text-gray-100 font-thin ">Resources</h1>
        <br/ >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl dark:text-gray-100 font-thin my-4 border-b-2 border-gray-700">Developers</h2>
            <ul className="dark:text-gray-100">
		          {postData.filter(({ topics }) => topics.includes("Resources")).map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <a href={`/docs/${id}`}>{title}</a>
                  <br />
                  <small className={utilStyles.lightText}>
				           <Date dateString={date} />
                  </small>
                </li>))}
            </ul>
        </div>
    <div>
          <h2 className="text-2xl sm:text-3xl dark:text-gray-100 font-thin my-4 border-b-2 border-gray-700">Clients</h2>
            <ul className="dark:text-gray-100">
              {postData.filter(({ topics }) => topics.includes("Clients")).map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <a href={`/docs/${id}`}>{title}</a>
                  <br />
                  <small className={utilStyles.lightText}>
                   <Date dateString={date} />
                  </small>
                </li>))}
            </ul>
        </div>
    <div>
          <h2 className="text-2xl sm:text-3xl dark:text-gray-100 font-thin my-4 border-b-2 border-gray-700">Stakers</h2>
            <ul className="dark:text-gray-100">
              {postData.filter(({ topics }) => topics.includes("Stakers")).map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <a href={`/docs/${id}`}>{title}</a>
                  <br />
                  <small className={utilStyles.lightText}>
                   <Date dateString={date} />
                  </small>
                </li>))}
            </ul>
        </div>

    <div>
          <h2 className="text-2xl sm:text-3xl dark:text-gray-100 font-thin my-4 border-b-2 border-gray-700">Miners</h2>
            <ul className="dark:text-gray-100">
              {postData.filter(({ topics }) => topics.includes("Miners")).map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <a href={`/docs/${id}`}>{title}</a>
                  <br />
                  <small className={utilStyles.lightText}>
                   <Date dateString={date} />
                  </small>
                </li>))}
            </ul>
        </div>
    </div>
      
      </main>
      </article>
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
