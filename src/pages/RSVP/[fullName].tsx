import { GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import type { RouterOutputs } from "~/utils/api";
import { useState } from "react";
import { Controller, useFieldArray, useForm, type SubmitHandler } from "react-hook-form";


type RSVPUserType = RouterOutputs["wedding"]["getGuestByGuestName"];
const RSVPGuestOrGroup = (
    props: InferGetServerSidePropsType<typeof getStaticProps>,
) => {
    const [rsvpSelection, setRsvpSelection] = useState("")
    const { data, isLoading } = api.wedding.getGuestByGuestName.useQuery({ fullName: props.guestName });
    if (isLoading) {
        return <LoadingPage />;
    }
    if (data?.guest.groupId != null) {
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
                        <div className="flex flex-col items-center mt-8">
                            <RSVPGroup groupId={data.guest.groupId} submitter={data.guest.fullname} />
                            <button onClick={() => setRsvpSelection("")} className="bg-primary text-white rounded-md p-2 mt-2 w-96">Back</button>
                        </div>
                    </>
                )}
                {rsvpSelection == "guest" && (
                    <>
                        <div className="flex flex-col items-center mt-8">
                            <RSVPUser {...data} />
                            <button onClick={() => setRsvpSelection("")} className="bg-primary text-white rounded-md p-2 mt-2  w-96">Back</button>
                        </div>
                    </>
                )}
            </div>
        )
    }
    return (
        <>
            <h1 className="text-3xl font-bold mt-8 text-primary w-full text-center">Hello {data?.guest.fullname}!</h1>
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

const RSVPThanks: NextPage<{ fullname: string, isGroup: boolean, group: string[] }> = ({ fullname, isGroup }) => {
    return (
        <div className="flex flex-col items-center pt-6 pb-6">
            {isGroup ? (
                <h2>{fullname} thank you for Submitting a RSVP for you group!</h2>
            ) :
                (
                    <h2>{fullname} thank you for Submitting a RSVP!</h2>
                )
            }
        </div>
    )
}

type FormValues = {
    group: {
        fullname: string,
        mealselection: string,
        songpreference: string,
        response: string,
        guestId: number,
    }[]
}

type FormValuesGuest = {
    guest: {
        fullname: string,
        mealselection: string,
        songpreference: string,
        response: string,
        guestId: number,
    }
}
const RSVPGroup: NextPage<{ groupId: number, submitter: string }> = ({ groupId, submitter }) => {
    const { data, isLoading } = api.wedding.getGroupByGroupId.useQuery({ groupId: groupId });

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!data) return <div>404</div>;
    const guests: FormValues = {
        group: data.group.map((group) => ({
            fullname: group.fullname,
            mealselection: '',
            songpreference: '',
            response: 'Accept',
            guestId: group.id,
        })),
    };

    return (
        <>
            {!isLoading && (
                <RSVPGroupForm formValues={guests} submitter={submitter} />
            )}
        </>
    )
}

