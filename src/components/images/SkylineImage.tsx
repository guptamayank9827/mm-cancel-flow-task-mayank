import Image from 'next/image';

type SkylineImageProps = {
    classes?: string;
};

export default function SkylineImage(props:SkylineImageProps) {
    const defaultClasses =  "hidden md:block relative h-56 md:h-auto rounded-xl overflow-hidden order-1 md:order-2";

    return(
        <div className={props.classes || defaultClasses}>
            <Image
                src="/skyline.jpg"
                alt="City skyline"
                fill
                priority
                className="object-cover"
            />
        </div>
    );
};