import Working from "~/components/working";

export default function ThingsToDo() {
    const isUpdating = process.env.NEXT_PUBLIC_IS_UPDATING;
    if (isUpdating) {
        return <Working />
    }
    return (
        <div>
            <h1>Things To Do</h1>
        </div>
    )   
}
