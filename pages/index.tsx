import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>MNRV.AI</title>
        <meta name="description" content="mnrv.ai Front Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="relative bg-[url('../public/images/wallpaperflare.com_wallpaper.jpg')] px-4 py-32 sm:px-6 lg:flex  lg:items-center">
        <div className="w-4/5 mx-auto mb-8">
          <div className="text-3xl sm:text-5xl text-gray-100 font-thin">
            MNRV.AI
          </div>
          <br />
          <p className="mb-4 opacity-100 text-lg leading-8 font-normal text-gray-100">
            We are a Bittensor-first AI Firm aiming to utilize the inevitable union of economic efficiencies provided through cryptocurrency technologies. Our focus is to create infrastructure required to scale and support basic transformer driven data extraction to Artificial General Intelligence.
          </p>
          <p className="mb-4 opacity-100 text-lg leading-8 font-normal text-gray-100">
            Check out our introductory guides
          </p>
          <Link href="/docs/introduction-to-bittensor" className="bg-gray-500 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded">
          Getting Started
          </Link>
          <br />
          <br />
          <p className="mb-4 opacity-100 text-lg leading-8 font-normal text-gray-100">
            Or, just start Staking
          </p>
          <Link href="https://app.mnrv.ai" className="bg-gray-500 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded">
          Stake Tao
          </ Link>
        </div>
        </div>

        <div className="grid grid-cols-4 gap-4 py-6 px-6 dark:bg-gray-800">
          <Link
            href="/docs/introduction-to-bittensor"
            className="py-4 px-4 rounded-lg bg-transparent border border-transparent transition-colors duration-200 hover:bg-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
            target="_self"
            rel="noopener noreferrer">
            <h2 className="text-2xl font-bold mb-2 mr-2">Developers <span className="font-bold"> &rarr; </span></h2>
            <p className="tagline italic font-bold">
              A Bittensor backend is just the start for building AI solutions.
            </p>
            <br />
            <p className="text-gray-800 leading-relaxed dark:text-gray-200">
              We&apos;re hoping to help bring the builder culture back into crypto, where collaboration and innovating killer apps that truly disrupt the world as we know it thrive.
            <br />
            <br />
              If you&apos;re a developer, we&apos;ll work to provide guides, tooling, and other resources to make it easier for you to dive right into developing, iterating, and deploying your AI apps. We&apos;ll also work to provide the front-end here as a one-stop shop for connections and collaboration to drive the future of AI together.
            </p>
            </ Link>
          <Link
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="py-4 px-4 rounded-lg bg-transparent border border-transparent transition-colors duration-200 hover:bg-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
            target="_blank"
            rel="noopener noreferrer" >
            <h2 className="text-2xl font-bold mb-2 mr-2">Clients <span className="font-bold"> &rarr; </span></h2>
            <p className="tagline italic font-bold">
              AI can be used for more than you think.
            </p>
            <br />
            <p className="text-gray-800 leading-relaxed dark:text-gray-200">
              We&apos;re investing in further development and implementation of AI to inspire simple solutions to complex problems. 
            <br />
            <br />
              As a Client, this means access to an increasing array of AI tools for work, play, and inspiration. We also aim to distribute non-expiring Tao utility tokens to you during the period of your membership, to be utilized for transformer interactions in simple GUI interfaces and API calls in your own apps.
            </p>
          </Link>

          <Link
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="py-4 px-4 rounded-lg bg-transparent border border-transparent transition-colors duration-200 hover:bg-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-2xl font-bold mb-2 mr-2">Stakers <span className="font-bold"> &rarr; </span></h2>
            <p className="tagline italic font-bold">
              Your Tao can do good for both you and the rest of the world.
            </p>
            <br />
            <p className="text-gray-800 leading-relaxed dark:text-gray-200">
              With experience validating since early 2022, we appreciate how valuable validating is to the future of Bittensor. We want to scale that value out.
            <br />
            <br />
              As a Staker, you&apos;ll be provided your share of Tao inflation directly into your personal wallet, and you&apos;ll be given membership commensurate with your stake to take advantage of our Client and Miner offerings without needing to pay extra.
            <br />
            <br />
              Your staked Tao will reward you and allow us to achieve our vision of a more accessible and open AI.
            </p>
          </Link>

          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="py-4 px-4 rounded-lg bg-transparent border border-transparent transition-colors duration-200 hover:bg-white hover:border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-2xl font-bold mb-2 mr-2">Miners <span className="font-bold"> &rarr; </span></h2>
            <p className="tagline italic font-bold ">
              You can help mine, no matter your skill level.
            </p>
            <br />
            <p className="text-gray-800 leading-relaxed dark:text-gray-200">
              We personally know the complexity and expenses of mining Tao. We want to break down those barriers to allow you to contribute to mining no matter your skill level, and receive Tao inflation for it. 
            <br />
            <br />
              As a member, you&apos;ll be provided access to our growing resources to help you and others mine Tao. These will range from introductory documentation to a simplified front-end where you can fine-tune models for your own personal deployment or launch your model into mining directly from our site.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
