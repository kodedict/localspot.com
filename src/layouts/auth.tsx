"use client"

import Footer from "@/components/partials/footer";
import Navbar from "@/components/partials/nav";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const {status } = useSession()

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || undefined;

    const router = useRouter()

    let safeCallbackUrl = '/admin/dashboard';
    if (callbackUrl) {
        const baseDomain : string = process.env.NEXT_PUBLIC_BASE_URL || "";
        safeCallbackUrl = callbackUrl.startsWith(baseDomain) ? callbackUrl : "/admin/dashboard";
    }

    useEffect(() => {
        if (status === "authenticated") {
            router.push(safeCallbackUrl)
        }
    }, [status, router, safeCallbackUrl])

    if (status === "loading") {
        return <div className="fixed inset-0 bg-white"></div>
    }

    if (status === "authenticated") return null

    return (
        <>
            <Navbar />
            <div className="py-10">
                {children}
            </div>
            <Footer />
        </>
    )
}