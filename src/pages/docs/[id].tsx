import Date from "@components//date"
import { getAllPostIds, getPostData, PostData } from "@lib/docs"
import Head from "next/head"

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export default function Post({
  postData,
}: {
  postData: PostData & { contentHtml: string }
}) {
  return (
    <>
      <Head>
        <title>{postData.title} </title>
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <main className="flex flex-col items-center max-w-3xl px-4 py-10 md:px-20 ">
          <article className="prose">
            <h1 className="text-3xl font-thin sm:text-5xl ">
              {postData.title}
            </h1>
            <Date dateString={postData.date} />
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </main>
      </div>
    </>
  )
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}
