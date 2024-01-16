import { type NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import { PageLayout } from "~/components/Layout";
import bridesmaidsData from "../../assets/bridesmaids" 
import Working from "~/components/working";


const WeddingParty = () => {

    const isUpdating = process.env.NEXT_PUBLIC_IS_UPDATING;
    if(isUpdating){
        return <Working />
    }

    return (
        <PageLayout>
            <h1 className="mt-8 text-3xl font-bold text-primary">Bridesmaids</h1>
            <div className="grid grid-cols-4 gap-4 w-5/6">
                {bridesmaidsData.map((w, idx) =>(
                w.src ? (

                    <Party key={idx} src={w.src}  name={w.name} desc={w.message} />
                ) : 
                    <div key={idx}></div>
                ))
                }
            </div>
        </PageLayout>
    )
}




const Party: NextPage<{ src: StaticImageData, name: string, desc: string }> = ({ src, name, desc }) => {
    return (
        <div className="flex flex-col pt-8 col-span-4 md:col-span-1 pt-14">
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
