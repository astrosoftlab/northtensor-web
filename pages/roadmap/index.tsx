import Layout from '../../components/Layout';
import {getMiscPage, PostData } from '../../lib/docs';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import article_style from '@/styles/article.module.css'

const inter = Inter({ subsets: ['latin'] })
const pageID: string = "roadmap"

export default function Post({ postData }: { postData: PostData & { contentHtml: string } }) {
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<main className={styles.main}>
				<article>
					<h1 className={utilStyles.headingXl}>{postData.title}</h1>
					<div className={utilStyles.lightText}>
						<Date dateString={postData.date} />
					</div>
					<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} className={article_style.article} />
				</article>
			</main>
		</>
	);
}


export async function getStaticProps() {
	// Add the "await" keyword like this:
	const postData: PostData = await getMiscPage(pageID)

	return {
		props: {
			postData,
		},
	};
}
