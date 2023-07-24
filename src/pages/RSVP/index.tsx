import { api } from "~/utils/api";
import { type NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoadingPage } from "~/components/loading";
import { useState } from "react";
import Router from "next/router";

type Inputs = {
    fullName: string;
};

const RSVPGuestSearch: NextPage<{ guestName: string }> = ({ guestName }) => {
    const { data, isLoading } = api.wedding.getGuestByGuestName.useQuery({
        fullName: guestName,
    });

    if (data) void Router.push(`/RSVP/${guestName}`);

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
    const { register, handleSubmit } = useForm<Inputs>();

    const [guestName, setUserName] = useState("");
    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        setUserName(formData.fullName);
    };
    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-8 text-3xl font-bold text-primary">RSVP</h1>
            <div className="mt-8 flex w-96 flex-col items-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="fullname" className="text-xl font-bold text-primary">
                        Find Your RSVP
                    </label>
                    <input
                        id="fullname"
                        className="mt-2 w-full rounded-md border-2 border-primary p-2"
                        type="text"
                        placeholder="Full Name"
                        {...register("fullName", { required: true })}
                    />
                    <input
                        type="submit"
                        className="mt-2 w-full rounded-md bg-primary p-2 text-white"
                    />
                </form>
                {guestName && <RSVPGuestSearch guestName={guestName} />}
            </div>
        </div>
    );
};

export default RSVP;
