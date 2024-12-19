import Head from "next/head"
import Layout, { siteTitle } from "../components/layout"
import utilStyles from "../styles/utils.module.css"
import Alert from "../components/alert"
import { getSortedPostsData } from "../lib/posts"
import Link from "next/link"
import Date from "../components/date"

// SSG Static Generation
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I’m <strong>Kimi</strong>. I’m a software engineer and a
          translator (English/Chinese). You can contact me on{" "}
          <a href='https://x.com/'>Twitter</a>.
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href='https://www.nextjs.cn/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <Alert type="success">Success</Alert>
        <Alert type="error">Error</Alert>
      </section>
    </Layout>
  )
}
