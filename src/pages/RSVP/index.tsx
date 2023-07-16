import { api } from "~/utils/api";
import { type NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingPage } from "~/components/loading";
import { useState } from "react";

type Inputs = {
  fullName: string
}

const RSVP: NextPage = () => {

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()
  
    const { data, isLoading } = api.wedding.getAllGuests.useQuery();
    const [noMatch, setNoMatch] = useState(false); 
    const onSubmit: SubmitHandler<Inputs> = (formData) => {

    if(!data?.guests.includes(formData.fullName.toLowerCase().trim())){
       setNoMatch(true); 
    }
    else{
       setNoMatch(false); 
    }
    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-8 text-primary">RSVP</h1>
            <div className="flex flex-col items-center mt-8 w-96">
            {isLoading && (
                <LoadingPage />
            )}
            {!isLoading && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="fullname" className="text-xl font-bold text-primary">Find Your RSVP</label>
                    <input id="fullname" className="border-2 border-primary rounded-md p-2 mt-2 w-full" type="text" placeholder="Full Name"
                        {...register("fullName", { required: true })}
                    />
                    <input type="submit" className="bg-primary text-white rounded-md p-2 mt-2 w-full"/>
                </form>
            )}
            {noMatch && (
                <div className="flex flex-col items-center">Sorry, we can&lsquo;t find your name in our guest list. Please try again.</div>
            )}
            </div>
        </div>
    )
}

export default RSVP;
