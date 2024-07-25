"use client";

import React, { useEffect } from 'react';

function AdsSquareBanner() {

    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (error) {
            console.log("Erro no ads: " + error);
        }
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5616238894896233"
            data-ad-slot="5197033819"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>

    );
};

export default AdsSquareBanner;