import { type NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import { PageLayout } from "~/components/Layout";
import img from "/public/images/300X300.png";

const wp: { src: StaticImageData, name: string, desc: string }[] = [
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
    { src: img , name: "First Last", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis magna in nulla interdum, at tincidunt nisl pretium. Duis molestie a metus et accumsan. Proin in lacus porta, sollicitudin tellus imperdiet, blandit velit. Aliquam vulputate turpis at lorem sagittis laoreet. Nunc ac diam et leo condimentum ornare." },
]


const WeddingParty = () => {
    return (
        <PageLayout>
            <h1 className="mt-8 text-3xl font-bold text-primary">Wedding Party</h1>
            <div className="grid grid-cols-4 gap-4 w-5/6">
                {wp.map((w, idx) => (
                    <Party key={idx} src={w.src} name={w.name} desc={w.desc}/>
                ))}
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
                className="rounded-full item-center"
                alt={`@${name}'s picture`}
                width={100}
                height={100}
            />
            </div>
            <h4 className="text-center font-bold p-2">{name}</h4>
            <p className="text-md">{desc}</p>
        </div>
    )
}

export default WeddingParty;
