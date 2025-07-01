'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthLayout from "@/layouts/auth";
import GuestLayout from "@/layouts/guest";
import { AuthUser } from "@/store/_auth_";
import PageLoader from "../loader/page-loader";

export default function LayoutManager({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const auth = AuthUser(); // use once
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname.startsWith("/auth/login");

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Redirect authenticated users away from login
        if (isLoginPage && auth) {
            router.push('/admin/dashboard');
        }

        // Redirect unauthenticated users trying to access admin routes
        else if (isAdminRoute && !auth && !isLoginPage) {
            router.push('/auth/login');
        }

        // Mark session check as complete
        setIsReady(true);
}, [pathname, auth, isLoginPage, isAdminRoute, router]);

    // Wait until session logic runs
    if (!isReady) {
        return <PageLoader />;
    }

    // Authenticated admin route
    if (isAdminRoute && auth) {
        return <AuthLayout>{children}</AuthLayout>;
    }

    // Guest access
    return (
        <GuestLayout>
            <div className="">{children}</div>
        </GuestLayout>
    );
}
