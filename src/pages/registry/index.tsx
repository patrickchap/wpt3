import Working from "~/components/working";

export default function Registry() {
    const isUpdating = process.env.NEXT_PUBLIC_IS_UPDATING;
    if (isUpdating) {
        return <Working />
    }
    return (
        <div>
            <h1>Registry</h1>
        </div>
    )
}
