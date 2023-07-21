import Head from "next/head";
import Test from "~/components/TestComponent";
export default function Home() {
  return (
    <>
      <Head>
        <title>P & C Wedding</title>
        <meta name="description" content="Patrick & ChantiPatrick & Chantill" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col items-center">
        <div className="w-2/3">
            <Test title={"Out Story"} />
        </div>
        </div>
      </main>
    </>
  )
}
