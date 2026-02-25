import {StrictMode, useState} from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts';
import {createRoot} from 'react-dom/client';
import {LANGUAGES} from './language.ts';
import './index.css';
import CustomTooltip, {TooltipPayloadItem} from './tooltip.tsx';

type ThemeKey = 'dark' | 'light';

interface ThemeTokens {
    bg: string;
    border: string;
    text: string;
    muted: string;
    mutedFaint: string;
    accent: string;
    hover: string;
    gridStroke: string;
    cursor: string;
    tooltipBg: string;
    tooltipBorder: string;
    toggleBg: string;
}

type ChartPoint = { year: number } & Record<string, number | null>;

const THEMES: Record<ThemeKey, ThemeTokens> = {
    dark: {
        bg: '#08090d',
        border: '#1e2130',
        text: '#e2e4f0',
        muted: '#5a607a',
        mutedFaint: '#3a4055',
        accent: '#ff9800',
        hover: 'rgba(255,255,255,0.03)',
        gridStroke: '#1e2130',
        cursor: '#2a2f45',
        tooltipBg: '#0f1117',
        tooltipBorder: '#1e2130',
        toggleBg: '#1e2130',
    },
    light: {
        bg: '#f5f6fa',
        border: '#dde1ef',
        text: '#1a1d2e',
        muted: '#7c84a3',
        mutedFaint: '#b0b8d4',
        accent: '#f58025',
        hover: 'rgba(0,0,0,0.04)',
        gridStroke: '#e4e8f5',
        cursor: '#c8cfe8',
        tooltipBg: '#ffffff',
        tooltipBorder: '#dde1ef',
        toggleBg: '#e4e8f5',
    },
};

function applyTheme(t: ThemeTokens): void {
    const root = document.documentElement;
    root.style.setProperty('--bg', t.bg);
    root.style.setProperty('--border', t.border);
    root.style.setProperty('--text', t.text);
    root.style.setProperty('--muted', t.muted);
    root.style.setProperty('--muted-faint', t.mutedFaint);
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--hover', t.hover);
    root.style.setProperty('--grid-stroke', t.gridStroke);
    root.style.setProperty('--cursor-color', t.cursor);
    root.style.setProperty('--tooltip-bg', t.tooltipBg);
    root.style.setProperty('--tooltip-border', t.tooltipBorder);
    root.style.setProperty('--toggle-bg', t.toggleBg);
}

const chartData: ChartPoint[] =
    Array
        .from({length: 12}, (_, i) => 2013 + i)
        .map(year => {
            const point: ChartPoint = {year};
            LANGUAGES.forEach(lang => {
                point[lang.name] = lang.year[String(year)] ?? null;
            });
            return point;
        });

const SunIcon: ({color}: { color: string }) => React.JSX.Element =
    ({color}: { color: string }) => (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    );

const MoonIcon: ({color}: { color: string }) => React.JSX.Element =
    ({color}: { color: string }) => (
        <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    );

const sidebarBtnClass: string =
    `bg-transparent
    border-none
    text-[10px]
    font-mono
    cursor-pointer
    px-1
    py-0.5
    transition-colors
    duration-150
    text-[var(--muted)]
    hover:text-[var(--accent)]`;

