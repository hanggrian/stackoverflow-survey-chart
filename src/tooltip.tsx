interface TooltipPayloadItem {
    dataKey?: string;
    value?: number | null;
    color?: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: readonly TooltipPayloadItem[];
    label?: string | number;
    visible: Set<string>;
}

const CustomTooltip:
    ({active, payload, label, visible}: CustomTooltipProps) => (null | React.JSX.Element) =
    ({active, payload, label, visible}: CustomTooltipProps) => {
        if (!active || !payload?.length) {
            return null;
        }
        const sorted =
            [...payload]
                .filter(p => p.value && visible.has(p.dataKey ?? ''))
                .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

        return (
            <div className="tooltip-box">
                <div className="tooltip-label">{label}</div>
                {
                    sorted.map(p => (
                        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
                            <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{background: p.color}}/>
                            <span className="tooltip-text flex-1 text-[13px]">{p.dataKey}</span>
                            <span
                                className="text-[13px] font-bold font-mono"
                                style={{color: p.color}}>
                                {p.value?.toFixed(1)}%
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    };

export type {TooltipPayloadItem};
export default CustomTooltip;
