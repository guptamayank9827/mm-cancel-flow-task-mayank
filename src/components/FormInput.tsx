"use client";

import SingleChoice from '@/components/inputs/SingleChoice';
import { Question } from '@/lib/types';
import TextArea from './inputs/TextArea';

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
        
            default:
                return (<div>Unknown Input Type</div>);
        }
    }
    
    return(
        getQuestionInput()
    );
}