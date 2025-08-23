'use client';

import { useRouter } from "next/navigation";
import Title from "@/components/Title";

type UnemployedUserSuccessProps = {
    downSellAccepted: boolean;
}


export default function UnemployedUserSuccess(props:UnemployedUserSuccessProps) {
    const router = useRouter();
    const {downSellAccepted} = props;

    const handleFinish = () => {
        router.push("/");
    };

    return(
        <div className="flex flex-col">

            <Title
                title={downSellAccepted === false ? 
                    `Sorry to see you go, mate.`
                    :
                    `Great choice, mate!`
                }
                heading={downSellAccepted === false ?
                    `Thanks for being with us, and you&apos;re always welcome back.`
                    :
                    `You&apos;re still on the path to your dream role.
                    <span className="text-[#826eff]">
                        Let&apos;s make it happen together!
                    </span>`
                }
                subtitle={downSellAccepted === false ?
                    `Your subscription is set to end on XX date. <br />
                    You&apos;ll still have full access until then. No further charges after
                    that.`
                    :
                    `<p>You&apos;ve got XX days left on your current plan.</p>
                    <p>Starting from XX date, your monthly payment will be $12.50.</p>`
                }
            />

            <p className="mt-2 text-[11px] md:text-[13px] text-gray-500 leading-relaxed italic">
                {downSellAccepted === false ?
                    `Changed your mind? You can reactivate anytime before your end date.`
                    :
                    `You can cancel anytime before then.`
                }
                
            </p>

            <hr className="my-5 border-gray-200" />

            <button
                onClick={handleFinish}
                className="mt-2 px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
            >
                {downSellAccepted === false ? "Back to Jobs":"Land your dream role"}
            </button>

        </div>
    );
}