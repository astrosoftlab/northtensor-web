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
      <main className="main flex flex-col justify-between items-center p-24 min-h-screen">
      <article>
        <h1 className="text-3xl sm:text-5xl dark:text-gray-100 font-thin">Resources</h1>
        <br/ >
		<ul className="dark:text-gray-100">
		  {postData.map(({ id, date, title }) => (
			<li className={utilStyles.listItem} key={id}>
			  <a href={`/docs/${id}`}>{title}</a>
			  <br />
			  <small className={utilStyles.lightText}>
				<Date dateString={date} />
			  </small>
			</li>
		  ))}
		</ul>
      </article>
      </main>
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
