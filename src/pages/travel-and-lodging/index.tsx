import Working from "~/components/working";

export default function TravelAndLodging() {
    const isUpdating = process.env.NEXT_PUBLIC_IS_UPDATING;
    if (isUpdating) {
        return <Working />
    }
    return (
        <div>
            <h1>Travel and Lodging</h1>
        </div>
    )
}
