import React, { useState, ChangeEvent, useMemo, useEffect } from 'react';
import { api } from "~/utils/api";
import GuestTable from '~/components/GuestsTable';


const UploadExcel: React.FC = () => {
    const { data: allGuestsData, isLoading } = api.wedding.getAllGuests.useQuery();

    return (
        <div>
            <div className="container">
                {allGuestsData && <GuestTable allGuests={allGuestsData.guestData} />}
            </div>
        </div>
    );
};

export default UploadExcel;

