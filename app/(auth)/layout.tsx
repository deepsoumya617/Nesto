import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container relative min-h-screen flex items-center justify-center mx-auto w-full">
            <div className="lg:p-8 mx-auto w-full max-w-sm">
                {children}
            </div>
        </div>
    );
};
