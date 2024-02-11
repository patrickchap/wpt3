import Image from "next/image";
import venmoImg from "/public/images/photos/IMG_8934.jpeg";
import awr from "/public/images/photos/awr.jpeg";

import { PageLayout } from '~/components/Layout';
export default function Registry() {
    return (
        <PageLayout>
            <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-primary">Honeymoon Fund</h1>

            <div className="flex flex-col items-center">
                <div className="w-2/3 pb-10">
                    <a href="https://venmo.com/code?user_id=2808582160515072208&created=1707281267.168989
" target="_blank" rel="noreferrer">
                        <Image className="h-auto max-w-full rounded-lg" src={venmoImg} alt="Honeymoon Fund" width={400} height={400} />
                    </a>
                </div>
            </div>

            <h1 className="mb-8 mt-8 text-center text-3xl font-bold text-primary">Amazon Wedding Registry</h1>
            <div className="flex flex-col items-center">
                <div className="w-2/3 pb-10">
                    <a href="https://www.amazon.com/wedding/registry/22Y1MAGLYFUWM" target="_blank" rel="noreferrer">
                        <Image className="h-auto max-w-full rounded-lg" src={awr} alt="Amazon Wedding Registry" width={400} height={400} />
                    </a>
                </div>
            </div>
        </PageLayout>
    )
}
