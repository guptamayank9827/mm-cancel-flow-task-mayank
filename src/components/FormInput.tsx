"use client";

import SingleChoice from '@/components/inputs/SingleChoice';
import TextArea from '@/components/inputs/TextArea';
import Radio from '@/components/inputs/Radio';
import Text from '@/components/inputs/Text';
import { Question } from '@/lib/types';


type FormInputProps = {
    question: Question;
    selectedValue: string|null;
    showError?: boolean;
    onSelect: (id:number, val:string) => void;
    onValidate?: (id:number, val:string) => void;
};

export default function FormInput(props:FormInputProps) {
    const {question, selectedValue, showError} = props;

    const getQuestionInput = () => {
        switch (question.type) {
            case "single-choice":
                return (<SingleChoice question={question} selectedValue={selectedValue} onSelect={props.onSelect} />);

            case "textarea":
                return (<TextArea question={question} selectedValue={selectedValue} showError={showError} onSelect={props.onSelect} onValidate={props.onValidate} />);

            case "radio":
                return (<Radio question={question} selectedValue={selectedValue} onSelect={props.onSelect} />);
            
            case "text":
                return (<Text question={question} selectedValue={selectedValue} onSelect={props.onSelect} />);

            default:
                return (<div>Unknown Input Type</div>);
        }
    }
    
    return(
        getQuestionInput()
    );
}