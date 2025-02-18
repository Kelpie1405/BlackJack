"use client";
import { useState, useEffect } from "react";
import "./openingEffect.css";

export default function OpenCurtainEffect() {
    const [showCurtain, setShowCurtain] = useState<boolean>(true);

    useEffect(() => {
        // 4(1+3)秒後にカーテンを非表示
        const timer = setTimeout(() => setShowCurtain(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    if (!showCurtain) return null; // カーテンを削除

    return (
        <div className="
                h-screen w-screen
                fixed inset-0 z-50 flex overflow-hidden
            "
        >
            <div className="curtain animation-left-curtain-open" />
            <div className="curtain animation-right-curtain-open" />
        </div>
    );
}