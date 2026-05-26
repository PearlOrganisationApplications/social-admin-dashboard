import React from "react";
import { 
  Users, Heart, Zap, AlertTriangle, 
  TrendingUp, Calendar, ArrowUpRight, 
  ArrowDownRight, MoreHorizontal, Activity 
} from "lucide-react";

// Data with added Icons and Colors
const stats = [
    { label: "New Members (24h)", value: "326", delta: "+12.4%", trend: [6, 8, 7, 9, 10, 12, 14], icon: <Users size={20} />, color: "#6366f1" },
    { label: "Successful Matches", value: "1,192", delta: "+8.1%", trend: [9, 10, 11, 10, 12, 13, 15], icon: <Heart size={20} />, color: "#ec4899" },
    { label: "Premium Conversions", value: "87", delta: "+5.3%", trend: [3, 4, 4, 5, 6, 6, 7], icon: <Zap size={20} />, color: "#f59e0b" },
    { label: "Flagged Profiles", value: "14", delta: "-2.8%", trend: [6, 6, 5, 4, 4, 3, 3], icon: <AlertTriangle size={20} />, danger: true, color: "#ef4444" },
];

const engagementData = [42, 48, 44, 61, 58, 69, 77];
const engagementDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const conversionFunnel = [
    { stage: "Profile Viewed", count: "18.2k", width: 100, color: "#6366f1" },
    { stage: "Like Sent", count: "9.4k", width: 74, color: "#818cf8" },
    { stage: "Mutual Match", count: "3.8k", width: 52, color: "#a5b4fc" },
    { stage: "First Chat", count: "1.6k", width: 33, color: "#c7d2fe" },
    { stage: "Premium Upgrade", count: "410", width: 18, color: "#e0e7ff" },
];

const activityFeed = [
    { text: "210 users completed profile verification in the last hour.", time: "12 min ago", type: "success" },
    { text: "Auto moderation removed 32 risky messages from chat rooms.", time: "45 min ago", type: "warning" },
    { text: "Delhi and Bengaluru crossed 80% response-rate on match prompts.", time: "2 hours ago", type: "info" },
    { text: "Push campaign ‘Weekend Spark’ generated 1.8x click-through rate.", time: "5 hours ago", type: "info" },
];

// Optimized Chart logic
const toPoints = (series) =>
    series
        .map((value, index) => {
            const x = index * 54;
            const y = 80 - (value * 0.8); // Adjusted scaling
            return `${x},${y}`;
        })
        .join(" ");

