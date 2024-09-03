import { api } from "~/utils/api";
import { type NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoadingPage } from "~/components/loading";
import { useState } from "react";
import Router from "next/router";
/* import Working from "~/components/working"; */

type Inputs = {
    fullName: string;
};

const RSVPGuestSearch: NextPage<{ guestName: string }> = ({ guestName }) => {
    const { data, isLoading } = api.wedding.getGuestByGuestName.useQuery({
        fullName: guestName,
    });

    if (data !== undefined && data?.guest.RSVP !== null) {
        void Router.push(`/RSVP/update/${guestName}`);
    } else if (data) {
        void Router.push(`/RSVP/${guestName}`);
    }


    return (
        <>
            {isLoading && <LoadingPage />}
            {!isLoading && !data && <div className="flex flex-col items-center">
                Sorry, we can&lsquo;t find your name in our guest list. Please try
                again.
            </div>}
        </>
    );
};

const RSVP: NextPage = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-8 text-3xl font-bold text-primary">RSVP</h1>
            <div className="pt-20 flex-col items-center">
                <h4 className="text-xl font-bold text-primary">Sorry, we are no longer accepting RSVP&apos;s</h4>
            </div>
        </div>
    );
};

export default RSVP;
