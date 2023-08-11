import Test from "~/components/TestComponent";
import Working from "~/components/working";

export default function Events() {
    const isUpdating = process.env.NEXT_PUBLIC_IS_UPDATING;
    if (isUpdating) {
        return <Working />
    }
    return (
        <div className="flex flex-col items-center">
            <div className="w-2/3">
                <Test title={"Events"} />
            </div>
        </div>
    )
}
