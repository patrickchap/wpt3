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
            <h1 className="mt-8 text-3xl font-bold text-primary text-center mb-8">Our Story</h1>
            <p className="pb-8 md:pb-3">Patrick and Chantil met while working at CR England in 2017. During their time working together, they sat next to each other and became friends. In October 2018, Chantil mentioned she was going to a haunted house with some friends, and Patrick hinted that they should go to one together. So, for their first date they went to Mellow Mushroom (a pizza place, of course!) and a haunted house. After the haunted house, they went back to Patrick&rsquo;s house, where Patrick&rsquo;s group of friends were hanging out, and Chantil unknowingly met 2 of her now bridesmaids, Marky and Meghna. After everyone left Patrick&rsquo;s house, they enjoyed a peaceful night of watching the greatest Halloween movie of all time- Hocus Pocus (Patrick&rsquo;s words). Unfortunately, they both fell asleep halfway through and woke up to a phone call from Chantil&rsquo;s mom at 4 in the morning. A few weeks later, Chantil came over for a Halloween party dressed as a cop, and of course, Patrick was the robber. The next day, Patrick asked Chantil to be his girlfriend. Over the next couple years, they enjoyed many dates, adventures, and trips together where they were able to grow as a couple and strengthen their love for each other. The moment they knew they wanted to spend the rest of their lives together was during their trip to San Francisco and then Bend, OR. From riding bikes across the Golden Gate Bridge, walking to the best Italian restaurant on earth, and exploring Crater Lake, they knew that whatever they did, it was always better together.</p>
            <p className="pb-8 md:pb-3">In August 2020, Chantil and Lulu, her sassy yorkie, moved in with Patrick and his doggos, Travis and Shasta. While living together, they have been there for each other through all that life has to throw at them, whether it is long nights after work and school or Chantil saw a spider in the house. Through the ups and the occasional downs, they have built a strong foundation of love, respect, and trust. Throughout this journey, they have learned a lot about themselves and what&lsquo;s important in life. They cherish every moment together, especially their nights at home with the doggos rewatching their favorite shows- Chuck, Psych, and Scrubs.</p>
            <p className="pb-8 md:pb-3">Fast forward to November 2022, Patrick and Chantil drove to California for Thanksgiving. After an 8-hour car ride, Patrick wanted to go for a walk around Donner Lake, and Chantil was not having it. After 30 minutes of trying to convince her, they settled on a walk near Patrick&rsquo;s parent&lsquo;s house. Shortly into the walk, they came across a small pond where they stopped to enjoy the sunset. Patrick then pulled out the engagement ring (He went to Jared) and proposed right then and there. After the proposal, they enjoyed a slice of pizza from the local pizzeria. (They really do love pizza.) Chantil was so excited she couldn&rsquo;t wait to Facetime her mom, sisters, and grandma and tell them what happened. It is truly a day neither one of them will forget. They look forward to getting married in beautiful Lake Tahoe, 15 minutes from where they got engaged. It will be a special day with loved ones and friends. They cannot wait to say YES and spend the rest of their lives together.</p>
        </div>
        </div>
      </main>
    </>
  )
}
