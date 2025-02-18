import { useState, useEffect } from 'react';

export default function Countdown() {
    const [count, setCount] = useState<number>(3);

    useEffect(() => {
        if (count >= 0) {
            const timer = setTimeout(() => setCount(count -1), 1000);
            // countが更新されたら、再度エフェクトを実行する前にクリーンアップ関数が実行されtimerが解除される
            return () => clearTimeout(timer);
        }
    }, [count]);

    return (
        <>
            {count>= 0 && (
                <div
                    className="
                        h-screen w-screen inset-0
                        fixed flex items-center justify-center z-50
                        bg-black
                        text-9xl text-white font-bold
                        scale-150
                    "
                >{count > 0 ? count : "start"}</div>
            )}
        </>
    );
}