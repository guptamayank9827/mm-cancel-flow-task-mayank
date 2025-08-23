
type ProgressProps = {
    step: number;
    totalSteps: number;
    classname?: string;
};

export default function ProgressBar(props:ProgressProps) {
    const displayText = props.step < props.totalSteps ? `Step ${props.step+1} of ${props.totalSteps}` : "Completed";

    return(
        <div className={`text-gray-500 ${props.classname}`}>

            {Array.from({ length: props.totalSteps }).map((_, i) => (
                <span
                    key={i}
                    className={`inline-block w-8 h-2 mx-1 rounded-full ${i < props.step ? 'bg-green-500' : i === props.step ? 'bg-gray-400' : 'bg-gray-200'}`}
                />
            ))}

            {displayText}
        </div>
    );
}