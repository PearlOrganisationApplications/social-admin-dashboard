import { useState } from "react";
import {
  Shield,
  Megaphone,
  Eye,
  Lock,
  Clock3,
  ClipboardList,
  Mail,
  CalendarDays,
  Rocket,
  Heart,
  BadgePercent,
  Search,
} from "lucide-react";

const COLORS = {
  yellow: "#F5C518",
  bg: "#050505",
  card: "#0D0D0D",
  soft: "#111111",
  border: "rgba(245,197,24,0.12)",
  text: "#FFFFFF",
  muted: "#8E8E8E",
};

const styles = {
  wrap: {
    fontFamily: "'DM Sans', sans-serif",
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    padding: "28px",
  },

  header: {
    marginBottom: "26px",
  },

  title: {
    fontSize: "34px",
    fontWeight: 700,
    marginBottom: "6px",
    letterSpacing: "-0.5px",
  },

  desc: {
    color: COLORS.muted,
    fontSize: "14px",
  },

  tabBar: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
  },

  tab: (active) => ({
    padding: "10px 18px",
    borderRadius: "12px",
    border: active
      ? `1px solid ${COLORS.yellow}`
      : `1px solid ${COLORS.border}`,
    background: active ? "rgba(245,197,24,0.12)" : COLORS.soft,
    color: active ? COLORS.yellow : COLORS.muted,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "0.2s",
  }),

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
    marginBottom: "28px",
  },

  statCard: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "18px",
    padding: "18px",
  },

  statLabel: {
    fontSize: "13px",
    color: COLORS.muted,
    marginBottom: "8px",
  },

  statValue: {
    fontSize: "30px",
    fontWeight: 700,
  },

  statSub: {
    marginTop: "4px",
    fontSize: "12px",
    color: COLORS.muted,
  },

  sectionTitle: {
    fontSize: "12px",
    letterSpacing: "1px",
    color: COLORS.yellow,
    marginBottom: "14px",
    fontWeight: 700,
    textTransform: "uppercase",
  },

  card: {
    background: COLORS.card,
    borderRadius: "20px",
    border: `1px solid ${COLORS.border}`,
    overflow: "hidden",
    marginBottom: "24px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px",
    borderBottom: `1px solid ${COLORS.border}`,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  iconBox: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    background: "rgba(245,197,24,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.yellow,
  },

  rowTitle: {
    fontSize: "15px",
    fontWeight: 600,
  },

  rowDesc: {
    marginTop: "3px",
    fontSize: "13px",
    color: COLORS.muted,
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  badge: (type) => ({
    background:
      type === "active"
        ? "rgba(0,255,128,0.12)"
        : "rgba(245,197,24,0.12)",
    color: type === "active" ? "#2ECC71" : COLORS.yellow,
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
  }),

  btn: {
    background: "transparent",
    border: `1px solid ${COLORS.border}`,
    color: COLORS.text,
    padding: "8px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
  },

  search: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    padding: "14px 16px",
    borderRadius: "14px",
    marginBottom: "22px",
  },

  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: COLORS.text,
    width: "100%",
    fontSize: "14px",
  },
};

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 46,
        height: 24,
        borderRadius: 999,
        background: checked ? COLORS.yellow : "#2A2A2A",
        position: "relative",
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          position: "absolute",
          top: 3,
          left: checked ? 24 : 4,
          transition: "0.2s",
        }}
      />
    </div>
  );
}

function Row({
  icon,
  title,
  desc,
  badge,
  button,
  toggle,
  checked,
  onToggle,
  isLast,
}) {
  return (
    <div
      style={{
        ...styles.row,
        borderBottom: isLast ? "none" : `1px solid ${COLORS.border}`,
      }}
    >
      <div style={styles.left}>
        <div style={styles.iconBox}>{icon}</div>

        <div>
          <div style={styles.rowTitle}>{title}</div>
          <div style={styles.rowDesc}>{desc}</div>
        </div>
      </div>

      <div style={styles.right}>
        {badge && <div style={styles.badge(badge)}>{badge}</div>}

        {button && <button style={styles.btn}>{button}</button>}

        {toggle && (
          <Toggle checked={checked} onChange={onToggle} />
        )}
      </div>
    </div>
  );
}

