"use client"

import Footer from "@/components/partials/footer";
import Navbar from "@/components/partials/nav";
import { useEffect} from "react";


export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              };
              localStorage.setItem("userCoordinates", JSON.stringify(coords));
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        }
      }, []);

    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
}