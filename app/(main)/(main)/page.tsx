"use client";
// Hooks
import React, { useEffect, useState } from "react";

import MainSection from "./components/main-section";
import Cards from "./components/cards";
import ThirdSection from "./components/third-section";
import { getPricesInDatabase } from "@/firebase/services";
import AboutSession from "./components/about-session";

export default function Home() {

  const [prices, setPrices] = useState<any>(null);

  useEffect(() => {
    localStorage.removeItem('result');
    localStorage.removeItem('payment');
    localStorage.removeItem('pdf');
    const getPrice = async () => {
      const pricesValues = await getPricesInDatabase('txhDtXbyGm5o1k5S2TLO');
      setPrices(pricesValues);
    };
    getPrice();
  }, [])

  return (
    <>
      <div className="w-full h-full h-md:h-[600px] h-xl:h-[70%] flex justify-center items-center">
        <MainSection />
      </div>
      <Cards />
      <AboutSession />
      <ThirdSection prices={prices} />
    </>
  );
}
