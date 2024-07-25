"use client";

import React, { useEffect } from 'react';

function AdsVerticalBanner() {

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
            data-ad-slot="6474456464"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    );
};

export default AdsVerticalBanner;