function RolesPanel() {
  const [permissions, setPermissions] = useState({
    tfa: true,
    timeout: true,
    audit: false,
  });

  return (
    <>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Admins</div>
          <div style={styles.statValue}>12</div>
          <div style={styles.statSub}>3 roles configured</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Last Updated</div>
          <div style={styles.statValue}>2d</div>
          <div style={styles.statSub}>Updated by you</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Pending Invites</div>
          <div style={styles.statValue}>4</div>
          <div style={styles.statSub}>Awaiting acceptance</div>
        </div>
      </div>

      <div style={styles.sectionTitle}>Roles & Permissions</div>

      <div style={styles.card}>
        <Row
          icon={<Shield size={18} />}
          title="Support Team"
          desc="View tickets, respond to users, read-only CRM"
          badge="active"
          button="Edit"
        />

        <Row
          icon={<Megaphone size={18} />}
          title="Marketing"
          desc="Campaign creation, analytics dashboard"
          badge="active"
          button="Edit"
        />

        <Row
          icon={<Eye size={18} />}
          title="Moderators"
          desc="Flag content, suspend accounts"
          badge="draft"
          button="Edit"
          isLast
        />
      </div>

      <div style={styles.sectionTitle}>Global Permissions</div>

      <div style={styles.card}>
        <Row
          icon={<Lock size={18} />}
          title="Two-factor Authentication"
          desc="Require 2FA for all admin accounts"
          toggle
          checked={permissions.tfa}
          onToggle={() =>
            setPermissions({
              ...permissions,
              tfa: !permissions.tfa,
            })
          }
        />

        <Row
          icon={<Clock3 size={18} />}
          title="Session Timeout"
          desc="Auto logout after inactivity"
          toggle
          checked={permissions.timeout}
          onToggle={() =>
            setPermissions({
              ...permissions,
              timeout: !permissions.timeout,
            })
          }
        />

        <Row
          icon={<ClipboardList size={18} />}
          title="Audit Logging"
          desc="Track admin activities"
          toggle
          checked={permissions.audit}
          onToggle={() =>
            setPermissions({
              ...permissions,
              audit: !permissions.audit,
            })
          }
          isLast
        />
      </div>
    </>
  );
}

function EmailPanel() {
  return (
    <>
      <div style={styles.sectionTitle}>Email Templates</div>

      <div style={styles.card}>
        <Row
          icon={<Mail size={18} />}
          title="Welcome Email"
          desc="Sent instantly after signup"
          badge="active"
          button="Edit"
        />

        <Row
          icon={<CalendarDays size={18} />}
          title="Day 3 Check-in"
          desc="Setup guidance and onboarding"
          badge="active"
          button="Edit"
        />

        <Row
          icon={<Rocket size={18} />}
          title="Activation Nudge"
          desc="Reminder for inactive users"
          badge="draft"
          button="Edit"
          isLast
        />
      </div>
    </>
  );
}

function FlagsPanel() {
  const [search, setSearch] = useState("");

  const [flags, setFlags] = useState([
    {
      name: "AI Suggestions",
      desc: "Power users only",
      enabled: true,
    },
    {
      name: "Bulk Export",
      desc: "Enterprise plan",
      enabled: false,
    },
    {
      name: "Dark Mode Beta",
      desc: "Internal testers",
      enabled: true,
    },
  ]);

  const filtered = flags.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={styles.search}>
        <Search size={18} color={COLORS.muted} />

        <input
          style={styles.input}
          placeholder="Search feature flags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.sectionTitle}>Feature Flags</div>

      <div style={styles.card}>
        {filtered.map((flag, i) => (
          <Row
            key={flag.name}
            icon={<Heart size={18} />}
            title={flag.name}
            desc={flag.desc}
            toggle
            checked={flag.enabled}
            onToggle={() => {
              const updated = [...flags];
              updated[i].enabled = !updated[i].enabled;
              setFlags(updated);
            }}
            isLast={i === filtered.length - 1}
          />
        ))}
      </div>
    </>
  );
}

const TABS = [
  "Role Access",
  "Email Templates",
  "Feature Flags",
];

export default function SettingsPage() {
  const [active, setActive] = useState(0);

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={styles.title}>Platform Settings</div>

        <div style={styles.desc}>
          Manage admin roles, permissions, emails, and
          feature controls.
        </div>
      </div>

      <div style={styles.tabBar}>
        {TABS.map((tab, index) => (
          <button
            key={tab}
            style={styles.tab(active === index)}
            onClick={() => setActive(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === 0 && <RolesPanel />}
      {active === 1 && <EmailPanel />}
      {active === 2 && <FlagsPanel />}
    </div>
  );
}