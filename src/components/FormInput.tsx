import SingleChoice from '@/components/inputs/SingleChoice';
import { Question } from '@/lib/types';

type FormInputProps = {
    question: Question;
    selectedValue: string|null;
    onSelect: (id:number, val:string) => void;
};

export default function FormInput(props:FormInputProps) {
    const {question, selectedValue} = props;

    const getQuestionInput = () => {
        switch (question.type) {
            case "single-choice":
                return (<SingleChoice question={question} selectedValue={selectedValue} onSelect={props.onSelect} />);
        
            default:
                return (<div>Unknown Input Type</div>);
                break;
        }
    }
    
    return(
        getQuestionInput()
    );
}