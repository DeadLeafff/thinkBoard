import React from 'react';
import { Zap } from 'lucide-react';

const RateLimitWarning = () => {
    return (
        <div className="alert border border-primary/20 bg-base-200/50 text-base-content shadow-lg mb-6 flex items-start gap-4 rounded-xl">
            <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg text-white">Rate Limit Reached</h3>
                <p className="text-base-content/70 text-sm">
                    You've made too many requests in a short period. Please wait a moment.
                    <br />
                    Try again in a few seconds for the best experience.
                </p>
            </div>
        </div>
    );
};

export default RateLimitWarning;
