import type { GetServerSidePropsContext, GetStaticProps, GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

    export default function RSVPGuest(
    props: InferGetServerSidePropsType<typeof getStaticProps>,
    ){

        console.log(props.guestName);
        const { data, isLoading } = api.wedding.getGuestByGuestName.useQuery({fullName: props.guestName});

        if (!data) return <div>404</div>;

        return (
            <>
                {isLoading && (
                    <LoadingPage />
                )}
                <h1>RSVP Page</h1>
                <div>{ props.guestName }</div>
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
        
          await ssg.wedding.getGuestByGuestName.prefetch({fullName: guestName});

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
