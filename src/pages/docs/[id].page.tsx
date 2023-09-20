import Head from 'next/head'

import Date from '@components/ui/Date'
import { PageLabel } from '@components/ui/PageLabel'
import { PostData, getAllPostIds, getPostData } from '@lib/docs'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }: { postData: PostData & { contentHtml: string } }) {
  return (
    <main>
      <Head>
        <title>{postData.title} </title>
      </Head>
      <div className="container">
        <div className="lg:mt-[44px] mt-[33px]">
          <PageLabel label="Tailsman" text={<Date dateString={postData.date} />} />
        </div>

        <h1 className="text-center">{postData.title}</h1>
        <div className="grid grid-cols-8 lg:gap-[92px]">
          <div className="col-span-6">
            <div className="mdx-container" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </div>
          <div>Content list</div>
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}
