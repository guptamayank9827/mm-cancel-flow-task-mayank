"use client";

import { TextQuestion } from '@/lib/types';

type TextProps = {
    question: TextQuestion;
    selectedValue: string|null;
    placeholder?: string|null;
    onSelect: (id:number, val:string) => void;
};

export default function Text(props:TextProps) {
    let {selectedValue} = props;
    const {id, question} = props.question;
    selectedValue = selectedValue || "";

    return(
        <div className="mt-1">
            <p className="text-xs md:text-sm text-black mb-2"  dangerouslySetInnerHTML={{ __html: question }} />

            <input
                type="text"
                value={selectedValue}
                onChange={(e) => props.onSelect(id, e.target.value)}
                placeholder={props.placeholder || ""}
                className="w-full rounded-lg border border-gray-300 text-xs text-black bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8952fc]/30 focus:border-[#8952fc]"
            />
        </div>
    );
}