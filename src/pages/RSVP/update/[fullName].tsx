
import { GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import { Controller, type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api, type RouterOutputs } from "~/utils/api";


type RSVPUserAndGroup = RouterOutputs["wedding"]["getGuestAndGroupByGuestName"];
const RSVPGuestOrGroup = (
    props: InferGetServerSidePropsType<typeof getStaticProps>,
) => {
    const { data, isLoading } = api.wedding.getGuestAndGroupByGuestName.useQuery({ fullName: props.guestName });
    const [step, setStep] = useState(0);
    if (isLoading) {
        return <LoadingPage />;
    }
    console.log("data", data);
    if (data?.guest.groupId != null) {
        return (
            <div className="flex flex-col items-center">
                {data.guest.RSVP !== null && (
                    <>
                        <div className="flex flex-col items-center mt-8">
                            <UpdateRSVPGroup data={data} submitter={data.guest.fullname} />
                        </div>
                    </>
                )}
            </div>
        )
    }
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

type FormValues = {
    group: {
        id: number,
        fullname: string,
        mealselection: string,
        songpreference: string,
        notes: string,
        response: string,
        guestId: number,
    }[],
    /* doNotify: boolean,
    email: string, */

}

const UpdateRSVPGroup: React.FC<{ data: RSVPUserAndGroup, submitter: string }> = ({ data, submitter }) => {
    const group = data.guest.group?.guests.filter(g => g.RSVP != null);

    if (!group) return <div>404</div>;
    const guests: FormValues = {
        group: group.map((guest) => ({
            id: guest.RSVP?.id === undefined ? -1 : guest.RSVP?.id,
            fullname: guest.fullname,
            mealselection: (guest.RSVP?.mealselection === '' || guest.RSVP?.mealselection === undefined)
                ? 'LEMON ROSEMARY CHICKEN - Roasted fingerlings, asparagus, romesco'
                : guest.RSVP?.mealselection,
            songpreference: guest.RSVP?.songpreference == null ? '' : guest.RSVP?.songpreference,
            notes: guest.RSVP?.notes == null ? '' : guest.RSVP?.notes,
            response: guest.RSVP?.responce === true ? "Accept" : "Decline",
            guestId: guest.id
        })),
        /* doNotify: false,
        email: '', */
    };

    return (
        <>
            <RSVPGroupForm formValues={guests} />
        </>
    )
}


const RSVPGroupForm: React.FC<{ formValues: FormValues }> = ({ formValues }) => {
    const { mutate: update, isLoading: isUpdating } = api.wedding.updateRSVP.useMutation({
        onSuccess: () => {
            //void ctx.posts.getAll.invalidate();
            //setShowThanks(true)
            //console.log("update success");
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage?.[0]) {
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

    const initialResponseState: string[] = [];
    if (formValues !== undefined && formValues.group !== undefined) {
        for (let i = 0; i < formValues.group.length; i++) {
            const groupItem = formValues.group[i];
            if (groupItem !== undefined && groupItem.response !== undefined) {
                initialResponseState.push(groupItem.response);
            }
        }
    }
    const [responses, setResponses] = useState<string[]>(initialResponseState);

    const { fields } = useFieldArray<FormValues>({
        control,
        name: "group",
        keyName: "id"

    });
    const options = [
        { value: 'Accept', label: 'Accept' },
        { value: 'Decline', label: 'Decline' }
    ];
    const mealOptions = [
        { value: 'LEMON ROSEMARY CHICKEN - Roasted fingerlings, asparagus, romesco', label: 'LEMON ROSEMARY CHICKEN -Roasted fingerlings, asparagus, romesco' },
        { value: '6 oz FILET MIGNON - Yukon gold puree, broccolini, cipollini onions, Napa cabernet reduction', label: '6 oz FILET MIGNON - Yukon gold puree, broccolini, cipollini onions, Napa cabernet reduction' },
        { value: 'WILD MUSHROOM RISOTTO CAKE - English peas, crispy shallots, shitakes, italian salsa verde', label: 'WILD MUSHROOM RISOTTO CAKE English peas, crispy shallots, shitakes, italian salsa verde' },
    ];

    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        update({ group: formData.group });
    };

    const handleResponseChange = (index: number, value: string) => {
        setResponses(prevResponses => {
            const updatedResponses = [...prevResponses];
            updatedResponses[index] = value;
            return updatedResponses;
        });
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mt-8 pb-10 text-primary">Update RSVP</h1>

                <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit(data => onSubmit(data))}>
                    {fields.map((item, index) => (
                        <div className="mb-8 w-5/6 items-center justify-center" key={item.id}>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-3">
                                    <h4 className="text-lg font-bold">{item.fullname}</h4>
                                </div>
                                <div className="md:col-span-3 col-span-3">
                                    <label htmlFor={`response${index}`} className="text-gray-700 text-sm font-bold mb-2">Response</label>
                                    <Controller
                                        name={`group.${index}.response`}
                                        control={control}
                                        render={({ field }) => (
                                            <select {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleResponseChange(index, e.target.value);
                                                }}
                                                className="form-select cstm-form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-transparent focus:border-[#E5E7EB] focus:ring-0">
                                                {options.map((option, idx) => (
                                                    <option key={`${option.value}${index}${idx}`} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                                {responses[index] === 'Accept' && (
                                    <>

                                        <div className="md:col-span-3 col-span-3">
                                            <label htmlFor={`songpreference${index}`} className="text-gray-700 text-sm font-bold mb-2"> Song Request</label>
                                            <input id={`songpreference${index}`} {...register(`group.${index}.songpreference`)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                        <div className="md:col-span-3 col-span-3">
                                            <label htmlFor={`notes${index}`} className="text-gray-700 text-sm font-bold mb-2">Do You Have Any Food Allergies?</label>
                                            <input id={`notes$${index}`} {...register(`group.${index}.notes`)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        </div>
                                        <div className="md:col-span-3 col-span-3">
                                            <label htmlFor={`mealselection${index}`} className="text-gray-700 text-sm font-bold mb-2">Meal</label>
                                            <Controller
                                                name={`group.${index}.mealselection`}
                                                control={control}
                                                render={({ field }) => (
                                                    <select {...field} className="form-select cstm-form-select shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:ring-transparent focus:border-[#E5E7EB] focus:ring-0 truncate">
                                                        {mealOptions.map((option, idx) => (
                                                            <option key={`${option.value}${index}${idx}`} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="border-b-2 mt-8 w-full" />
                        </div>
                    ))}
                    <div className="flex flex-col items-center w-full pt-6 pb-6">
                        <input className="bg-secondary cursor-pointer text-white py-2 px-4 rounded w-96" type="submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default RSVPGuestOrGroup;
