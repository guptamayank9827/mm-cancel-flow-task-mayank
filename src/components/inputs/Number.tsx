"use client";

import { NumberQuestion } from '@/lib/types';

type NumberProps = {
    question: NumberQuestion;
    selectedValue: string|null;
    onSelect: (id:number, val:string) => void;
};

export default function Number(props:NumberProps) {
    let {selectedValue} = props;
    const {id, question} = props.question;
    selectedValue = selectedValue || "";

    return(
        <div>
          <label className="block text-[10px] md:text-sm text-gray-800 py-2"  dangerouslySetInnerHTML={{ __html: question }} />

            <div
                className="border rounded flex items-center gap-2 px-2 cursor-text"
                onClick={() => {
                    const input = document.getElementById("amount-input");
                    if (input)  (input as HTMLInputElement).focus();
                }}
            >
                <span className="text-sm font-bold text-gray-500">{props.question.symbol}</span>
                <input
                    id="amount-input"
                    type='number'
                    value={selectedValue}
                    onChange={(e) => props.onSelect(id, e.target.value)}
                    className="px-3 py-2 text-sm text-black outline-none bg-transparent remove-arrow"
                />
            </div>
        </div>
    );
}