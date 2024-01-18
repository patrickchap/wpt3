import Link from 'next/link';
import { PageLayout } from '~/components/Layout';

export default function TravelAndLodging() {
    return (
        <div>
            <>
                {/* The Venue */}
                <PageLayout>
                <section className="">
                    <div className="container mx-auto">
                        <div className="flex flex-col items-center justify-center -mx-4 w-full">
                            <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-primary">Venue</h1>
                            <p className="text-gray-700 text-center w-3/5 text-xl">
                                Palisades is a beautiful venue nestled in Olympic Valley, offering breathtaking views of the surrounding mountains.
                                With its charming atmosphere and stunning vistas, it&lsquo;s the perfect place for our special day. Looking to make the most of your Tahoe stay? Explore some of our favorite activities and must-visit sites for an exceptional experience <Link href="/things-to-do" className="cursor-pointer text-lg text-primary">here</Link>.
                            </p>
                            <p className="pt-6 text-gray-700 text-center w-3/5 text-xl">Both the ceremony and reception will be held at High Camp located at Olympic Valley, CA 96146</p>
                        </div>
                    </div>
                </section>
                {/* Lodging Options */}
                <section className="mt-4 pb-8 section-blue rounded-lg">
                    <div className="container mx-auto">
                        <h1 className="mt-8 text-3xl font-bold text-primary text-center mb-8">Lodging Options</h1>
                        <div className="flex flex-col items-center justify-center -mx-4 w-full">
                            <p className="text-gray-700 text-center w-3/5 text-xl">
                                For your stay, we suggest North Lake Tahoe, where you can benefit from discounted room rates through our provided <a target="_blank" className="text-primary underline" href="https://www.inntopia.travel/Ecomm/Package/Package/9801138/en-US/?packageid=71114&promocode=FerberChapple">link</a>. Alternatively, you can call <a className="text-primary underline" href="tel:1-800-403-0206">1-800-403-0206</a> and reserve using our wedding name, &quot;FerberChapple&quot;. Another excellent choice is the PlumpJack Inn, conveniently situated in Olympic Valley.
                            </p>
                            <p className="text-gray-700 text-center w-3/5 text-xl pt-2">
                                To find more lodging options and exciting activities, take a look at this website: <a className="text-primary underline" href="https://www.gotahoenorth.com/lake-tahoe/towns/">https://www.gotahoenorth.com/lake-tahoe/towns/</a>
                            </p>
                        </div>
                    </div>
                </section>
                {/* Travel Information */}
                <section className="py-2 w-full">
                    <div className="container mx-auto">
                        <h1 className="mt-8 text-3xl font-bold text-primary text-center mb-8">Travel Information</h1>
                        <div className="flex flex-col items-center justify-center -mx-4 w-full mb-10">
                            <ul className="space-y-6 w-3/5">
                                <li className="bg-white p-4">
                                    <h3 className="text-xl text-gray-600 font-semibold">Reno-Tahoe International Airport</h3>
                                    <p className="text-gray-700 text-lg">45-minute drive</p>
                                </li>
                                <li className="bg-white p-4">
                                    <h3 className="text-xl text-gray-600 font-semibold">Sacramento International Airport</h3>
                                    <p className="text-gray-700 text-lg">2-hour drive</p>
                                </li>
                                <li className="bg-white p-4">
                                    <h3 className="text-xl text-gray-600 font-semibold">San Francisco Airport</h3>
                                    <p className="text-gray-700 text-lg">3.5-hour drive</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                </PageLayout>
            </>
        </div>
    )
}
