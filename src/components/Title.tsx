"use client";

type TitleProps = {
    title: string;
    subtitle?: string;
};

export default function Title(props:TitleProps) {
    const {title, subtitle} = props;

    return(
        <>
            <h2
                className="text-[20px] md:text-[25px] leading-snug font-bold text-gray-900"
                dangerouslySetInnerHTML={{ __html: title }}
            />

            {subtitle &&
                <p className="mt-4 md:mt-6 text-sm text-black">
                    {subtitle}
                </p>
            }
        </>
    );
};