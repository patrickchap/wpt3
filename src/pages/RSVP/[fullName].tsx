import type { GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const RSVPGuestOrGroup = (
    props: InferGetServerSidePropsType<typeof getStaticProps>,
) => {

    const { data } = api.wedding.getGuestAndGroupByName.useQuery({ fullName: props.guestName });

    if (!data) return <div>404</div>;

    if (data.group != null) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mt-8 text-primary w-full text-center">Hello {data.guest.fullname}!</h1>
                <div className="flex flex-col items-center mt-8 w-96">
                    <h2 className="text-xl font-bold mt-8 text-primary text-center">Please RSVP for your group here</h2>
                    <button className="bg-primary text-white rounded-md p-2 mt-2 w-full">RSVP for Group</button>
                    <h2 className="text-xl font-bold mt-8 text-primary text-center">Or RSVP For yourself Here</h2>
                    <button className="bg-primary text-white rounded-md p-2 mt-2 w-full">RSVP for just you</button>
                </div>
            </div>
        )
    }


    return (
        <>
            <h1 className="text-3xl font-bold mt-8 text-primary w-full text-center">Hello {data.guest.fullname}!</h1>
        </>
    );
}

export async function getStaticProps(
    context: GetStaticPropsContext<{ fullName: string }>,
) {
    const ssg = generateSSGHelper();
    console.log("context params");
    console.log(context.params?.fullName);

    const guestName = context.params?.fullName as string;
    console.log(guestName);

    await ssg.wedding.getGuestByGuestName.prefetch({ fullName: guestName });

    return {
        props: {
            trpcState: ssg.dehydrate(),
            guestName,
        },
    };
}



export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};


export default RSVPGuestOrGroup;
