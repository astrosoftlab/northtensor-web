import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { remark } from 'remark'
import remarkHeadingId from 'remark-heading-id'
import html from 'remark-html'

const miscDirectory = path.join(process.cwd(), 'documentation/misc')
const postsDirectory = path.join(process.cwd(), 'documentation/guides')

export interface PostData {
  id: string
  date: string
  title: string
  [key: string]: any
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    } as PostData // Asserting that the resulting object has the PostData type
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds(): { params: { id: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, '')
      }
    }
  })
}

export async function getPostData(id: string): Promise<PostData & { contentHtml: string }> {
  const fullPath = path.join(postsDirectory, `${id}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(remarkHeadingId).use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  } as PostData & { contentHtml: string }
}

export async function getMiscPage(id: string): Promise<PostData & { contentHtml: string }> {
  const fullPath = path.join(miscDirectory, `${id}.mdx`)
  const fileContents = await fs.promises.readFile(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark().use(remarkHeadingId).use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  } as PostData & { contentHtml: string }
}
