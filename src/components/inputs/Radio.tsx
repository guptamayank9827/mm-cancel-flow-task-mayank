"use client";

import { RadioQuestion } from '@/lib/types';

type RadioProps = {
    question: RadioQuestion;
    selectedValue: string|null;
    onSelect: (id:number, val:string) => void;
};

export default function Radio(props:RadioProps) {
    const {id, question, options} = props.question;

    return(
        <div className="mt-5">
            <p className="text-xs md:text-sm text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: question }} />

            <div className="mt-4 space-y-3">
                {options.map((option) => {
                    return (
                        !props.selectedValue || props.selectedValue === option ?
                            <div key={option}>
                                <label className="flex items-center gap-3 text-sm text-gray-900">
                                    <input
                                        type="radio"
                                        name="hasLawyer"
                                        className="h-4 w-4"
                                        checked={props.selectedValue === option}
                                        onChange={() => props.onSelect(id, option)}
                                    />
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </label>
                            </div>
                        :
                            <div key={option}></div>
                    );
                })}
            </div>

        </div>
    );
}