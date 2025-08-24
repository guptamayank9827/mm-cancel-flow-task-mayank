'use client';

import { useState, useMemo } from 'react';
import Title from '@/components/Title';
import FormInput from '@/components/FormInput';
import { RadioQuestion, TextQuestion } from '@/lib/types';
import { useCancelFlowStore } from "@/store/CancelFlow";

type EmployedUserStep3Props = {
    onSubmit: () => void;
};


export default function EmployedUserStep3(props:EmployedUserStep3Props) {
    const [ hasLawyer, setHasLawyer ] = useState<string|null>(null);
    const [ visa, setVisa ] = useState<string>("");
    const { state, setState } = useCancelFlowStore();
    const jobFoundViaMM = state.foundViaMM ?? "no";

    const QUESTION:RadioQuestion = {
        id: 0,
        question: `Is your company providing an immigration lawyer to help with your visa?`,
        type: "radio",
        options: ["yes", "no"]
    };

    const SECONDARY_QUESTION:TextQuestion = {
        id: 0,
        question: "",
        type: "text"
    };

    if(hasLawyer === "yes") SECONDARY_QUESTION.question = `What visa will you be applying for?*`;
    else if(hasLawyer === "no") SECONDARY_QUESTION.question = `We can connect you with one of our trusted partners.
                            <br className="hidden md:block" />
                            Which visa would you like to apply for?*`;

    const canMoveAhead = useMemo(
        () => !!hasLawyer && visa.trim().length > 0,
        [hasLawyer, visa]
    );

    const handleLawyerChange = (id:number, val:string) => {
        if(val === "yes")   setHasLawyer("yes");
        else    setHasLawyer("no");
    }

    const handleVisaChange = (id:number, val:string) => {
        setVisa(val);
    }

    const moveToNextStep = () => {
        if(!canMoveAhead)   return;

        props.onSubmit();

        setState({
            hasLawyer: hasLawyer === "yes" ? "yes" : "no",
            flowCompletedEmployed: true
        });

        resetInputs();
    }

    const resetInputs = () => {
        setHasLawyer(null);
        setVisa("");
    };

    return(
        <div className="flex flex-col">

            <Title
                title={jobFoundViaMM === "yes" ?
                    `We helped you land the job, now let&apos;s help you secure your visa.`
                    :
                    `<span>You landed the job!</span>
                    <br className="sm:block" />
                    <em className="italic">That&apos;s what we live for.</em>`
                }
                subtitle={jobFoundViaMM === "yes"?
                    ``
                    :
                    `Even if it wasn&apos;t through Migrate Mate,
                    <br className="sm:block" />
                    let us help get your visa sorted.`
                }
            />
                        
            <hr className="md:hidden mt-2 mb-2 border-gray-200" />

            <FormInput
                key={`q` + QUESTION.id}
                question={QUESTION}
                selectedValue={hasLawyer}
                placeholder="Enter visa type"
                onSelect={(questionId:number, value:string) => handleLawyerChange(questionId, value)}
            />

            {hasLawyer &&
                <FormInput
                    key={`sq` + SECONDARY_QUESTION.id}
                    question={SECONDARY_QUESTION}
                    selectedValue={visa}
                    onSelect={(questionId:number, value:string) => handleVisaChange(questionId, value)}
                />
            }

            <div className="mt-5">
                <button
                    onClick={moveToNextStep}
                    disabled={!canMoveAhead}
                    className={`w-full rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
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