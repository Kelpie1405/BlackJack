const Button = ({ onClick, disabled=false, className, text} : { onClick: () => void, disabled?: boolean, className: string, text: string }) => {
    return (
        // ! disabledの時のボタンも作成する
        <button
            onClick={ onClick }
            disabled={ disabled }
            // 上から、「大きさ」・「配置」・「背景と形状」・「立体感（影）」・「文字」・「グループ（この説明を書きたい）」・「追加CSS」
            //  shadow-orange-400/50
            className={`
                h-14 w-32 p-2
                relative inline-flex overflow-hidden items-center justify-center
                bg-orange-400 rounded-lg
                shadow-[0_5px] shadow-orange-400/60
                text-emerald-900 text-lg font-semibold
                transition hover:scale-110
                group
                ${className}
            `}
            // className={`group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 ${className}`}
            // className={`relative inline-flex items-center justify-center overflow-hidden  px-6  ${className}`}
            type="button"
        >
            <span>{ text }</span>
            <div className="
                h-full w-full
                absolute inset-0 flex justify-center
                [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]
            ">
                <div className="
                    h-full w-8 relative bg-white/30 blur-sm
                " />
            </div>
        </button>
    );
};

export default Button;