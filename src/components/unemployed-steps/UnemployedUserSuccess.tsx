'use client';

import { useRouter } from "next/navigation";


export default function UnemployedUserSuccess() {
    const router = useRouter();

    const handleFinish = () => {
        router.push("/");
    };

    return(
        <div className="flex flex-col">

            <div>Success Message</div>

            <button
                onClick={handleFinish}
                className="mt-2 px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
            >
                Back to Jobs
            </button>

        </div>
    );
}