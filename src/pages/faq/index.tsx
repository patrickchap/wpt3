
import { Accordion } from 'flowbite-react';
import { Flowbite } from 'flowbite-react';
import { NextPage } from 'next';
import Link from 'next/link';

import type { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: "divide-y divide-gray-200 border-gray-200 dark:divide-gray-700 dark:border-gray-700",
      flush: {
        off: "rounded-lg border",
        on: "border-b"
      }
    },
    content: {
      base: "py-5 px-5 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg"
    },
    title: {
      arrow: {
        base: "h-6 w-6 shrink-0",
        open: {
          off: "",
          on: "rotate-180"
        }
      },
      base: "flex w-full text-md md:text-lg items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-semibold text-gray-500",
      flush: {
        off: "hover:bg-primary/[.04] focus:bg-primary/25",
        on: "bg-transparent dark:bg-transparent"
      },
      heading: "",
      open: {
        off: "",
        on: "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white"
      }
    }
  }
};


const Address: NextPage<{ street: string, city: string, state: string, zip: string, addressUrl: string }> = ({ street, city, state, zip, addressUrl }) => {
  return (
    <div className="p-4">
      <p className="text-gray-500 text-md md:text-lg font-semibold mb-2">Address</p>
      <Link href={`${addressUrl}`} target="_blank">
        <span className="text-md md:text-lg font-semibold hover:text-primary hover:underline">
          {street}, {city}, {state} {zip}
        </span>
      </Link>
    </div>
  );
};
export default function Faq() {
  return (
    <>
      <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-primary">FAQs</h1>
      <div className="container mx-auto pb-20">
        <Flowbite theme={{ theme: customTheme }}>
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>
                What are the addresses of the wedding ceremony and reception venues?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-primary">Upper Deck at High Camp - Ceremony Venue</span> Located at the top of Palisades Tahoe and only accessible via the aerial tram.
                </p>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  <span className="font-bold text-primary">Terrace Room at High Camp - Reception Venue</span> Located below the Upper Deck, where the Ceramony will be held.
                </p>
                <Address street="1960 Squaw Valley Road" city="Olympic Valley" state="CA" zip="96146" addressUrl="https://www.google.com/maps/place/Olympic+Valley,+CA+96146/@39.2034103,-120.2406149,14z/data=!3m1!4b1!4m6!3m5!1s0x809bd9eb8ed78e61:0x84b9b4fc9269314f!8m2!3d39.1969804!4d-120.2357055!16zL20vMDY1M2du?entry=ttu" />
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What time should I arrive?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  The only way to get to the ceremony and reception is by taking the aerial tram, which will run at 3:15pm and 3:30pm. Please plan to arrive early so you do not miss the final tram ride.
                </p>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  Once the ceremony is completed, we will have cocktail hour, dinner, and dancing, but the tram will be available for guests to leave and return if needed.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Am I allowed to bring a plus one?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  We are only able to accommodate guests who are on the guest list. If you have any questions about your invitation, please reach out to us directly.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What is the dress code?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  The dress code is semi-formal. We recommend wearing layers as the temperature can change throughout the day and evening.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What is the weather going to be like?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  The weather at Palisades Tahoe in August typically ranges from 55° to 71°. We recommend dressing in layers and wearing comfortable shoes. The ceremony and cocktail hour will be held outdoors, so please plan accordingly.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                Are children allowed?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  Unfortunately, we are unable to accommodate children at the ceremony or reception other than those in the wedding party.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What is the parking situation?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  Parking is available at the base of the mountain and is a short walk to the tram. It is recommended to arrive early to ensure you have enough time to make the final tram ride.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                What is the gift policy?
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-md md:text-lg text-gray-500 dark:text-gray-400">
                  If you would like to give a gift, we have a registry through Amazon <a href="https://www.amazon.com/wedding/registry/22Y1MAGLYFUWM" target="_blank" className="text-primary hover:underline" rel="noreferrer">here</a>. We also have a honeymoon fund through Venmo, which you can find <a href="https://venmo.com/code?user_id=2808582160515072208&created=1707281267.168989" target="_blank" className="text-primary hover:underline" rel="noreferrer">here</a>.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </Flowbite>
      </div>
    </>
  );
}
