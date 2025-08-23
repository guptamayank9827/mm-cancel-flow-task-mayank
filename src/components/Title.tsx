"use client";

type TitleProps = {
    title: string;
    heading?: string;
    subtitle?: string;
};

export default function Title(props:TitleProps) {
    const {title, heading, subtitle} = props;

    return(
        <>
            <h2
                className="text-[20px] md:text-[25px] leading-snug font-bold text-gray-900"
                dangerouslySetInnerHTML={{ __html: title }}
            />

            {heading &&
                <p className="mt-4 md:mt-6 text-lg font-bold text-black" dangerouslySetInnerHTML={{ __html: heading }} />
            }

            {subtitle &&
                <p className="mt-4 md:mt-6 text-md text-black" dangerouslySetInnerHTML={{ __html: subtitle }} />
            }
        </>
    );
};