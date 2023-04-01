import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

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

      <main className={styles.main}>
        <div className={styles.hero}>
        <div className={styles.intro_text}>
          <div className={styles.heading_jumbo}>
            MNRV.AI
          </div>
          <br />
          <p className={styles.paragraph_bigger}>
            We are a Bittensor-first AI Firm aiming to utilize the inevitable union of economic efficiencies provided through cryptocurrency technologies. Our focus is to create infrastructure required to scale and support basic transformer driven data extraction to Artificial General Intelligence.
          </p>
          <p className={styles.paragraph_bigger}>
            Check out our introductory guides
          </p>
          <Link href="/docs/introduction-to-bittensor" className={[styles.button, styles.cc_jumbo_button, styles.cc_jumbo_white, styles.w_inline_block].join(" ")} >
          <div>Getting Started</div>
          </Link>
          <br />
          <p className={styles.paragraph_bigger}>
            Or, just start Staking
          </p>
          <Link href="https://app.mnrv.ai" className={[styles.button, styles.cc_jumbo_button, styles.cc_jumbo_white, styles.w_inline_block].join(" ")} >
          <div>Stake Tao</div>
          </ Link>
        </div>
        </div>

        <div className={styles.grid}>
          <Link
            href="/docs/introduction-to-bittensor"
            className={styles.card}
            target="_self"
            rel="noopener noreferrer">
            <h2 className={inter.className}>
              Developers <span>-&gt;</span>
            </h2>
            <p className={styles.tagline}>
              A Bittensor backend is just the start for building AI solutions.
            </p>
            <br />
            <p className={inter.className}>
              We&apos;re hoping to help bring the builder culture back into crypto, where collaboration and innovating killer apps that truly disrupt the world as we know it thrive.
            <br />
            <br />
              If you&apos;re a developer, we&apos;ll work to provide guides, tooling, and other resources to make it easier for you to dive right into developing, iterating, and deploying your AI apps. We&apos;ll also work to provide the front-end here as a one-stop shop for connections and collaboration to drive the future of AI together
            </p>
            </ Link>
          <Link
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer" >
            <h2 className={inter.className}>
              Users <span>-&gt;</span>
            </h2>
            <p className={styles.tagline}>
              AI can be used for more than you think.
            </p>
            <br />
            <p className={inter.className}>
              We&apos;re investing in further development and implementation of AI to inspire simple solutions to complex problems. 
            <br />
            <br />
              As a Client, this means access to an increasing array of AI tools for work, play, and inspiration. We also aim to distribute non-expiring Tao utility tokens to you during the period of your membership, to be utilized for transformer interactions in simple GUI interfaces and API calls in your own apps..
            </p>
          </Link>

          <Link
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Stakers <span>-&gt;</span>
            </h2>
            <p className={styles.tagline}>
              Your Tao can do good for both you and the rest of the world.
            </p>
            <br />
            <p className={inter.className}>
              With experience validating since early 2022, we appreciate how valuable validating is to the future of Bittensor. We want to scale that value out.
            <br />
            <br />
              As a Staker, you&apos;ll be provided your share of Tao inflation directly into your personal wallet, and you&apos;ll be given membership commensurate with your stake to take advantage of our Client and Miner offerings without needing to pay extra.
            <br />
            <br />
              Your staked Tao will reward you and allow us to achieve our vision of a more accessible and open AI
            </p>
          </Link>

          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Miners <span>-&gt;</span>
            </h2>
            <p className={styles.tagline}>
              You can help mine, no matter your skill level.
            </p>
            <br />
            <p className={inter.className}>
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
