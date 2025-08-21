"use client";

import { useEffect } from "react";
import Navbar from "../components/partials/nav";
import Footer from "../components/partials/footer";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
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
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default GuestLayout;
