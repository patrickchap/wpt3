import { api } from "~/utils/api";
import { useState } from "react";
import { type NextPage } from "next";
import { LoadingPage } from "../../components/loading";

type UserInformation = {
    fullName: string;
    clearParentState: () => void;
}

export const RSVPUserOrGroup = (props: UserInformation) => { 
    const handleClearState = () => {
        props.clearParentState();
    };

    const {data, isLoading: postsLoading} = api.wedding.getGuestByGuestName.useQuery({fullName: props.fullName});
    if (postsLoading)
        return (
          <div className="flex grow">
            <LoadingPage />
          </div>
        );

    if (!data) {

        return(
            <>
                <div className="flex flex-col items-center">Sorry, we can&lsquo;t find your name in our guest list. Please try again.</div>
                <button onClick={() => handleClearState()} className="bg-primary text-white rounded-md p-2 mt-2 w-full">Try Again!</button>
            </>
        )
    }

    if(data.group){
        return(
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
    else{
    }
}


const RSVP: NextPage = () => {

    const [input, setInput] = useState("");
    const [userOrGroup, setUserOrGroup] = useState("");


    const clearParentState = () => {
        setInput('');
        setUserOrGroup('');
    };


    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-8 text-primary">RSVP</h1>
            {userOrGroup =="" && (
            <div className="flex flex-col items-center mt-8 w-96">
                <label htmlFor="fullname" className="text-xl font-bold text-primary">Find Your RSVP</label>
                <input id="fullname" className="border-2 border-primary rounded-md p-2 mt-2 w-full" type="text" placeholder="Full Name"
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => { if (e.key === "Enter") {
                        e.preventDefault();
                        if (input !== "") {
                            setUserOrGroup(input);
                        }
                      }
                    }}
                />
                <button onClick={() => setUserOrGroup(input)} className="bg-primary text-white rounded-md p-2 mt-2 w-full">Find RSVP</button>
            </div>
        
            )}

            {userOrGroup && (
                <div className="w-full">
                    <RSVPUserOrGroup fullName={input} clearParentState={clearParentState}/>
                </div>
            )}
        </div>
    )
}

export default RSVP;
