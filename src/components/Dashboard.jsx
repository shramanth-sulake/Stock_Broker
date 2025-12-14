import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase.config';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { useStockSimulator } from '../hooks/useStockSimulator';
import StockCard from './StockCard';
import { PlusIcon, ArrowRightOnRectangleIcon, ChartBarIcon, MagnifyingGlassIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';

const AVAILABLE_STOCKS = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA', 'MSFT', 'AAPL', 'NFLX', 'AMD', 'INTC'];

export default function Dashboard() {
    const { currentUser, logout } = useAuth();
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Real-time price simulation
    const stockData = useStockSimulator(watchlist);

    // Fetch or Subscribe to User's watchlist from Firestore
    useEffect(() => {
        if (!currentUser) return;

        const userDocRef = doc(db, 'users', currentUser.uid);

        // Initial check to create doc if doesn't exist
        const checkAndCreateUser = async () => {
            try {
                const docSnap = await getDoc(userDocRef);
                if (!docSnap.exists()) {
                    await setDoc(userDocRef, { watchlist: [] });
                }
            } catch (e) {
                console.error("Error checking user doc:", e);
            }
        };
        checkAndCreateUser();

        // Listen for changes
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                setWatchlist(doc.data().watchlist || []);
            }
            setLoading(false);
        }, (error) => {
            console.error("Snapshot error:", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const handleAddStock = async (ticker) => {
        if (watchlist.length >= 5) {
            alert("Portfolio limit reached (Max 5).");
            return;
        }
        if (watchlist.includes(ticker)) return;

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                watchlist: arrayUnion(ticker)
            });
            setIsDropdownOpen(false);
            setSearchQuery('');
        } catch (error) {
            console.error("Error adding stock:", error);
            alert("Failed to add stock. Please check permissions.");
        }
    };

    const handleRemoveStock = async (ticker) => {
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, {
                watchlist: arrayRemove(ticker)
            });
        } catch (error) {
            console.error("Error removing stock:", error);
        }
    };

    const unusedStocks = AVAILABLE_STOCKS.filter(s => !watchlist.includes(s));
    const filteredStocks = unusedStocks.filter(ticker =>
        ticker.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

            {/* Top Navigation Bar */}
            <nav className="glass-panel sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-default">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-blue-400 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                                <ChartBarIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-400 tracking-tight">
                                    StockBroker
                                </h1>
                                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500 font-semibold hidden sm:flex items-center gap-1">
                                    <SparklesIcon className="w-2.5 h-2.5" />
                                    Premium Dashboard
                                </p>
                            </div>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="hidden md:flex flex-col items-end bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                                <span className="text-sm font-semibold text-white">{currentUser?.email}</span>
                                <span className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Live
                                </span>
                            </div>
                            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                            <button
                                onClick={() => logout()}
                                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-red-500/10"
                            >
                                <span className="text-sm font-semibold hidden sm:block">Sign Out</span>
                                <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6 animate-fade-in-up">
                    <div className="w-full md:w-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                            <span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Dashboard</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                            My Portfolio
                        </h2>
                        <p className="text-base md:text-lg text-slate-400 max-w-2xl flex items-center gap-2">
                            <span className="hidden sm:inline">📊</span>
                            Monitor your high-performance assets in real-time with live market data.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="relative z-20 w-full md:w-auto">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            disabled={watchlist.length >= 5}
                            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-blue-600/20"
                        >
                            <PlusIcon className="w-6 h-6" />
                            <span className="text-base">Add Asset ({watchlist.length}/5)</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                                    onClick={() => setIsDropdownOpen(false)}
                                ></div>

                                <div className="absolute right-0 mt-4 w-72 glass-panel rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/20 animate-fade-in slide-in-from-top-2 z-40">
                                    <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                                        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                            <SparklesIcon className="w-4 h-4 text-blue-400" />
                                            Available Markets
                                        </h3>
                                        <div className="relative">
                                            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                                            <input
                                                type="text"
                                                placeholder="Search stocks..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full bg-slate-900/70 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto custom-scrollbar p-2">
                                        {filteredStocks.length > 0 ? (
                                            filteredStocks.map(ticker => (
                                                <button
                                                    key={ticker}
                                                    onClick={() => handleAddStock(ticker)}
                                                    className="w-full text-left px-4 py-3.5 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 text-slate-300 hover:text-white text-sm transition-all rounded-xl flex items-center justify-between group border border-transparent hover:border-white/10"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                                            <span className="text-xs font-bold text-blue-400">{ticker.substring(0, 2)}</span>
                                                        </div>
                                                        <span className="font-bold">{ticker}</span>
                                                    </div>
                                                    <span className="text-xs px-2 py-1 rounded-lg bg-blue-500/20 text-blue-300 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                        + Add
                                                    </span>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-10 text-center">
                                                <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <MagnifyingGlassIcon className="w-6 h-6 text-slate-500" />
                                                </div>
                                                <p className="text-slate-500 text-sm">
                                                    {searchQuery ? 'No stocks found' : 'All available assets added'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-72 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {watchlist.length > 0 ? (
                            watchlist.map((ticker, index) => (
                                <div
                                    key={ticker}
                                    className="animate-fade-in-up hover:scale-105 transition-transform duration-300 relative group"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <button
                                        onClick={() => handleRemoveStock(ticker)}
                                        className="absolute -top-2 -right-2 z-20 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:shadow-red-500/50 scale-75 group-hover:scale-100"
                                        title="Remove Asset"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                    <StockCard
                                        ticker={ticker}
                                        data={stockData[ticker]}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-40 text-center rounded-3xl border-2 border-dashed border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden group hover:border-white/20 transition-all">
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="relative z-10">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                                        <ChartBarIcon className="w-12 h-12 text-blue-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                                        Start Building Your Portfolio
                                    </h3>
                                    <p className="text-slate-400 max-w-md mx-auto mb-10 text-base leading-relaxed">
                                        Select up to 5 high-growth stocks to track their real-time performance on your personal dashboard.
                                    </p>
                                    <button
                                        onClick={() => setIsDropdownOpen(true)}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all transform hover:scale-105"
                                    >
                                        <SparklesIcon className="w-5 h-5" />
                                        Browse Available Assets
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}