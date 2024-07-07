import { GetStaticPropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Controller, type SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

const mealOptions = [
    { value: 'LEMON ROSEMARY CHICKEN - Roasted fingerlings, asparagus, romesco', label: 'LEMON ROSEMARY CHICKEN - white gold mac and cheese, asparagus, romesco' },
    { value: '6 oz FILET MIGNON - Yukon gold puree, broccolini, cipollini onions, Napa cabernet reduction', label: '6 oz FILET MIGNON - white cheddar and rosemary mashed potatoes, broccolini, cipollini onions, napa cabernet reduction' },
    { value: 'WILD MUSHROOM RISOTTO CAKE - English peas, crispy shallots, shitakes, italian salsa verde', label: 'WILD MUSHROOM RISOTTO CAKE - English peas, crispy shallots, shitakes, italian salsa verde' },
];
const mealMap = new Map<string, string>();
mealOptions.forEach(meal => mealMap.set(meal.value, meal.label));

function getMealLabel(meal: string): string {
    if (mealMap.has(meal)) {
        return mealMap.get(meal) as string;
    }
    return meal;
}


type Guest = {
    fullname: string;
    mealselection: string;
    songpreference: string;
    notes: string;
    response: string;
    guestId: number;
};

type RSVPUserAndGroup = RouterOutputs["wedding"]["getGuestAndGroupByGuestName"];
const RSVPGuestOrGroup = (
    props: InferGetServerSidePropsType<typeof getStaticProps>,
) => {
    const searchParams = useSearchParams();
    const { data, isLoading } = api.wedding.getGuestAndGroupByGuestName.useQuery({ fullName: props.guestName });
    const stepFromUrl = parseInt(searchParams.get("step") || "0", 10);
    const group = data?.guest.group?.guests.filter(g => g.RSVP != null);

    const guests = useMemo<RSVPS>(() => {
        const group = data?.guest.group?.guests.filter(g => g.RSVP != null);
        if (group) {
            return {
                group: group.map((group) => ({
                    id: -1,
                    fullname: group.fullname,
                    mealselection: group.RSVP?.mealselection || "",
                    songpreference: group.RSVP?.songpreference || "",
                    notes: group.RSVP?.notes || "",
                    response: group.RSVP?.responce === true ? "Accept" : "Decline",
                    guestId: -1,
                })),
            };
        }
        return { group: [] };
    }, [data]);


    const [guest, setGuest] = useState(guests);
    useEffect(() => {
        if (JSON.stringify(guest) !== JSON.stringify(guests)) {
            setGuest(guests);
        }
    }, [guests, guest]);
    const [step, setStep] = useState(stepFromUrl);
    useEffect(() => {
        if (stepFromUrl !== step) {
            setStep(stepFromUrl);
        }
    }, [stepFromUrl, step]);

    //const [dataGroup, setDataGroup] = useState<RSVPS | undefined>(guests);
    if (isLoading) {
        return <LoadingPage />;
    }
    if (data?.guest.groupId != null) {
        return (
            <div className="flex flex-col items-center">
                {data.guest.RSVP === null && step === 0 && (
                    <>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                            <div className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300 w-1/3" />
                        </div>
                        <div className="flex flex-col items-center mt-8">
                            <RSVPGroup setGuest={setGuest} setStep={setStep} data={data} submitter={data.guest.fullname} />
                        </div>
                    </>
                )}
                {guest.group.length > 0 && step === 1 && (
                    <RSVPStepOne rsvps={guest} />
                )}
                {step === 2 && (
                    <RSVPPStepTwo />
                )}
            </div>
        )
    }
    if (!data) {
        return (
            <div />
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

type RSVPS = {
    group: {
        id?: number,
        fullname: string,
        mealselection: string,
        songpreference: string,
        notes: string,
        response: string,
        guestId: number,
    }[],
}
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
}

type RSVPStepOneFormValues = {
    email: string,
    receiveEmailConfirmation: boolean,
}

const RSVPStepOne: React.FC<{ rsvps: RSVPS | undefined }> = ({ rsvps }) => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const { mutate, isLoading: isPosting } = api.wedding.postRSVPConfirmation.useMutation({
        onSuccess: (data, varialbes) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set('step', '2');
            router.replace(`${pathname}?${params.toString()}`);
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


    const onSubmit: SubmitHandler<RSVPStepOneFormValues> = (formData) => {
        if (formData.receiveEmailConfirmation) {
            //send email
            if (rsvps) {
                const emailRsvps: Guest[] = rsvps.group.map((group) => ({
                    fullname: group.fullname,
                    mealselection: getMealLabel(group.mealselection),
                    songpreference: group.songpreference,
                    notes: group.notes,
                    response: group.response,
                    guestId: -1,
                }));
                mutate({ email: formData.email, group: emailRsvps });
            }

        }
        else {

            const params = new URLSearchParams(searchParams.toString());
            params.set('step', '2');
            router.replace(`${pathname}?${params.toString()}`);
        }
    };
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RSVPStepOneFormValues>();
    const receiveEmailConfirmation = watch('receiveEmailConfirmation');

    return (
        <>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300 w-2/3" />
            </div>
            <div className="flex flex-col items-center mt-8 w-5/6">
                <h1 className="text-3xl font-bold mt-8 pb-10 text-primary">Thank You For Submitting your RSVP!</h1>
                <h2 className="text-2xl font-bold mt-8 pb-10 text-primary">Please review your RSVP below:</h2>
                {rsvps?.group.map((group) => (
                    <div className="flex flex-col items-left w-5/6" key={group.fullname + "_1"}>
                        <h3 className="text-lg font-bold pb-2">{group.fullname}</h3>
                        <p className="flex-wrap"><strong className="font-extrabold">Meal</strong>: {getMealLabel(group.mealselection)}</p>
                        <p><strong className="text-secondary font-extrabold">Song Request</strong>: {group.songpreference}</p>
                        <p><strong>Food Alergies</strong>: {group.notes}</p>
                        <p><strong>Response</strong>: {group.response}</p>
                        <div className="border-b-2 mt-8 w-full" />
                    </div>
                ))}
                <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <div className="flex items-center me-4 pt-6">
                        <input {...register("receiveEmailConfirmation")} id="email-checkbox" type="checkbox" value="" className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded focus:ring-secondary focus:ring-2" />
                        <label htmlFor="red-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recieve Email Confirmation?</label>

                    </div>
                    <div className="">
                        <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input           {...register("email", {
                            required: receiveEmailConfirmation ? "Email is required if you want to receive email confirmation" : false,
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Entered value does not match email format"
                            }
                        })} id="email" type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}

                    <div className="flex flex-col items-center w-full pt-6 pb-6">
                        <div className="border-b-2 mt-8 w-full" />
                        <input className="bg-secondary cursor-pointer text-white py-2 px-4 rounded w-96" type="submit" />
                    </div>

                </form>
            </div>
        </>
    )
}
//thank you page/step
const RSVPPStepTwo: React.FC = () => {
    return (
        <div className="flex flex-col items-center mt-8 w-3/4">
            <h1 className="text-3xl font-bold mt-8 pb-10 text-primary">Thank You For Submitting your RSVP!</h1>
            <h2 className="text-xl font-bold mt-8 pb-10 text-primary">If you need to make any changes to your RSVP, you can do so by clicking the link below and entering your name.</h2>
            <Link href="/RSVP" className="text-secondary font-bold">Edit RSVP</Link>

        </div>
    )
}

const RSVPGroup: React.FC<{ data: RSVPUserAndGroup, submitter: string, setStep: React.Dispatch<React.SetStateAction<number>>, setGuest: React.Dispatch<React.SetStateAction<RSVPS>> }> = ({ data, submitter, setStep, setGuest }) => {
    const group = data.guest.group?.guests.filter(g => g.RSVP == null);

    if (!group) return <div>404</div>;
    const guests: FormValues = {
        group: group.map((group) => ({
            id: -1,
            fullname: group.fullname,
            mealselection: 'LEMON ROSEMARY CHICKEN - Roasted fingerlings, asparagus, romesco',
            songpreference: '',
            notes: '',
            response: 'Accept',
            guestId: group.id,
        })),
    };

    return (
        <>
            <RSVPGroupForm formValues={guests} submitter={submitter} setStep={setStep} setGuest={setGuest} />
        </>
    )
}

const RSVPGroupForm: React.FC<{ formValues: FormValues, submitter: string, setStep?: React.Dispatch<React.SetStateAction<number>>, setGuest: React.Dispatch<React.SetStateAction<RSVPS>> }> = ({ formValues, submitter, setStep, setGuest }) => {
    const searchParams = useSearchParams();

    const pathname = usePathname();
    const router = useRouter();
    const ctx = api.useContext();
    const { mutate, isLoading: isPosting } = api.wedding.postRSVP.useMutation({
        onSuccess: (data, varialbes) => {
            void ctx.wedding.getGuestAndGroupByGuestName.invalidate({ fullName: submitter });
            const dataGroup: RSVPS = {
                group: varialbes.group.map((group) => ({
                    fullname: group.fullname,
                    mealselection: group.mealselection,
                    songpreference: group.songpreference,
                    notes: group.notes,
                    response: group.response,
                    guestId: group.guestId,
                })),
            };
            setGuest(dataGroup);
            if (setStep) {
                const params = new URLSearchParams(searchParams.toString());
                params.set('step', '1');
                router.replace(`${pathname}?${params.toString()}`);
            }
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


    const onSubmit: SubmitHandler<FormValues> = (formData) => {
        mutate({ group: formData.group });
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
                <h1 className="text-3xl font-bold mt-8 pb-10 text-primary">RSVP</h1>

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
