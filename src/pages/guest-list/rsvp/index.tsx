
import React, { useState, ChangeEvent, useMemo, useEffect } from 'react';
import { api } from "~/utils/api";
import GuestTable from '~/components/GuestsTable';
import RsvpTable from '~/components/RsvpTable';


const RSVPList: React.FC = () => {
    const { data: allRsvps, isLoading } = api.wedding.getAllRsvps.useQuery();

    return (
        <div>
            <div className="container">
                {allRsvps && <RsvpTable allRsvps={allRsvps.rsvpData} />}
            </div>
        </div>
    );
};

export default RSVPList;

