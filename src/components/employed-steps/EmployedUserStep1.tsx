'use client';

import { useState } from 'react';
import Title from '@/components/Title';
import FormInput from '@/components/FormInput';
import { Question } from '@/lib/types';

type EmployedUserStep1Props = {
    onSubmit: () => void;
};

const QUESTIONS:Question[] = [
    {
        id: 0,
        question: "Did you find this job with MigrateMate?*",
        type: "single-choice",
        options: ["yes", "no"]
    },
    {
        id: 1,
        question: `How many roles did you <u>apply</u> for through Migrate Mate?*`,
        type: "single-choice",
        options: ["0", "1 - 5", "6 - 20", "20+"]
    },
    {
        id: 2,
        question: "How many companies did you <u>email</u> directly?*",
        type: "single-choice",
        options: ["0", "1 - 5", "6 - 20", "20+"]
    },
    {
        id: 3,
        question: "How many different companies did you <u>interview</u> with?*",
        type: "single-choice",
        options: ["0", "1 - 2", "3 - 5", "5+"]
    }
];

export default function EmployedUserStep1(props:EmployedUserStep1Props) {
    const [foundViaMM, setFoundViaMM] = useState<string | null>(null);
    const [appliedCount, setAppliedCount] = useState<string | null>(null);
    const [emailedCount, setEmailedCount] = useState<string | null>(null);
    const [interviewedCount, setInterviewedCount] = useState<string | null>(null);

    const canMoveAhead = true;

    const handleFormInput = (id:number, value:string) => {
        switch (id) {
            case 0: setFoundViaMM(value);   break;
            case 1: setAppliedCount(value);   break;
            case 2: setEmailedCount(value);   break;
            case 3: setInterviewedCount(value);   break;
            default: break;
        }
    }

    const moveToNextStep = () => {
        props.onSubmit();
    }

    const getSelectedValueByQuestionId = (id:number) => {
        switch (id) {
            case 0: return foundViaMM;
            case 1: return appliedCount;
            case 2: return emailedCount;
            case 3: return interviewedCount;
            default: return null;
        }
    }

    return(
        <div className="flex flex-col">

            <Title
                title={`Congrats on the new role! 🎉`}
            />

            <hr className="md:hidden mt-2 mb-2 border-gray-200" />

            {QUESTIONS.map((question:Question) => (
                <FormInput
                    key={question.id}
                    question={question}
                    selectedValue={getSelectedValueByQuestionId(question.id)}
                    onSelect={(questionId:number, value:string) => handleFormInput(questionId, value)}
                />
            ))}

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