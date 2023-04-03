import {getMiscPage, PostData } from '../../lib/docs';
import Head from 'next/head';
import Date from '../../components/date';

const pageID: string = "roadmap"

export default function Post({ postData }: { postData: PostData & { contentHtml: string } }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <main className="flex flex-col justify-between items-center px-20 py-10 min-h-screen">
      <article className="prose prose-lg dark:text-gray-200">
        <h1 className="dark:text-gray-200">{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}/>
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
