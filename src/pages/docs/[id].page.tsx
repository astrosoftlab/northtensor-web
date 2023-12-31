import Head from 'next/head'

import parse from 'html-react-parser'

import IconBullet from '@assets/icons/icon-bullet.svg'
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
  const contentList: any[] = []

  parse(postData.contentHtml, {
    replace: (el: any) => {
      if (el.name === 'h2') contentList.push(el.children[0].data)
    }
  })

  const scrollToText = (text: string) => {
    const elementsArray = Array.from(document.querySelectorAll('h2'))
    const element = elementsArray.reverse().find((el: any) => el.textContent.includes(text))

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <main>
      <Head>
        <title>{postData.title} </title>
      </Head>
      <div className="container">
        <div className="sm:mt-[44px] mt-[33px]">
          <PageLabel label="Published" text={<Date dateString={postData.date} />} />
        </div>

        <h1 className="text-center break-normal">{postData.title}</h1>
        <div className="sm:grid sm:grid-cols-10 flex flex-col-reverse justify-start sm:gap-[92px]">
          <div className="col-span-7">
            <div className="break-normal mdx-container" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </div>
          <div className="col-span-3 md:py-[24px] py-[18px]">
            <div className=" sm:px-[13px] px-[8px] sm:py-[20px] py-[15px] bg-[#0e0e0e80]">
              <h4 className="sm:mb-[20px] mb-[15px]">On this page</h4>
              <div className="flex flex-col gap-d-16">
                {contentList.map((el, index) => (
                  <div
                    key={index}
                    onClick={() => scrollToText(el)}
                    className="cursor-pointer group flex sm:gap-[12px] gap-[8px]"
                  >
                    <IconBullet className="shrink-0" />
                    <div className="font-[500] group-hover:text-primary">{el}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
