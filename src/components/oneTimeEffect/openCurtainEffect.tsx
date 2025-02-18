"use client";
import { useState, useEffect } from "react";
import "./a.css";

export default function OpenCurtainEffect() {
    const [showCurtain, setShowCurtain] = useState(true);

    const curtainShape = "h-full w-1/2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"

    useEffect(() => {
        // 2秒後にカーテンを非表示
        const timer = setTimeout(() => setShowCurtain(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!showCurtain) return null; // カーテンを削除

    return (
        <div className="
            h-screen w-screen
            fixed inset-0 z-50 flex overflow-hidden
            "
        >
            <div className={`${curtainShape} left-curtain bg-curtain shadow-curtain animate-left-open`}></div>
            <div className={`${curtainShape} right-curtain bg-curtain shadow-curtain animate-right-open`}></div>

        </div>
    );
}
