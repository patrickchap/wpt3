import type { GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import type { RouterOutputs } from "~/utils/api";
import { useState } from "react";

const RSVPGuestOrGroup = (
    props: InferGetServerSidePropsType<typeof getStaticProps>,
) => {
    const [rsvpSelection, setRsvpSelection] = useState("")
    const { data, isLoading } = api.wedding.getGuestByGuestName.useQuery({ fullName: props.guestName });
    if (isLoading) {
        return <LoadingPage />;
    }
    if (!data) return <div>404</div>;
    if (data.guest.groupId != null) {
        return (
            <div className="flex flex-col items-center">
                {rsvpSelection == "" && (
                    <>
                        <h1 className="text-3xl font-bold mt-8 text-primary w-full text-center">Hello {data.guest.fullname}!</h1>
                        <div className="flex flex-col items-center mt-8 w-96">
                            <h2 className="text-xl font-bold mt-8 text-primary text-center">Please RSVP for your group here</h2>
                            <button onClick={() => setRsvpSelection("group")} className="bg-primary text-white rounded-md p-2 mt-2 w-full">RSVP for Group</button>
                            <h2 className="text-xl font-bold mt-8 text-primary text-center">Or RSVP For yourself Here</h2>
                            <button onClick={() => setRsvpSelection("guest")} className="bg-primary text-white rounded-md p-2 mt-2 w-full">RSVP for just you</button>
                        </div>
                    </>
                )}
                {rsvpSelection == "group" && (
                    <>
                        <div className="flex flex-col items-center mt-8 w-96">
                            <RSVPGroup groupId={data.guest.groupId} />
                            <button onClick={() => setRsvpSelection("")} className="bg-primary text-white rounded-md p-2 mt-2 w-full">Back</button>
                        </div>
                    </>
                )}
                {rsvpSelection == "guest" && (
                    <>
                        <div className="flex flex-col items-center mt-8 w-96">
                            <RSVPUser {...data} />
                            <h1>RSVP for {data.guest.fullname}</h1>
                            <button onClick={() => setRsvpSelection("")} className="bg-primary text-white rounded-md p-2 mt-2 w-full">Back</button>
                        </div>
                    </>
                )}
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
    const guestName = context.params?.fullName as string;
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
const RSVPGroup: NextPage<{groupId: number}> = ({groupId}) => {
    return (
        <>
        <div>{groupId}</div>
        <div>Group</div>
        </>
    )
}

type RSVPUserType = RouterOutputs["wedding"]["getGuestByGuestName"];
const RSVPUser = (props: RSVPUserType) => {
    return (
        <div>Guest</div>
    )
}

export default RSVPGuestOrGroup;
