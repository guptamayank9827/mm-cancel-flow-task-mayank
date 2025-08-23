'use client';

type UnemployedUserStep3Props = {
    onSubmit: () => void;
};

export default function UnemployedUserStep3(props:UnemployedUserStep3Props) {

    const canMoveAhead = true;

    const moveToNextStep = () => {
        props.onSubmit();
    }

    return(
        <div className="flex flex-col">

            <div>Step 3</div>

            <div className="mt-5">
                <button
                    onClick={moveToNextStep}
                    disabled={false}
                    className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        canMoveAhead
                        ? "bg-purple-500 text-white hover:bg-[#7b40fc]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    Continue
                </button>
            </div>

        </div>
    );
}