
import React, { useState, ChangeEvent, useMemo, useEffect } from 'react';
import { api } from "~/utils/api";
import GuestTable from '~/components/GuestsTable';
import RsvpTable from '~/components/RsvpTable';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"

const RSVPList: React.FC = () => {
    const { data: allRsvps, isLoading } = api.wedding.getAllRsvps.useQuery();

    const exampleData = 68;

    return (
        <div>
            <div className="container mx-auto pb-10 pt-12">
                <div className="flex flex-wrap justify-around">
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Confirmed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>76</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 p-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Denied</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>62</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <div className="container mx-auto pb-20 pt-12">
                {allRsvps && <RsvpTable allRsvps={allRsvps.rsvpData} />}
            </div>
        </div>
    );
};

export default RSVPList;

