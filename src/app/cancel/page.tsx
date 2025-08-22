'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// components
import Header from '@/components/Header';
import StartCancel from '@/components/StartCancel';

const TOTAL_STEPS = 3;
const INITIAL_STEP = -1;

export default function CancelPage() {
    const router = useRouter();

    // state
    const [hasJob, setHasJob] = useState<boolean|null>(null);
    const [step, setStep] = useState<number>(INITIAL_STEP);


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
        // persist job status
    }
    

    return(
        <div className="min-h-screen bg-gray-50 py-12 relative">
            <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">

                <Header
                    step={step}
                    totalSteps={TOTAL_STEPS}
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
                    <div>YES JOB</div>
                }

                {hasJob === false &&
                    <div>NO JOB</div>
                }

            </div>
        </div>
    )
}