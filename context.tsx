import { PropsWithChildren, createContext, useContext, useState } from "react";

type ShowBtns = {
    rsvpBack: boolean,
}

type ShowBtnsContextType = {
    rsvpBack: ShowBtns,
    setRsvpBack: React.Dispatch<React.SetStateAction<ShowBtns>>;
}
const ShowBtnsContext = createContext<ShowBtnsContextType>({} as ShowBtnsContextType);

export function RSVPBtnProvider(props: PropsWithChildren) {
    const [rsvpBack, setRsvpBack] = useState<ShowBtns>({ rsvpBack: true });
    return (
        <ShowBtnsContext.Provider value={{rsvpBack, setRsvpBack}}>{props.children}</ShowBtnsContext.Provider>
    );
}

export function useBtnContext() {
  return useContext(ShowBtnsContext);
}
