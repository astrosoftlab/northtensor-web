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
      <main className={styles.main}>
      <article>
        <h1 className={inter.className}>Resources</h1>
		<ul className={utilStyles.list}>
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
