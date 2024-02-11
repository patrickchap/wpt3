import { type NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import { PageLayout } from "~/components/Layout";
import bridesmaidsData from "../../assets/bridesmaids"
import groomsmen from "../../assets/groomsmen"
import officiant from "../../assets/officiant"


const WeddingParty = () => {


    return (
        <PageLayout>
            <h1 className="mt-8 text-3xl font-bold text-primary">officiant</h1>
            <div className="grid grid-cols-1 w-5/6">
                <Party key={officiant.name} src={officiant.src} name={officiant.name} desc={officiant.message} />
            </div>
            <h1 className="mt-8 text-3xl font-bold text-primary">Bridesmaids</h1>
            <div className="grid grid-cols-4 gap-4 w-5/6">
                {bridesmaidsData.map((w) => (
                    w.src ? (

                        <Party key={w.name} src={w.src} name={w.name} desc={w.message} />
                    ) :
                        <div key={w.name} />
                ))
                }
            </div>
            <h1 className="mt-8 text-3xl font-bold text-primary">Groomsmen</h1>
            <div className="grid grid-cols-4 gap-4 w-5/6">
                {groomsmen.map((w) => (
                    w.src ? (

                        <Party key={w.name} src={w.src} name={w.name} desc={w.message} />
                    ) :
                        <div key={w.name} />
                ))
                }
            </div>
        </PageLayout>
    )
}




const Party: NextPage<{ src: StaticImageData, name: string, desc: string }> = ({ src, name, desc }) => {
    return (
        <div className="flex flex-col pt-8 col-span-4 md:col-span-1">
            <div className="flex justify-center w-full">
                <Image
                    src={src}
                    className="rounded-full item-center cstm-img"
                    alt={`@${name}'s picture`}
                    width={100}
                    height={100}
                />
            </div>
            <h3 className="text-center font-bold p-2">{name}</h3>
            <p className="text-md">{desc}</p>
        </div>
    )
}

export default WeddingParty;
