
import * as React from 'react';

interface EmailTemplateProps {
    rsvps: Guest[];
}

type Guest = {
    fullname: string;
    mealselection: string;
    songpreference: string;
    notes: string;
    response: string;
    guestId: number;
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    rsvps,
}) => (
    <>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-gray-600 h-2.5 rounded-full dark:bg-gray-300 w-2/3" />
        </div>
        <div className="flex flex-col items-center mt-8">
            <h1>Thank You For Submitting your RSVP!</h1>
            <h2>Please review your RSVP below:</h2>
            {rsvps.map((group) => (
                <div className="flex flex-col items-left w-5/6" key={group.fullname}>
                    <h3>{group.fullname}</h3>
                    <p><strong>Meal</strong>: {group.mealselection}</p>
                    <p><strong>Song Request</strong>: {group.songpreference}</p>
                    <p><strong>Food Alergies</strong>: {group.notes}</p>
                    <p><strong>Response</strong>: {group.response}</p>
                    <div />
                    <hr />
                </div>

            ))}
        </div>
    </>
);
