'use client';

import { useState, useMemo } from 'react';
import Title from '@/components/Title';
import FormInput from '@/components/FormInput';
import { RadioQuestion, NumberQuestion, TextAreaQuestion } from '@/lib/types';
import { useCancelFlowStore } from "@/store/CancelFlow";

type UnemployedUserStep3Props = {
    downSellVariant: string|null;
    downSellAccepted: boolean;
    monthlyPricing: number;
    onSubmit: () => void;
    onAccept: () => void;
};

export default function UnemployedUserStep3(props:UnemployedUserStep3Props) {
    const [reason, setReason] = useState<string|null>(null);
    const [reasonComment, setReasonComment] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [secondaryQuestionType, setSecondaryQuestionType] = useState("text");
    const { setState } = useCancelFlowStore();

    const discount = 10;
    const currentPricing = (props.monthlyPricing ?? 2500) / 100;
    const downsellPricing = props.downSellVariant === "B" ? currentPricing - discount : currentPricing;

    const canMoveAhead = useMemo(
        () => !!reason && (
            (secondaryQuestionType === "text" && reasonComment.trim().length >= 25)
            || 
            secondaryQuestionType === "number" && reasonComment.length > 0),
        [reason, reasonComment]
    );

    const moveToNextStep = async () => {
        props.onSubmit();

        setState({
            reason,
            flowCompletedUnemployed: true
        });
    }

    const handleReasonChange = (id:number, val:string) => {
        setReason(val);
    }

    const handleReasonCommentChange = (id:number, val:string) => {
        setReasonComment(val);
    }

    const validateInput = (id:number, value:string, question:TextAreaQuestion) => {
        const minChars = question.minChars;

        const len = value.trim().length;
        if (len > 0 && len < minChars) setShowError(true);
        else setShowError(false);
    }

    const handleOffer = () => {
        if(!canMoveAhead)   return;

        props.onAccept();

        resetInputs();
    };

    const resetInputs = () => {
        setReason(null);
        setReasonComment("");
        setShowError(false);
    };

    const QUESTION:RadioQuestion = {
        id: 0,
        question: `Please take a minute to let us know why:`,
        type: "radio",
        options: ["Too expensive", "Platform not helpful", "Not enough relevant jobs", "Decided not to move", "Other"]
    };

    const getSecondaryQuestion = () => {
        switch (reason) {
            case QUESTION.options[0]:
                const SECONDARY_QUESTION_0:NumberQuestion = {
                    id: 0,
                    question: "What would be the maximum you would be willing to pay?*",
                    type: "number",
                    symbol: "$"
                };
                if(secondaryQuestionType !== "number")  setSecondaryQuestionType("number");
                return(
                    <FormInput
                        key={`sq0`}
                        question={SECONDARY_QUESTION_0}
                        selectedValue={reasonComment}
                        onSelect={(questionId:number, value:string) => handleReasonCommentChange(questionId, value)}
                    />);

            case QUESTION.options[1]:
            case QUESTION.options[2]:
            case QUESTION.options[3]:
            case QUESTION.options[4]:
                const SECONDARY_QUESTION_1:TextAreaQuestion = {
                    id: 1,
                    question: "",
                    type: "textarea",
                    minChars: 25
                };
                if(secondaryQuestionType !== "text")  setSecondaryQuestionType("text");

                if(reason === QUESTION.options[1])  SECONDARY_QUESTION_1.question = "What can we change to make the platform more helpful?*";
                else if(reason === QUESTION.options[2])  SECONDARY_QUESTION_1.question = "In which way can we make the jobs more relevant?*";
                else if(reason === QUESTION.options[3])  SECONDARY_QUESTION_1.question = "What changed for you to decide to not move?*";
                else if(reason === QUESTION.options[4])  SECONDARY_QUESTION_1.question = "What would have helped you the most?*";

                return(
                    <FormInput
                        key={`sq1`}
                        question={SECONDARY_QUESTION_1}
                        selectedValue={reasonComment}
                        showError={showError}
                        onSelect={(questionId:number, value:string) => handleReasonCommentChange(questionId, value)}
                        onValidate={(questionId:number, value:string) => validateInput(questionId, value, SECONDARY_QUESTION_1)}
                    />);

            default:
                return (<></>);
        }
    }

    return(
        <div className="flex flex-col">

            <Title
                title={`What&apos;s the main reason for cancelling?`}
            />

            <FormInput
                key={`q` + QUESTION.id}
                question={QUESTION}
                selectedValue={reason}
                onSelect={(questionId:number, value:string) => handleReasonChange(questionId, value)}
            />

            {getSecondaryQuestion()}

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
                    Complete Cancellation
                </button>
            </div>

        </div>
    );
}