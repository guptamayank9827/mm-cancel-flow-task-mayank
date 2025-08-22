"use client";

import CloseIcon from "@/components/icons/CloseIcon";


type HeaderProps = {
    step: number;
    totalSteps: number;
    onClose: () => void;
    onBack: () => void;
};

export default function Header(props:HeaderProps) {
    const title = `Subscription ${props.step === props.totalSteps ? 'Cancelled':'Cancellation'}`;

    const handleClose = () => {
        props.onClose();
    };

    return (
        <div className="py-4 border-b border-gray-200">
            <div className="flex items-center">

                <div className="text-lg text-gray-700 flex-1 flex justify-center">

                    <span className="sm:hidden">{title}</span>
                    <span className="hidden sm:inline">{title}</span>

                </div>

                <div className="flex space-x-3 mr-2">           
                    <button
                        aria-label='close'
                        onClick={handleClose}
                        className="text-gray-700 hover:bg-gray-50"
                    >
                        <CloseIcon className="cursor-pointer" />
                    </button>
                </div>
            </div>
        </div>
    );
}