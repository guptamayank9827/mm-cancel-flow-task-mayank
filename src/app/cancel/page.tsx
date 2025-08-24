'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as crypto from 'crypto';
import { fetchUser, fetchUserSubscription, fetchDownsellVariant, insertCancellationEntry } from '@/utils/utils';


// components
import Header from '@/components/Header';
import StartCancel from '@/components/StartCancel';
import EmployedUserCancel from '@/components/employed-steps/EmployedUserCancel';
import UnemployedUserCancel from '@/components/unemployed-steps/UnemployedUserCancel';

import { useCancelFlowStore } from "@/store/CancelFlow";

const mockUserEmail = 'user1@example.com';
const TOTAL_STEPS = 3;
const INITIAL_STEP = -1;

export default function CancelPage() {
    const router = useRouter();

    // state
    const [hasJob, setHasJob] = useState<boolean|null>(null);
    const [step, setStep] = useState<number>(INITIAL_STEP);
    const [downSellAccepted, setDownSellAccepted] = useState<boolean>(false);
    const { state, setState } = useCancelFlowStore();

    useEffect(() => {
        initializeFlow();
    }, []);
    
    useEffect(() => {
        if (state.user?.id)   fetchAndSetUserSubscription(state.user.id);
    },[state.user]);

    useEffect(() => {
        if (state.user?.id && state.subscription?.id && !state.downsell_variant)   fetchAndSetDownsellVariant(state.user.id, state.subscription?.id);
    },[state.user, state.subscription, state.downsell_variant]);

    useEffect(() => {
        if(hasJob === false && state.downsell_variant === "A")  setStep(1);
    }, [state.downsell_variant, hasJob]);

    const initializeFlow = async () => {
        if(!state.user || !state.user.id)   await fetchAndSetUser();
    }

    const fetchAndSetUser = async () => {
        try {
            const user = await fetchUser(mockUserEmail);
            setState({user});
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAndSetUserSubscription = async (userId:string) => {
        try {
            const subscription = await fetchUserSubscription(userId);
            setState({subscription});
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchAndSetDownsellVariant = async(userId:string, subscriptionId:string) => {
        try {
            const cancellationEntry = await fetchDownsellVariant(userId, subscriptionId);
            const downsellVariant = cancellationEntry?.downsell_variant;

            let cancellationState = {
                id: cancellationEntry?.id,
                user_id: cancellationEntry?.user_id,
                subscription_id: cancellationEntry?.subscription_id
            };

            if(!downsellVariant)  {
                const downsellVariant = await generateVariant();

                const newCancellationEntry = {
                    user_id: state.user?.id,
                    subscription_id: state.subscription?.id,
                    downsell_variant: downsellVariant
                };

                const cancellations = await insertCancellationEntry(newCancellationEntry);
                const cancellation = cancellations && cancellations[0] ? cancellations[0] : null;

                cancellationState = {
                    id: cancellation?.id,
                    user_id: state.user?.id || "",
                    subscription_id: state.subscription?.id || ""
                };
            }

            setState({
                cancellation: cancellationState,
                downsell_variant:downsellVariant
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    const generateVariant = async () => {
        const randomUint32 = crypto.randomBytes(4).readUInt32LE();
        const secureRandomNumber = randomUint32 / (0xffffffff + 1);

        return secureRandomNumber < 0.5 ? 'A' : 'B';
    }

    // handle functions
    const handleCloseButtonClick = () => {
        router.push("/");
    };

    const handleBack = () => {
        if (step >= 0) {
            if(step === 0)   setHasJob(null);

            if(hasJob === false && state.downsell_variant==="A" && step === 1)  {
                setStep(step - 2);
                setHasJob(null);
            }
            else    setStep(step - 1);
        }
    };

    const handleJobChange = (jobStatus:boolean|null) => {
        setHasJob(jobStatus);
        setStep(0);
        setState({ employed: jobStatus === true ? "yes" : "no"});
    }

    const handleDownsellOfferAccept = () => {
        setStep(TOTAL_STEPS);
        setDownSellAccepted(true);
    }


    return(
        <div className="min-h-screen bg-gray-50 py-12 relative">
            <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">

                <Header
                    step={step}
                    totalSteps={TOTAL_STEPS}
                    downSellAccepted={downSellAccepted}
                    onClose={handleCloseButtonClick}
                    onBack={handleBack}
                />

                {hasJob === null &&
                    <StartCancel
                        onClose={handleCloseButtonClick}
                        onJobChange={handleJobChange}
                    />
                }

                {hasJob === true &&
                    <EmployedUserCancel
                        step={step}
                        totalSteps={TOTAL_STEPS}
                        onBack={handleBack}
                        onSubmit={() => { if(step < TOTAL_STEPS )   setStep(step + 1); }}
                    />
                }

                {hasJob === false &&
                    <UnemployedUserCancel
                        step={step}
                        totalSteps={TOTAL_STEPS}
                        downSellVariant={state.downsell_variant}
                        downSellAccepted={downSellAccepted}
                        monthlyPricing={state.subscription?.monthly_price || 2500}
                        onBack={handleBack}
                        onSubmit={() => { if(step < TOTAL_STEPS )   setStep(step + 1); }}
                        onAccept={() => handleDownsellOfferAccept()}
                    />
                }

            </div>
        </div>
    )
}