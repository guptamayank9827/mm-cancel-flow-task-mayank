'use client';

import { useState, useMemo } from 'react';
import Title from "@/components/Title";
import FormInput from "@/components/FormInput";
import { SingleChoiceQuestion } from "@/lib/types";

type UnemployedUserStep2Props = {
    downSellVariant: string|null;
    monthlyPricing: number;
    onSubmit: () => void;
    onAccept: () => void;
};

const QUESTIONS:SingleChoiceQuestion[] = [
    {
        id: 0,
        question: `How many roles did you <u>apply</u> for through Migrate Mate?*`,
        type: "single-choice",
        options: ["0", "1 - 5", "6 - 20", "20+"]
    },
    {
        id: 1,
        question: "How many companies did you <u>email</u> directly?*",
        type: "single-choice",
        options: ["0", "1 - 5", "6 - 20", "20+"]
    },
    {
        id: 2,
        question: "How many different companies did you <u>interview</u> with?*",
        type: "single-choice",
        options: ["0", "1 - 2", "3 - 5", "5+"]
    }
];

export default function UnemployedUserStep2P(props:UnemployedUserStep2Props) {
    const [appliedCount, setAppliedCount] = useState<string | null>(null);
    const [emailedCount, setEmailedCount] = useState<string | null>(null);
    const [interviewedCount, setInterviewedCount] = useState<string | null>(null);

    const discount = 10;
    const currentPricing = (props.monthlyPricing ?? 2500) / 100;
    const downsellPricing = props.downSellVariant === "B" ? currentPricing - discount : currentPricing;

    const canMoveAhead = useMemo(
        () => !!(appliedCount && emailedCount && interviewedCount),
        [appliedCount, emailedCount, interviewedCount]
    );

    const handleFormInput = (id:number, value:string) => {
        switch (id) {
            case 0: setAppliedCount(value);   break;
            case 1: setEmailedCount(value);   break;
            case 2: setInterviewedCount(value);   break;
            default: break;
        }
    }

    const moveToNextStep = () => {
        if(!canMoveAhead)   return;

        props.onSubmit();

        resetInputs();
    }

    const resetInputs = () => {
        setAppliedCount(null);
        setEmailedCount(null);
        setInterviewedCount(null);
    }

    const handleOffer = () => {
        props.onAccept();
    };

    const getSelectedValueByQuestionId = (id:number) => {
        switch (id) {
            case 0: return appliedCount;
            case 1: return emailedCount;
            case 2: return interviewedCount;
            default: return null;
        }
    }
    

    return(
        <div className="flex flex-col">

            <div className="md:hidden">
                <Title
                    title="What&apos;s the main reason for cancelling?"
                />
            </div>

            <div className="hidden md:inline">
                <Title
                    title="Help us understand how you were using Migrate Mate."
                />
            </div>

            {QUESTIONS.map((question:SingleChoiceQuestion) => (
                <FormInput
                    key={question.id}
                    question={question}
                    selectedValue={getSelectedValueByQuestionId(question.id)}
                    onSelect={(questionId:number, value:string) => handleFormInput(questionId, value)}
                />
            ))}

            <hr className="mt-5 border-gray-200" />


            <div className="mt-5">
                {props.downSellVariant === "B" && (
                    <button
                        className="w-full rounded-lg px-4 py-3 text-sm font-medium bg-[#43c463] text-white hover:bg-[#36a94e] transition-colors"
                        onClick={handleOffer}
                    >
                        Get ${discount} off <span className="font-normal">|</span>{" "}
                        <span className="text-white">${downsellPricing}</span>{" "}
                        <span className="line-through text-gray-200">${currentPricing}</span>
                    </button>
                )}

                <button
                    onClick={moveToNextStep}
                    disabled={!canMoveAhead}
                    className={`w-full mt-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
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