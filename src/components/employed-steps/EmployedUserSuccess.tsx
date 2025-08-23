'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import Title from "@/components/Title";
import { useCancelFlowStore } from "@/store/CancelFlow";


export default function EmployedUserSuccess() {
    const router = useRouter();

    const { state } = useCancelFlowStore();
    const hasLawyer = state.hasLawyer ?? "no";

    const handleFinish = () => {
        router.push("/");

        // reset global state
        setTimeout(() => {
            useCancelFlowStore.getState().setState({
                employed: null,
                foundViaMM: null,
                hasLawyer: null,
                flowCompletedEmployed: false
            });
        }, 300);
    };

    return(
        <div className="flex flex-col">

            <Title
                title={hasLawyer === "yes" ? 
                    `All done, your cancellation&apos;s been processed.`
                    :
                    `Your cancellation&apos;s all sorted, mate, no more charges.`
                }
                subtitle={hasLawyer === "yes" ?
                    `We&apos;re stoked to hear you&apos;ve landed a job and sorted your visa. Big congrats from the team. 🙌`
                    :
                    ``
                }
            />

            {hasLawyer === "no" &&
                <>
                    <h2 className="text-xl md:text-2xl font-semibold leading-tight mb-4 text-black">
                        Your cancellation&apos;s all sorted, mate, no more charges.
                    </h2>

                    <div className="mb-4 rounded-xl bg-gray-100 border border-gray-200 p-4 shadow-sm">
                        <div className="hidden md:flex items-start gap-4">
                            <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden">
                                <Image
                                    src="/profile.jpeg"
                                    alt="Mihailo Bozic"
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                    priority
                                />
                            </div>

                            <div className="flex-1 text-sm text-gray-800">
                                <p className="font-semibold leading-tight text-black">
                                    Mihailo Bozic
                                </p>
                                <p className="text-gray-600">&lt;mihailo@migratemate.co&gt;</p>

                                <div className="mt-3 space-y-2 text-gray-700">
                                    <p className="font-medium">
                                        I&apos;ll be reaching out soon to help with the visa side of
                                        things.
                                    </p>
                                    <p>
                                        We&apos;ve got your back, whether it&apos;s questions, paperwork, or
                                        just figuring out your options.
                                    </p>
                                    <p>
                                        Keep an eye on your inbox, I&apos;ll be in touch{" "}
                                        <span className="underline underline-offset-2">
                                            shortly
                                        </span>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden">
                                    <Image
                                        src="/profile.jpeg"
                                        alt="Mihailo Bozic"
                                        fill
                                        className="object-cover"
                                        sizes="40px"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold leading-tight text-black">
                                        Mihailo Bozic
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        &lt;mihailo@migratemate.co&gt;
                                    </p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-800 space-y-2 text-gray-700">
                                <p className="font-medium">
                                    I&apos;ll be reaching out soon to help with the visa side of things.
                                </p>
                                <p>
                                    We&apos;ve got your back, whether it&apos;s questions, paperwork, or just
                                    figuring out your options.
                                </p>
                                <p className="text-black">
                                    Keep an eye on your inbox, I&apos;ll be in touch{" "}
                                    <span className="underline underline-offset-2">
                                        shortly
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            }

            <button
                onClick={handleFinish}
                className="mt-2 px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition"
            >
                Finish
            </button>

        </div>
    );
}