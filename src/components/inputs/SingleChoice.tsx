import { SingleChoiceQuestion } from '@/lib/types';

type SingleChoiceProps = {
    question: SingleChoiceQuestion;
    selectedValue: string|null;
    onSelect: (id:number, val:string) => void;
};

const defaultClasses = "rounded-lg border px-4 py-3 text-xs md:text-sm text-black";
const selectedClasses = "border-[#8952fc] bg-purple-500 text-white"
const nonSelectedClasses = "border-gray-300 bg-gray-200 hover:bg-gray-300";

export default function SingleChoice(props:SingleChoiceProps) {
    const {question, selectedValue} = props;
    
    return(
        <div className="mt-5">
            <p className="text-xs md:text-sm text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />
            <div className="grid grid-cols-4 gap-3">
                {question.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => props.onSelect(question.id, option)}
                        className={`${defaultClasses} ${selectedValue === option ? selectedClasses : nonSelectedClasses}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}