import { type NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import { PageLayout } from "~/components/Layout";
import img from "/public/images/300X300.png";
import Working from "~/components/working";

const wp: { src: StaticImageData, alt: string }[] = [
    { src: img, alt: "alt img"},
    { src: img, alt: "alt img"},
    { src: img, alt: "alt img"},
    { src: img, alt: "alt img"},
    { src: img, alt: "alt img"},
    { src: img, alt: "alt img"},
    { src: img, alt: "alt img"},
    { src: img, alt: "alt img"},
]

const Photos = () => {
    const isUpdating = process.env.NEXT_PUBLIC_IS_UPDATING;
    if (isUpdating) {
        return <Working />
    }

    return (
        <PageLayout>
            <h1 className="mt-10 text-3xl font-bold text-primary">Photos</h1>
            <div className="grid grid-cols-3 gap-8 w-5/6">
                {wp.map((w, idx) => (
                    <MyImg key={idx} src={w.src} alt={w.alt}/>
                ))}
            </div>
        </PageLayout>
    )
}

const MyImg: NextPage<{ src: StaticImageData, alt: string}> = ({ src, alt }) => {
    return (
        <div className="flex flex-col pt-8 col-span-3 md:col-span-1">
            <div className="flex justify-center w-full">
            <Image
                src={src}
                className="item-center"
                alt={`@${alt}'s picture`}
                width={400}
                height={400}
            />
            </div>
        </div>
    )
}

export default Photos;
