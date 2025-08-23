'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import Header from '@/components/Header';
import StartCancel from '@/components/StartCancel';
import EmployedUserCancel from '@/components/employed-steps/EmployedUserCancel';
import UnemployedUserCancel from '@/components/unemployed-steps/UnemployedUserCancel';

import { useCancelFlowStore } from "@/store/CancelFlow";



const TOTAL_STEPS = 3;
const INITIAL_STEP = -1;

export default function CancelPage() {
    const router = useRouter();

    // state
    const [hasJob, setHasJob] = useState<boolean|null>(null);
    const [step, setStep] = useState<number>(INITIAL_STEP);
    const [downSellAccepted, setDownSellAccepted] = useState<boolean>(false);
    const { state, setState } = useCancelFlowStore();

    const downSellVariant = state.downsell_variant;

    useEffect(() => {
        if(hasJob === false && state.downsell_variant === "A")  setStep(1);
    }, [state.downsell_variant, hasJob]);

    // handle functions
    const handleCloseButtonClick = () => {
        router.push("/");
    };

    const handleBack = () => {
        if (step >= 0) {
            if(step === 0)   setHasJob(null);
            setStep(step - 1);
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
                        downSellVariant={downSellVariant}
                        downSellAccepted={downSellAccepted}
                        onBack={handleBack}
                        onSubmit={() => { if(step < TOTAL_STEPS )   setStep(step + 1); }}
                        onAccept={() => handleDownsellOfferAccept()}
                    />
                }

            </div>
        </div>
    )
}