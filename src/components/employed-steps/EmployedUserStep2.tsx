'use client';

import { useState, useMemo } from 'react';
import Title from '@/components/Title';
import FormInput from '@/components/FormInput';
import { TextAreaQuestion } from '@/lib/types';

type EmployedUserStep2Props = {
    onSubmit: () => void;
};

const QUESTIONS:TextAreaQuestion[] = [
    {
        id: 0,
        question: "We&apos;re always looking to improve, your thoughts can help us make Migrate Mate more useful for others.*",
        type: "textarea",
        minChars: 25
    }
];

export default function EmployedUserStep2(props:EmployedUserStep2Props) {
    const [feedback, setFeedback] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    const canMoveAhead = useMemo(() => feedback.trim().length >= 25, [feedback]);

    const getSelectedValueByQuestionId = (id:number) => {
        switch (id) {
            case 0: return feedback;
            default: return null;
        }
    }

    const handleFormInput = (id:number, value:string) => {
        switch (id) {
            case 0: 
                setFeedback(value);
                // validateInput(id, value);
                break;

            default: break;
        }
    }

    const validateInput = (id:number, value:string) => {
        const minChars = QUESTIONS[0].minChars;

        const len = value.trim().length;
        if (len > 0 && len < minChars) setShowError(true);
        else setShowError(false);
    }

    const moveToNextStep = () => {
        if(!canMoveAhead)   return;

        props.onSubmit();

        resetInputs();
    }

    const resetInputs = () => {
        setFeedback("");
        setShowError(false);
    };

    return(
        <div className="flex flex-col">

            <Title
                title={`What&apos;s one thing you wish we could&apos;ve helped you with?`}
            />
            
            <hr className="md:hidden mt-2 mb-2 border-gray-200" />

            {QUESTIONS.map((question:TextAreaQuestion) => (
                <FormInput
                    key={question.id}
                    question={question}
                    selectedValue={getSelectedValueByQuestionId(question.id)}
                    showError={showError}
                    onSelect={(questionId:number, value:string) => handleFormInput(questionId, value)}
                    onValidate={(questionId:number, value:string) => validateInput(questionId, value)}
                />
            ))}

            <div className="mt-5">
                <button
                    onClick={moveToNextStep}
                    disabled={!canMoveAhead}
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