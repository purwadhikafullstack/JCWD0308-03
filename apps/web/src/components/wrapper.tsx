import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 bg-white sm:px-6 sm:py-12 lg:px-8">
            {children}
        </div>
    )
}