const App: React.FC = () => {
    const [theme, setTheme] = useState<ThemeKey>('dark');
    const [visible, setVisible] = useState<Set<string>>(new Set(LANGUAGES.map(l => l.name)));
    const [hovered, setHovered] = useState<string | null>(null);
    const [btnHovered, setBtnHovered] = useState(false);

    const t: ThemeTokens = THEMES[theme];
    applyTheme(t);
    const isDark: boolean = theme === 'dark';

    const toggle: (name: string) => void =
        (name: string) =>
            setVisible((prev) => {
                const next = new Set(prev);
                if (next.has(name)) {
                    next.delete(name);
                } else {
                    next.add(name);
                }
                return next;
            });

    const showAll: () => void = () => setVisible(new Set(LANGUAGES.map(l => l.name)));
    const hideAll: () => void = () => setVisible(new Set());

    return (
        <div
            className="flex flex-col h-screen overflow-hidden transition-colors duration-300"
            style={
                {
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontFamily: "'DM Sans', sans-serif",
                }
            }>

            {/* Header */}
            <header
                className={`
                    flex
                    items-center
                    gap-4
                    px-7
                    pt-4
                    pb-3.5
                    shrink-0
                    transition-colors
                    duration-300
                `}
                style={{borderBottom: '1px solid var(--border)'}}>
                <h1
                    className={`
                        m-0
                        text-[14px]
                        font-bold
                        tracking-[0.06em]
                        transition-colors
                        duration-300
                    `}
                    style={{
                        fontFamily: "'Space Mono', monospace",
                        color: 'var(--accent)',
                    }}>
                    STACKOVERFLOW DEVELOPER SURVEY
                </h1>
                <span
                    className="text-[12px] flex-1 transition-colors duration-300"
                    style={{color: 'var(--muted)'}}>
                    % of respondents using each language · 2015–2025
                </span>

                {/* Theme toggle */}
                <button
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    className={`
                        flex
                        items-center
                        gap-1.5
                        text-[11px]
                        font-mono
                        tracking-[0.06em]
                        rounded-full
                        px-3
                        py-1
                        cursor-pointer
                        shrink-0
                        transition-all
                        duration-300
                    `}
                    style={{
                        background: 'var(--toggle-bg)',
                        border: '1px solid var(--border)',
                        color: btnHovered ? 'var(--accent)' : 'var(--muted)',
                        paddingLeft: '10px',
                    }}>
                    {
                        isDark
                            ? <SunIcon color={btnHovered ? t.accent : t.muted}/>
                            : <MoonIcon color={btnHovered ? t.accent : t.muted}/>
                    }
                    {isDark ? 'light' : 'dark'}
                </button>
            </header>

            {/* ── Body ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── Sidebar ── */}
                <aside
                    className={`
                        sidebar
                        shrink-0
                        flex
                        flex-col
                        overflow-hidden
                        transition-colors
                        duration-300
                    `}
                    style={{borderRight: '1px solid var(--border)'}}>

                    {/* Sidebar header */}
                    <div
                        className={`
                            flex
                            justify-between
                            items-center
                            px-4
                            pt-3
                            pb-2.5
                            shrink-0
                            transition-colors
                            duration-300
                        `}
                        style={{borderBottom: '1px solid var(--border)'}}>
                        <span
                            className={`
                                text-[10px]
                                font-mono
                                tracking-widest
                                uppercase
                                transition-colors
                                duration-300
                            `}
                            style={{color: 'var(--muted)'}}>
                            Languages
                        </span>
                        <div className="flex gap-2">
                            <button className={sidebarBtnClass} onClick={showAll}>all</button>
                            <button className={sidebarBtnClass} onClick={hideAll}>none</button>
                        </div>
                    </div>

                    {/* Language list */}
                    <div className="flex-1 overflow-y-auto py-1.5">
                        {
                            LANGUAGES.map(lang => {
                                const isVis = visible.has(lang.name);
                                const isHov = hovered === lang.name;
                                return (
                                    <div
                                        key={lang.name}
                                        onClick={() => toggle(lang.name)}
                                        onMouseEnter={() => setHovered(lang.name)}
                                        onMouseLeave={() => setHovered(null)}
                                        className={`
                                            flex
                                            items-center
                                            gap-2.5
                                            px-4
                                            py-1.5
                                            cursor-pointer
                                            select-none
                                            transition-colors
                                            duration-100
                                        `}
                                        style={{
                                            background: isHov ? 'var(--hover)' : 'transparent',
                                        }}>
                                        <div
                                            className={`
                                                w-2.5
                                                h-2.5
                                                rounded-full
                                                shrink-0
                                                transition-opacity
                                                duration-200
                                            `}
                                            style={{
                                                background: lang.color,
                                                opacity: isVis ? 1 : 0.18,
                                            }}/>
                                        <span
                                            className="text-[13px] transition-opacity duration-200"
                                            style={{
                                                color: 'var(--text)',
                                                opacity: isVis ? 1 : 0.35,
                                            }}>
                                            {lang.name}
                                        </span>
                                    </div>
                                );
                            })
                        }
                    </div>
                </aside>

                {/* ── Chart ── */}
                <div className="panel flex flex-col flex-1 min-w-0">
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 8,
                                    right: 12,
                                    bottom: 0,
                                    left: 0,
                                }}>
                                <CartesianGrid stroke={t.gridStroke} strokeDasharray="none"/>
                                <XAxis
                                    dataKey="year"
                                    tick={{
                                        fill: t.muted,
                                        fontSize: 11,
                                        fontFamily: "'Space Mono', monospace",
                                    }}
                                    axisLine={{stroke: t.border}}
                                    tickLine={false}/>
                                <YAxis
                                    tickFormatter={(v: number) => `${v}%`}
                                    tick={{
                                        fill: t.muted,
                                        fontSize: 11,
                                        fontFamily: "'Space Mono', monospace",
                                    }}
                                    axisLine={{stroke: t.border}}
                                    tickLine={false}
                                    width={46}/>
                                <Tooltip
                                    content={
                                        (props: {
                                            active?: boolean;
                                            payload?: readonly TooltipPayloadItem[];
                                            label?: string | number,
                                        }) => (<CustomTooltip {...props} visible={visible}/>)}
                                    cursor={{
                                        stroke: t.cursor,
                                        strokeWidth: 1,
                                    }}/>
                                {
                                    LANGUAGES.map(lang => (
                                        <Line
                                            key={lang.name}
                                            type="monotone"
                                            dataKey={lang.name}
                                            stroke={lang.color}
                                            strokeWidth={visible.has(lang.name) ? 2 : 0}
                                            dot={
                                                visible.has(lang.name)
                                                    ? {r: 3, fill: lang.color, strokeWidth: 0}
                                                    : false
                                            }
                                            activeDot={
                                                visible.has(lang.name)
                                                    ? {r: 5, fill: lang.color, strokeWidth: 0}
                                                    : false
                                            }
                                            connectNulls={false}
                                            opacity={visible.has(lang.name) ? 1 : 0}
                                            isAnimationActive
                                            animationDuration={400}/>
                                    ))
                                }
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div
                        className={`
                            mt-2.5
                            text-[10px]
                            text-right
                            font-mono
                            tracking-[0.03em]
                            transition-colors
                            duration-300
                        `}
                        style={{color: 'var(--muted-faint)'}}>
                        Source: Stack Overflow Annual Developer Survey ·
                        survey.stackoverflow.co ·
                        % of all respondents
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>
);