const RSVPGroupForm: NextPage<{ formValues: FormValues, submitter: string }> = ({ formValues, submitter }) => {
    const { mutate, isLoading: isPosting } = api.wedding.postRSVP.useMutation({
        onSuccess: () => {
            //void ctx.posts.getAll.invalidate();
            setShowThanks(true)
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                //toast.error(errorMessage[0]);
            } else {
                //toast.error("Failed to post! Please try again later.");
            }
        },
    });
    const { register, control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            group: formValues.group
        }
    });
    const { fields } = useFieldArray<FormValues>({
        control,
        name: "group",
        keyName: "id"

    });
    const options = [
        { value: 'Accept', label: 'Accept' },
        { value: 'Decline', label: 'Decline' }
    ];

    const [showThanks, setShowThanks] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        console.log(formData);
        mutate({ group: formData.group });
    };

    if (showThanks) {
        return (
            <RSVPThanks fullname={submitter} isGroup={true} group={['']} />
        )
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mt-8 pb-10 text-primary">RSVP Page</h1>
                <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    {fields.map((item, index) => (
                        <div className="mb-4" key={item.id}>
                            <div className="flex gap-8 column-3">
                                <div>
                                    <label htmlFor={`fullname${index}`} className="text-gray-700 text-sm font-bold mb-2"> Guest Name</label>
                                    <input id={`fullname${index}`} {...register(`group.${index}.fullname`)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div>
                                    <label htmlFor={`songpreference${index}`} className="text-gray-700 text-sm font-bold mb-2"> Song Request</label>
                                    <input id={`songpreference${index}`} {...register(`group.${index}.songpreference`)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                                <div>
                                    <label htmlFor={`response${index}`} className="text-gray-700 text-sm font-bold mb-2">Response</label>
                                    <Controller
                                        name={`group.${index}.response`}
                                        control={control}
                                        render={({ field }) => (
                                            <select {...field} className="form-select cstm-form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-transparent focus:border-[#E5E7EB] focus:ring-0">
                                                {options.map((option, idx) => (
                                                    <option key={`${option.value}${index}${idx}`} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex flex-col items-center w-full pt-6">
                        <input className="bg-secondary cursor-pointer text-white py-2 px-4 rounded w-96" type="submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

const RSVPUser = (props: RSVPUserType) => {
    const guest: FormValuesGuest = {
        guest: {
            fullname: props.guest.fullname,
            mealselection: '',
            songpreference: '',
            response: 'Accept',
            guestId: props.guest.id,
        },
    };
    return (
        <RSVPGuestForm guestValues={guest} />
    )
}

const RSVPGuestForm: NextPage<{ guestValues: FormValuesGuest }> = ({ guestValues }) => {

    const { mutate, isLoading: isPosting } = api.wedding.postRSVP.useMutation({
        onSuccess: () => {
            //void ctx.posts.getAll.invalidate();
            setShowThanks(true)
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                //toast.error(errorMessage[0]);
            } else {
                //toast.error("Failed to post! Please try again later.");
            }
        },
    });

    const { register, control, handleSubmit } = useForm<FormValuesGuest>({
        defaultValues: {
            guest: guestValues.guest
        }
    });
    const options = [
        { value: 'Accept', label: 'Accept' },
        { value: 'Decline', label: 'Decline' }
    ];

    const [showThanks, setShowThanks] = useState(true);

    const onSubmit: SubmitHandler<FormValuesGuest> = (formData) => {
        console.log(formData);
        mutate({ group: [formData.guest] });
    };

    if (showThanks) {
        return (
            <RSVPThanks fullname={guestValues.guest.fullname} isGroup={false} group={['']} />
        )
    }
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mt-8 text-primary pb-10">RSVP {guestValues.guest.fullname}</h1>
                <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <div className="mb-4">
                        <div className="flex gap-8 column-3">
                            <div>
                                <label htmlFor={`fullname`} className="text-gray-700 text-sm font-bold mb-2"> Guest Name</label>
                                <input id={`fullname`} {...register(`guest.fullname`)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div>
                                <label htmlFor={`guest.songpreference`} className="text-gray-700 text-sm font-bold mb-2"> Song Request</label>
                                <input id={`guest.songpreference`} {...register(`guest.songpreference`)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div>
                                <label htmlFor={`guest.response`} className="text-gray-700 text-sm font-bold mb-2">Response</label>
                                <Controller
                                    name={`guest.response`}
                                    control={control}
                                    render={({ field }) => (
                                        <select {...field} className="form-select cstm-form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-transparent focus:border-[#E5E7EB] focus:ring-0">
                                            {options.map((option, idx) => (
                                                <option key={`${option.value}${idx}`} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full pt-6">
                        <input className="bg-secondary cursor-pointer text-white py-2 px-4 rounded w-96" type="submit" />
                    </div>
                </form>
            </div>
        </>
    )
}
export default RSVPGuestOrGroup;
