import { ArrowUpIcon, ArrowDownIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function StockCard({ ticker, data }) {
    const isUp = data?.change >= 0;

    const bgGradient = isUp
        ? 'from-emerald-500/10 to-teal-500/5 hover:from-emerald-500/20 hover:to-teal-500/10 hover:border-emerald-500/30'
        : 'from-rose-500/10 to-pink-500/5 hover:from-rose-500/20 hover:to-pink-500/10 hover:border-rose-500/30';

    const borderColor = isUp ? 'border-emerald-500/20' : 'border-rose-500/20';
    const textColor = isUp ? 'text-emerald-400' : 'text-rose-400';
    const iconBg = isUp ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300';

    return (
        <div className={`relative group overflow-hidden rounded-2xl border ${borderColor} bg-gradient-to-br ${bgGradient} p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${isUp ? 'emerald' : 'rose'}-900/20`}>

            {/* Decorative Glow */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${isUp ? 'bg-emerald-400' : 'bg-rose-400'} group-hover:opacity-30 transition-opacity duration-500`}></div>

            <div className="relative z-10 flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                        {ticker}
                        {data?.percentChange > 5 && <SparklesIcon className="w-5 h-5 text-yellow-400 animate-pulse" />}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-1">
                        Real-Time Market Data
                    </p>
                </div>
                <div className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl backdrop-blur-md ${iconBg} shadow-inner`}>
                    {isUp ? <ArrowUpIcon className="w-5 h-5 md:w-6 md:h-6" /> : <ArrowDownIcon className="w-5 h-5 md:w-6 md:h-6" />}
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-2xl text-slate-400 font-light">$</span>
                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter drop-shadow-sm">
                        {data?.price?.toFixed(2) || '0.00'}
                    </span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className={`text-sm font-medium ${isUp ? 'text-slate-400' : 'text-slate-400'}`}>24h Change</span>
                <div className={`flex items-center gap-2 text-sm font-bold ${textColor}`}>
                    <span>{data?.change > 0 ? '+' : ''}{data?.change?.toFixed(2)}</span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs backdrop-blur-sm ${isUp ? 'bg-emerald-400/10' : 'bg-rose-400/10'} border border-${isUp ? 'emerald' : 'rose'}-400/10`}>
                        {data?.percentChange?.toFixed(2)}%
                    </span>
                </div>
            </div>

        </div>
    );
}
