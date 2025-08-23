"use client";

import { TextAreaQuestion } from '@/lib/types';

type TextAreaProps = {
    question: TextAreaQuestion;
    selectedValue: string|null;
    showError: boolean|undefined;
    onSelect: (id:number, val:string) => void;
    onValidate?: (id:number, val:string) => void;
};

export default function TextArea(props:TextAreaProps) {
    let {selectedValue} = props;
    const {id, question} = props.question;
    let {minChars} = props.question;

    selectedValue = selectedValue ?? "";
    minChars = minChars ?? 0;
    
    return(
        <div className="mt-5">
            <p className="text-xs md:text-sm text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: question }} />

            {props.showError && (
                <div
                    className="text-[10px] mt-2 md:text-sm text-red-400 font-semibold pb-2"
                    aria-live="polite"
                >
                    Please enter at least {minChars} characters so we can understand your feedback.*
                </div>
            )}
        
            <div className="mt-1 relative">
                <textarea
                    value={selectedValue}
                    onChange={(e) => props.onSelect(id, e.target.value)}
                    placeholder=""
                    className="w-full min-h-40 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#8952fc]/30 focus:border-[#8952fc] bg-white text-black text-xs"
                    aria-label="Feedback"
                    onBlur={() => {if(props.onValidate)  props.onValidate(id, selectedValue)}}
                />
                <span
                    className={`pointer-events-none absolute bottom-3 right-3 text-[11px] ${
                        selectedValue.length < minChars ? "text-gray-500" : "text-green-500"
                    }`}
                >
                    Min {minChars} characters ({selectedValue.trim().length}/{minChars})
                </span>
            </div>
        </div>
    );
}