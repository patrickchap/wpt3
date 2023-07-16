import type { NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";

const RSVPGuest: NextPage<{ fullName: string }> = ({ fullName }) => {

    const { data, isLoading } = api.wedding.getGuestByGuestName.useQuery({fullName});

    if (!data) return <div>404</div>;

    return (
        <>
            {isLoading && (
                <LoadingPage />
            )}
            <h1>RSVP Page</h1>
            <div>{ fullName }</div>
        </>
    );
};

export default RSVPGuest; 