export default function DashboardOverview() {
    return (
        <div className="dashboard-wrapper">
            <style>{`
                :root {
                    --bg-body: #f8fafc;
                    --card-bg: #ffffff;
                    --primary: #6366f1;
                    --text-main: #1e293b;
                    --text-muted: #64748b;
                    --border: #e2e8f0;
                    --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                }

                .dashboard-wrapper {
                    background-color: var(--bg-body);
                    padding: 24px;
                    min-height: 100vh;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    color: var(--text-main);
                }

                .header-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .header-section h1 { font-size: 24px; font-weight: 700; margin: 0; color: #0f172a; }
                .header-section p { color: var(--text-muted); margin: 4px 0 0 0; }

                .date-picker {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: white;
                    padding: 8px 16px;
                    border-radius: 8px;
                    border: 1px solid var(--border);
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 20px;
                    margin-bottom: 32px;
                }

                .stat-card {
                    background: var(--card-bg);
                    padding: 20px;
                    border-radius: 16px;
                    border: 1px solid var(--border);
                    box-shadow: var(--shadow);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .stat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }

                .stat-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 16px;
                }

                .icon-box {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-info p { font-size: 14px; color: var(--text-muted); margin: 0; }
                .stat-info h3 { font-size: 28px; font-weight: 700; margin: 8px 0; letter-spacing: -0.5px; }

                .delta {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    padding: 4px 8px;
                    border-radius: 20px;
                }
                .delta.up { background: #f0fdf4; color: #16a34a; }
                .delta.down { background: #fef2f2; color: #dc2626; }

                .mini-trend-container {
                    display: flex;
                    align-items: flex-end;
                    gap: 4px;
                    height: 40px;
                    margin-top: 16px;
                }

                .mini-bar {
                    flex: 1;
                    border-radius: 2px;
                    background: var(--primary);
                    opacity: 0.3;
                    transition: opacity 0.2s;
                }
                .mini-bar.danger { background: #ef4444; }
                .stat-card:hover .mini-bar { opacity: 1; }

                /* Main Content Grid */
                .main-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 24px;
                    margin-bottom: 24px;
                }

                .panel-card {
                    background: white;
                    border-radius: 16px;
                    border: 1px solid var(--border);
                    padding: 24px;
                    box-shadow: var(--shadow);
                }

                .panel-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .panel-header h2 { font-size: 18px; font-weight: 600; margin: 0; }
                .panel-header span { font-size: 12px; color: var(--text-muted); }

                /* Chart Styles */
                .chart-container { position: relative; padding: 10px 0; }
                .line-chart-svg { width: 100%; height: 200px; overflow: visible; }
                .line-path { stroke: var(--primary); stroke-width: 3; fill: none; stroke-linecap: round; }
                .area-path { fill: url(#gradient); }
                
                .chart-labels {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 16px;
                    color: var(--text-muted);
                    font-size: 12px;
                }

                /* Funnel Styles */
                .funnel-list { display: flex; flex-direction: column; gap: 16px; }
                .funnel-row { width: 100%; }
                .funnel-meta { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
                .funnel-bar-bg { background: #f1f5f9; height: 8px; border-radius: 4px; overflow: hidden; }
                .funnel-bar-fill { height: 100%; border-radius: 4px; transition: width 1s ease-in-out; }

                /* Activity Feed */
                .activity-list { list-style: none; padding: 0; margin: 0; }
                .activity-item {
                    display: flex;
                    gap: 16px;
                    padding: 16px 0;
                    border-bottom: 1px solid var(--border);
                }
                .activity-item:last-child { border: none; }
                .activity-dot { min-width: 10px; height: 10px; border-radius: 50%; background: var(--primary); margin-top: 5px; }
                .activity-content p { font-size: 14px; margin: 0; line-height: 1.5; color: #334155; }
                .activity-content span { font-size: 12px; color: var(--text-muted); }

                /* Mobile Responsive */
                @media (max-width: 1024px) {
                    .main-grid { grid-template-columns: 1fr; }
                }

                @media (max-width: 640px) {
                    .dashboard-wrapper { padding: 16px; }
                    .header-section { flex-direction: column; align-items: flex-start; }
                }
            `}</style>

            <header className="header-section">
                <div>
                    <h1>Dating Admin Insights</h1>
                    <p>Real-time analytics & platform health</p>
                </div>
                <div className="date-picker">
                    <Calendar size={18} />
                    <span>Last 7 Days (May 14 - May 21)</span>
                </div>
            </header>

            <div className="stats-grid">
                {stats.map((item) => (
                    <article key={item.label} className="stat-card">
                        <div className="stat-header">
                            <div className="icon-box" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                {item.icon}
                            </div>
                            <span className={`delta ${item.danger ? "down" : "up"}`}>
                                {item.danger ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                                {item.delta}
                            </span>
                        </div>
                        <div className="stat-info">
                            <p>{item.label}</p>
                            <h3>{item.value}</h3>
                        </div>
                        <div className="mini-trend-container">
                            {item.trend.map((point, i) => (
                                <div
                                    key={i}
                                    style={{ 
                                        height: `${point * 4}px`, 
                                        backgroundColor: item.danger ? '#ef4444' : item.color,
                                        opacity: 0.3 + (i * 0.1) // Gradient effect on bars
                                    }}
                                    className="mini-bar"
                                />
                            ))}
                        </div>
                    </article>
                ))}
            </div>

            <div className="main-grid">
                {/* Engagement Chart */}
                <article className="panel-card">
                    <div className="panel-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Activity size={20} color="var(--primary)" />
                            <h2>Weekly Engagement Trend</h2>
                        </div>
                        <span>Live • Updated 5 min ago</span>
                    </div>
                    <div className="chart-container">
                        <svg viewBox="0 0 324 100" className="line-chart-svg">
                            <defs>
                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path className="area-path" d={`M 0,100 ${toPoints(engagementData)} L 324,100 Z`} />
                            <polyline className="line-path" points={toPoints(engagementData)} />
                        </svg>
                        <div className="chart-labels">
                            {engagementDays.map((day) => (
                                <span key={day}>{day}</span>
                            ))}
                        </div>
                    </div>
                </article>

                {/* Conversion Funnel */}
                <article className="panel-card">
                    <div className="panel-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={20} color="#ec4899" />
                            <h2>User Journey</h2>
                        </div>
                        <MoreHorizontal size={20} color="var(--text-muted)" />
                    </div>
                    <div className="funnel-list">
                        {conversionFunnel.map((item) => (
                            <div key={item.stage} className="funnel-row">
                                <div className="funnel-meta">
                                    <span style={{ fontWeight: 500 }}>{item.stage}</span>
                                    <span style={{ fontWeight: 700 }}>{item.count}</span>
                                </div>
                                <div className="funnel-bar-bg">
                                    <div 
                                        className="funnel-bar-fill" 
                                        style={{ width: `${item.width}%`, backgroundColor: item.color }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </div>

            {/* Operational Highlights */}
            <article className="panel-card">
                <div className="panel-header">
                    <h2>Operational Highlights</h2>
                    <span className="date-picker" style={{ padding: '4px 12px' }}>Today</span>
                </div>
                <ul className="activity-list">
                    {activityFeed.map((item, i) => (
                        <li key={i} className="activity-item">
                            <div className="activity-dot" style={{ 
                                backgroundColor: item.type === 'success' ? '#22c55e' : item.type === 'warning' ? '#ef4444' : '#6366f1' 
                            }} />
                            <div className="activity-content">
                                <p>{item.text}</p>
                                <span>{item.time}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    );
}