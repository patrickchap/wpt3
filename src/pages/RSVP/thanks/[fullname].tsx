
import { useRouter } from 'next/router'
const RSVPThankYou = () => {
    const router = useRouter();
    return (
        <RSVPThanks fullname={router.query.fullname?.toString()} />
    )
};

const RSVPThanks: React.FC<{ fullname: string | undefined }> = ({ fullname }) => {
    return (
        <div className="flex flex-col items-center pt-6 pb-6">
            <h2>{fullname} Thank you for Submitting a RSVP!</h2>
        </div>
    )
};
export default RSVPThankYou;
