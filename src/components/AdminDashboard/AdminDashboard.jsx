import { useState } from "react";
import {
  LayoutGrid,
  Users,
  Milk,
  ShoppingCart,
  BarChart3,
  MessageCircle,
  Settings as SettingsIcon,
  HelpCircle,
  Bell,
  Search,
  LogOut,
  Menu,
  TrendingUp,
  TrendingDown,
  UserCheck,
  UserX,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Star,
  Download,
  MoreHorizontal,
  ClipboardList,
  MapPin,
  Sparkles,
  Banknote,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  ChevronRight,
  CreditCard,
  UserCircle,
  Lock,
  Languages,
  BookOpen,
  MessageSquare,
  Video,
  ExternalLink,
  Building2,
  Factory,
  Megaphone,
  KeyRound,
  FileWarning,
  Landmark,
  Server,
} from "lucide-react";
import "./AdminDashboard.css";
import logo from "../../assets/stackly_logo.webp"
import { useNavigate, useParams } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, view: "dashboard" },
  { label: "Suppliers", icon: Users, view: "suppliers" },
  { label: "Products & Catalog", icon: Milk, view: "products" },
  { label: "Orders", icon: ShoppingCart, view: "orders" },
  { label: "Analytics", icon: BarChart3, view: "analytics" },
  { label: "Messages", icon: MessageCircle, view: "messages" },
  { label: "Settings", icon: SettingsIcon, view: "settings" },
  { label: "Help & Support", icon: HelpCircle, view: "help" },
];

const STATS = [
  { label: "Platform Revenue (MTD)", value: "₹2.14Cr", up: true, icon: Banknote },
  { label: "Active Suppliers", value: "46", up: true, icon: Factory },
  { label: "Total Products (Platform)", value: "186", up: true, icon: Milk },
  { label: "Pending Approvals", value: "19", up: true, icon: UserCheck },
  { label: "Orders Today", value: "612", up: true, icon: ShoppingCart },
  { label: "Open Quality Flags", value: "4", up: false, icon: ShieldAlert },
];

const RECENT_ORDERS = [
  { id: "#ORD-7041", operator: "Anand Milk Union", pilot: "Fresh Mart, Indiranagar", status: "Delivered", amount: "₹3,420", qty: "48 items", date: "Jun 28" },
  { id: "#ORD-7040", operator: "Krishna Dairy Farms", pilot: "Priya Reddy", status: "Out for Delivery", amount: "₹1,860", qty: "22 items", date: "Jun 28" },
  { id: "#ORD-7039", operator: "GreenPasture Co-op", pilot: "QuickBasket Stores", status: "Processing", amount: "₹5,120", qty: "64 items", date: "Jun 27" },
  { id: "#ORD-7038", operator: "Himalayan Fresh Dairy", pilot: "Rohan Kapoor", status: "Delivered", amount: "₹980", qty: "12 items", date: "Jun 27" },
  { id: "#ORD-7037", operator: "Nashik Dairy Collective", pilot: "Daily Needs Supermart", status: "Flagged", amount: "₹2,240", qty: "—", date: "Jun 26" },
  { id: "#ORD-7036", operator: "Anand Milk Union", pilot: "Meera Iyer", status: "Delivered", amount: "₹1,540", qty: "18 items", date: "Jun 26" },
  { id: "#ORD-7035", operator: "Sunrise Dairy Farms", pilot: "Fresh Mart, Indiranagar", status: "Out for Delivery", amount: "₹6,780", qty: "82 items", date: "Jun 25" },
  { id: "#ORD-7034", operator: "Krishna Dairy Farms", pilot: "Aditya Sharma", status: "Processing", amount: "₹760", qty: "9 items", date: "Jun 25" },
];

const TOP_SUPPLIERS = [
  { title: "Anand Milk Union", farmer: "Anand, Gujarat · 58 products", sales: 1420, percent: 96 },
  { title: "Krishna Dairy Farms", farmer: "Karnal, Haryana · 34 products", sales: 1046, percent: 78 },
  { title: "GreenPasture Co-op", farmer: "Nashik, Maharashtra · 27 products", sales: 812, percent: 61 },
  { title: "Himalayan Fresh Dairy", farmer: "Dehradun, Uttarakhand · 21 products", sales: 590, percent: 48 },
  { title: "Sunrise Dairy Farms", farmer: "Warangal, Telangana · 16 products", sales: 402, percent: 34 },
];

const ACTIVITY_FEED = [
  { icon: Factory, text: "New supplier \"Malwa Dairy Collective\" submitted onboarding documents", time: "12 minutes ago", tone: "info" },
  { icon: UserCheck, text: "Product listing \"A2 Cow Ghee 500g\" approved by Quality team", time: "1 hour ago", tone: "success" },
  { icon: ShieldAlert, text: "Order #ORD-7037 flagged for a temperature breach during transit", time: "3 hours ago", tone: "error" },
  { icon: Banknote, text: "Payout batch of ₹9.6L settled across 8 suppliers", time: "5 hours ago", tone: "success" },
  { icon: FileWarning, text: "FSSAI license renewal due for 3 suppliers", time: "Yesterday", tone: "green" },
  { icon: UserX, text: "Supplier application rejected — incomplete cold storage certification", time: "Yesterday", tone: "error" },
  { icon: Server, text: "Scheduled maintenance completed on ordering API", time: "2 days ago", tone: "info" },
];

const UPCOMING_TASKS = [
  { title: "Review 19 pending product listings", date: "Today, 3:00 PM", priority: "High" },
  { title: "Quarterly food safety compliance report due", date: "Jul 1", priority: "High" },
  { title: "Renew platform cold-chain insurance", date: "Jul 3", priority: "Medium" },
  { title: "Supplier contract renewal — Krishna Dairy Farms", date: "Jul 6", priority: "Medium" },
  { title: "Security audit — admin access logs", date: "Jul 9", priority: "High" },
  { title: "Onboard Malwa Dairy Collective as new supplier", date: "Jul 11", priority: "Low" },
];

const PENDING_APPROVALS = [
  { name: "A2 Cow Ghee 500g", region: "Anand Milk Union · Product", plots: "New listing", joined: "Submitted 4 hours ago" },
  { name: "Malwa Dairy Collective", region: "Indore · Supplier", plots: "New supplier", joined: "Submitted 1 day ago" },
  { name: "Paneer Fresh Block 200g", region: "Krishna Dairy Farms · Product", plots: "New listing", joined: "Submitted 3 days ago" },
  { name: "Flavoured Yogurt Cup (Mango)", region: "Sunrise Dairy Farms · SKU", plots: "New SKU", joined: "Submitted 5 days ago" },
];

const ESCALATIONS = [
  { crop: "Toned Milk 1L · Krishna Dairy Farms", reviewer: "Escalated by Support L2", rating: 2, text: "Customer reported a sour smell and early spoilage before the printed expiry date." },
  { crop: "Paneer Fresh Block 200g · Anand Milk Union", reviewer: "Escalated by Quality", rating: 3, text: "Batch tested slightly below the fat content stated on the label." },
  { crop: "Curd Cup 400g · GreenPasture Co-op", reviewer: "Escalated by Support L1", rating: 4, text: "Minor packaging seal issue on a small batch, resolved after supplier review." },
];

const PRODUCTS_BY_CATEGORY = [
  { genre: "Milk & Cream", percent: 34 },
  { genre: "Cheese & Paneer", percent: 24 },
  { genre: "Yogurt & Curd", percent: 20 },
  { genre: "Butter & Ghee", percent: 14 },
  { genre: "Ice Cream & Desserts", percent: 8 },
];

const DISTRIBUTION_HUBS = [
  { region: "Anand Cold Storage Hub, Gujarat", farmers: 58, crop: "4 processing units active", health: 95 },
  { region: "Karnal Collection Centre, Haryana", farmers: 34, crop: "3 processing units active", health: 90 },
  { region: "Nashik Distribution Hub, Maharashtra", farmers: 27, crop: "2 processing units active", health: 88 },
  { region: "Patna Chilling Centre, Bihar", farmers: 12, crop: "1 processing unit active", health: 74 },
  { region: "Warangal Collection Point, Telangana", farmers: 16, crop: "1 processing unit active", health: 81 },
  { region: "Jaipur Cold Chain Hub, Rajasthan", farmers: 9, crop: "1 processing unit active", health: 77 },
];

const MESSAGES_PREVIEW = [
  { name: "Quality Team", snippet: "3 suppliers still pending their Q3 lab test submission.", time: "10m", unread: true },
  { name: "Krishna Dairy Farms — Ops", snippet: "Requesting an extension on the cold storage certification deadline.", time: "1h", unread: true },
  { name: "Support Escalations", snippet: "Ticket #4821 needs admin sign-off before refund.", time: "3h", unread: false },
  { name: "Finance Desk", snippet: "Payout batch for Jun 28 is ready for your approval.", time: "Yesterday", unread: false },
];

const CERTIFICATIONS = [
  { label: "FSSAI Platform License", status: "Active", expiry: "Mar 2027" },
  { label: "ISO 22000 Food Safety Certification", status: "Active", expiry: "Nov 2026" },
  { label: "Cold Chain Compliance Audit", status: "Renewal Due", expiry: "Jul 2026" },
  { label: "Platform Data Protection Audit", status: "Active", expiry: "Jan 2027" },
];

/* ── Suppliers page (platform-wide roster + approvals) ── */
const ALL_SUPPLIERS = [
  { name: "Anand Milk Union", region: "Anand, Gujarat", crop: "Milk, Cream", plots: 58, rating: 4.8, status: "Active" },
  { name: "Krishna Dairy Farms", region: "Karnal, Haryana", crop: "Paneer, Curd", plots: 34, rating: 4.6, status: "Active" },
  { name: "GreenPasture Co-op", region: "Nashik, Maharashtra", crop: "Butter, Ghee", plots: 27, rating: 4.9, status: "Active" },
  { name: "Himalayan Fresh Dairy", region: "Dehradun, Uttarakhand", crop: "Cheese, Cream", plots: 21, rating: 4.9, status: "Suspended" },
  { name: "Malwa Dairy Collective", region: "Indore, Madhya Pradesh", crop: "Milk, Yogurt", plots: 12, rating: 4.4, status: "Pending" },
  { name: "Sunrise Dairy Farms", region: "Warangal, Telangana", crop: "Ice Cream, Yogurt", plots: 16, rating: 4.5, status: "Pending" },
  { name: "Bloom Valley Farms", region: "Pune, Maharashtra", crop: "Cheese", plots: 9, rating: 4.3, status: "Pending" },
  { name: "Riverbend Dairy", region: "Karnal, Haryana", crop: "Ghee, Butter", plots: 14, rating: 4.2, status: "Pending" },
  { name: "Golden Meadow Dairy", region: "Nashik, Maharashtra", crop: "Milk, Paneer", plots: 19, rating: 4.7, status: "Active" },
];

/* ── Products & Catalog page (platform-wide, approval status) ── */
const PRODUCT_CATALOG = [
  { name: "Farm Fresh Toned Milk 1L", category: "Milk & Cream", farmers: "Anand Milk Union", stock: "Approved", price: "₹58/litre" },
  { name: "A2 Cow Ghee 500g", category: "Butter & Ghee", farmers: "GreenPasture Co-op", stock: "Approved", price: "₹680/jar" },
  { name: "Malai Paneer Block 200g", category: "Cheese & Paneer", farmers: "Krishna Dairy Farms", stock: "Under Review", price: "₹90/pack" },
  { name: "Fresh Curd Cup 400g", category: "Yogurt & Curd", farmers: "Anand Milk Union", stock: "Approved", price: "₹45/cup" },
  { name: "Salted Table Butter 500g", category: "Butter & Ghee", farmers: "Himalayan Fresh Dairy", stock: "Flagged", price: "₹255/pack" },
  { name: "Vanilla Ice Cream Tub 1L", category: "Ice Cream & Desserts", farmers: "Sunrise Dairy Farms", stock: "Approved", price: "₹210/tub" },
  { name: "Flavoured Yogurt Cup (Mango)", category: "Yogurt & Curd", farmers: "GreenPasture Co-op", stock: "Approved", price: "₹35/cup" },
  { name: "Organic A2 Cow Milk 1L", category: "Milk & Cream", farmers: "Malwa Dairy Collective", stock: "Under Review", price: "₹95/litre" },
];

/* ── Analytics page ── */
const MONTHLY_REVENUE = [
  { month: "Jan", value: 98 }, { month: "Feb", value: 105 }, { month: "Mar", value: 112 },
  { month: "Apr", value: 118 }, { month: "May", value: 134 }, { month: "Jun", value: 149 },
  { month: "Jul", value: 156 }, { month: "Aug", value: 148 }, { month: "Sep", value: 141 },
  { month: "Oct", value: 163 }, { month: "Nov", value: 171 }, { month: "Dec", value: 182 },
];

const ANALYTICS_KPIS = [
  { label: "Platform On-Time Delivery Rate", value: "96.1%", note: "Across 46 suppliers" },
  { label: "Avg. Approval Turnaround", value: "1.4 days", note: "Down from 2.2 days" },
  { label: "Supplier Retention", value: "92%", note: "Up 3 pts YoY" },
  { label: "Quality Pass Rate", value: "98%", note: "4 open flags of 210 checks" },
];

/* ── Settings page (admin scope) ── */
const SETTINGS_GROUPS = [
  {
    title: "Admin Account",
    icon: UserCircle,
    items: [
      { label: "Profile details", desc: "Name, email, phone, admin role" },
      { label: "Admin team & roles", desc: "12 admins across Quality, Support, Finance" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { label: "Password", desc: "Last changed 2 months ago" },
      { label: "Two-factor authentication", desc: "Enabled via authenticator app" },
      { label: "Access logs", desc: "Review recent admin sign-ins" },
    ],
  },
  {
    title: "Platform Finance",
    icon: CreditCard,
    items: [
      { label: "Payout rules", desc: "Commission split and payout schedule" },
      { label: "Invoices & statements", desc: "View and download platform statements" },
    ],
  },
  {
    title: "Platform Preferences",
    icon: Languages,
    items: [
      { label: "Language", desc: "English (India)" },
      { label: "Notification rules", desc: "Escalation thresholds for quality alerts" },
    ],
  },
];

/* ── Help & Support page ── */
const FAQ_ITEMS = [
  { q: "How do I approve a new supplier?", a: "Go to Suppliers and review the pending approval, then verify FSSAI and cold storage certification documents before confirming." },
  { q: "How are quality flags triggered?", a: "Flags are raised automatically from lab test failures, expired certifications, or manual escalations from Support." },
  { q: "How do payouts get approved?", a: "Finance batches payouts weekly; an admin sign-off is required before funds are released to suppliers." },
  { q: "Who can manage admin roles?", a: "Only Super Admins can add or remove admin accounts, under Settings → Admin team & roles." },
];

const SUPPORT_CHANNELS = [
  { icon: Phone, label: "Call Platform Support", detail: "+91 1800 200 4000 · 9 AM–7 PM" },
  { icon: MessageSquare, label: "Live Chat", detail: "Avg. response time: 4 minutes" },
  { icon: Mail, label: "Email Admin Desk", detail: "admin-support@amritdairy.in" },
  { icon: Video, label: "Book an Ops Review", detail: "Walkthrough with platform team" },
];

const VIEW_HEADINGS = {
  dashboard: { title: "Platform overview 🥛", subtitle: "Here's what's happening across every dairy supplier on the platform today." },
  suppliers: { title: "Suppliers", subtitle: "Every dairy supplier on the platform, with approvals pending your review." },
  products: { title: "Products & Catalog", subtitle: "Products listed platform-wide, with approval status by supplier." },
  orders: { title: "Orders", subtitle: "Every order placed across all suppliers on the platform." },
  analytics: { title: "Analytics", subtitle: "Platform-wide performance, revenue, and quality trends." },
  messages: { title: "Messages", subtitle: "Conversations with suppliers, quality, finance, and support teams." },
  settings: { title: "Settings", subtitle: "Manage the admin team, security, payouts, and platform preferences." },
  help: { title: "Help & Support", subtitle: "Answers to common admin questions and ways to reach the platform team." },
};

function priorityClass(p) {
  if (p === "High") return "priority-pill high";
  if (p === "Medium") return "priority-pill medium";
  return "priority-pill low";
}

function statusClass(status) {
  switch (status) {
    case "Delivered": return "status-pill delivered";
    case "Out for Delivery": return "status-pill shipped";
    case "Processing": return "status-pill processing";
    case "Cancelled": return "status-pill cancelled";
    case "Flagged": return "status-pill cancelled";
    default: return "status-pill";
  }
}

function certClass(status) {
  return status === "Active" ? "cert-pill active" : "cert-pill due";
}

function toneClass(tone) {
  return `activity-icon ${tone}`;
}

function healthClass(h) {
  if (h >= 90) return "health-bar-fill excellent";
  if (h >= 80) return "health-bar-fill good";
  return "health-bar-fill fair";
}

function supplierStatusClass(status) {
  if (status === "Active") return "status-pill delivered";
  if (status === "Pending") return "status-pill processing";
  return "status-pill cancelled";
}

function stockClass(stock) {
  if (stock === "Approved") return "status-pill delivered";
  if (stock === "Under Review") return "status-pill processing";
  return "status-pill cancelled";
}

/* All placeholder buttons/links across the admin dashboard route to /404
   via useNavigate (client-side navigation, no full page reload). */
function DeadLink({ className, children, ariaLabel }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/404");
  };
  return (
    <a href="/404" className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // The active tab now lives in the URL (/admin-dashboard/:view) instead of
  // local component state. This is the key fix: local state is wiped out
  // whenever this component unmounts (e.g. when a notification click
  // navigates to /404). Reading the view from the URL means that when the
  // browser goes back one step in history, React Router restores the exact
  // URL you were on — Suppliers, Products, whatever — and this component
  // re-derives the correct tab instead of always resetting to "dashboard".
  const { view } = useParams();
  const activeView = VIEW_HEADINGS[view] ? view : "dashboard";

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  const goToView = (nextView) => {
    navigate(`/admin-dashboard/${nextView}`);
    setSidebarOpen(false);
  };

  return (
    <div className="dash-page">

      {sidebarOpen && <div className="dash-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`dash-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="dash-logo-area">
          <div className="dash-logo-placeholder" aria-label="Logo">
             <img src={logo} alt="" />
          </div>
          
        </div>

        <nav className="dash-nav">
          <span className="dash-nav-label">Admin Menu</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.view === activeView;
            return (
              <button
                type="button"
                key={item.label}
                className={`dash-nav-item${isActive ? " active" : ""}`}
                onClick={() => goToView(item.view)}
              >
                <Icon className="dash-nav-icon" />
                <span>{item.label}</span>
                {isActive && <span className="dash-nav-dot" />}
              </button>
            );
          })}
        </nav>

        <div className="dash-sidebar-footer">
          <button type="button" className="dash-nav-item logout" onClick={handleLogout}>
            <LogOut className="dash-nav-icon" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="dash-main">
        <header className="dash-topbar">
          <button className="dash-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu />
          </button>

          <div className="dash-search">
            <Search className="dash-search-icon" />
            <input type="text" placeholder="Search suppliers, products, orders…" />
          </div>

          <div className="dash-topbar-actions">
            <DeadLink className="dash-icon-btn" ariaLabel="Notifications">
              <Bell />
              <span className="dash-icon-badge" />
            </DeadLink>
          </div>
        </header>

        <main className="dash-content">
          <div className="dash-heading-row">
            <div>
              <h1>{VIEW_HEADINGS[activeView].title}</h1>
              <p>{VIEW_HEADINGS[activeView].subtitle}</p>
            </div>
            <div className="dash-heading-actions">
              <DeadLink className="dash-btn-secondary">
                <Download />
                Export Report
              </DeadLink>
            </div>
          </div>

          {activeView === "dashboard" && (
            <>
              <section className="dash-stats">
                {STATS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <DeadLink className="dash-stat-card" key={s.label}>
                      <div className="stat-top-row">
                        <span className="stat-label">{s.label}</span>
                        <span className="stat-icon"><Icon /></span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-value">{s.value}</span>
                        <span className={`stat-delta ${s.up ? "up" : "down"}`}>
                          {s.up ? <TrendingUp /> : <TrendingDown />}
                        </span>
                      </div>
                    </DeadLink>
                  );
                })}
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Recent Orders (All Suppliers)</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Order</th><th>Supplier</th><th>Customer</th><th>Items</th><th>Date</th><th>Status</th><th>Amount</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_ORDERS.map((o) => (
                          <tr key={o.id}>
                            <td className="muted">{o.id}</td>
                            <td className="strong">{o.operator}</td>
                            <td className="muted">{o.pilot}</td>
                            <td className="muted">{o.qty}</td>
                            <td className="muted">{o.date}</td>
                            <td><span className={statusClass(o.status)}>{o.status}</span></td>
                            <td className="strong">{o.amount}</td>
                            <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Top Suppliers</h2>
                    <DeadLink className="dash-panel-link">Details</DeadLink>
                  </div>
                  <ul className="top-list">
                    {TOP_SUPPLIERS.map((b) => (
                      <li key={b.title}>
                        <DeadLink className="dash-top-item">
                          <div className="top-item-text">
                            <span className="top-item-title">{b.title}</span>
                            <span className="top-item-author">{b.farmer}</span>
                          </div>
                          <div className="top-item-bar-wrap">
                            <div className="top-item-bar"><div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} /></div>
                            <span className="top-item-sales">{b.sales} orders</span>
                          </div>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Recent Activity</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="activity-list">
                    {ACTIVITY_FEED.map((a, i) => {
                      const Icon = a.icon;
                      return (
                        <li key={i}>
                          <DeadLink className="dash-activity-item">
                            <span className={toneClass(a.tone)}><Icon /></span>
                            <div className="activity-text">
                              <span>{a.text}</span>
                              <span className="activity-time"><Clock /> {a.time}</span>
                            </div>
                          </DeadLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Upcoming Tasks</h2>
                    <DeadLink className="dash-panel-link">Manage</DeadLink>
                  </div>
                  <ul className="task-list">
                    {UPCOMING_TASKS.map((t, i) => (
                      <li key={i}>
                        <DeadLink className="dash-task-item">
                          <span className="task-icon"><Calendar /></span>
                          <div className="task-text">
                            <span className="task-title">{t.title}</span>
                            <span className="task-date">{t.date}</span>
                          </div>
                          <span className={priorityClass(t.priority)}>{t.priority}</span>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panels dash-panels-three">
                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Pending Approvals</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="author-list">
                    {PENDING_APPROVALS.map((a) => (
                      <li key={a.name}>
                        <DeadLink className="dash-author-item">
                          <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                          <div className="author-text">
                            <span className="author-name">{a.name}</span>
                            <span className="author-meta">{a.region} · {a.plots}</span>
                          </div>
                          <span className="author-joined">{a.joined}</span>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Products by Category</h2>
                    <DeadLink className="dash-panel-link">Full report</DeadLink>
                  </div>
                  <ul className="genre-list">
                    {PRODUCTS_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row"><span className="genre-name">{g.genre}</span><span className="genre-percent">{g.percent}%</span></div>
                        <div className="genre-bar"><div className="genre-bar-fill" style={{ width: `${g.percent}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Escalations</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="review-list">
                    {ESCALATIONS.map((r, i) => (
                      <li key={i}>
                        <DeadLink className="dash-review-item">
                          <div className="review-top">
                            <span className="review-book">{r.crop}</span>
                            <span className="review-stars">
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star key={idx} className={idx < r.rating ? "filled" : ""} />
                              ))}
                            </span>
                          </div>
                          <p className="review-text">{r.text}</p>
                          <span className="review-by">— {r.reviewer}</span>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panels dash-panels-three">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Distribution Hubs</h2>
                    <DeadLink className="dash-panel-link">View map</DeadLink>
                  </div>
                  <ul className="cluster-list">
                    {DISTRIBUTION_HUBS.map((c) => (
                      <li key={c.region}>
                        <DeadLink className="dash-cluster-item">
                          <span className="cluster-pin"><MapPin /></span>
                          <div className="cluster-text">
                            <span className="cluster-name">{c.region}</span>
                            <span className="cluster-meta">{c.farmers} suppliers · {c.crop}</span>
                          </div>
                          <div className="cluster-health">
                            <div className="health-bar"><div className={healthClass(c.health)} style={{ width: `${c.health}%` }} /></div>
                            <span className="health-percent">{c.health}%</span>
                          </div>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Messages</h2>
                    <DeadLink className="dash-panel-link">Open inbox</DeadLink>
                  </div>
                  <ul className="message-list">
                    {MESSAGES_PREVIEW.map((m, i) => (
                      <li key={i}>
                        <DeadLink className="dash-message-item">
                          <span className="message-avatar">{m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                          <div className="message-text">
                            <div className="message-top"><span className="message-name">{m.name}</span><span className="message-time">{m.time}</span></div>
                            <span className="message-snippet">{m.snippet}</span>
                          </div>
                          {m.unread && <span className="message-dot" />}
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panel-card certifications-panel">
                <div className="panel-header">
                  <h2>Platform Certifications &amp; Compliance</h2>
                  <DeadLink className="dash-panel-link">Manage</DeadLink>
                </div>
                <div className="cert-grid">
                  {CERTIFICATIONS.map((c) => (
                    <DeadLink className="dash-cert-card" key={c.label}>
                      <div className="cert-top"><ClipboardList className="cert-icon" /><span className={certClass(c.status)}>{c.status}</span></div>
                      <span className="cert-label">{c.label}</span>
                      <span className="cert-expiry">Valid until {c.expiry}</span>
                    </DeadLink>
                  ))}
                </div>
              </section>

              <section className="dash-panel-card quick-actions">
                <div className="panel-header"><h2>Quick Actions</h2></div>
                <div className="quick-grid">
                  <DeadLink className="dash-quick-card"><UserCheck /><span>Approve Suppliers</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Milk /><span>Approve Products</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Building2 /><span>Manage Suppliers</span></DeadLink>
                  <DeadLink className="dash-quick-card"><ShieldCheck /><span>Quality Audit</span></DeadLink>
                  <DeadLink className="dash-quick-card"><BarChart3 /><span>Full Analytics</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Landmark /><span>Approve Payouts</span></DeadLink>
                  <DeadLink className="dash-quick-card"><MessageSquare /><span>Support Escalations</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Megaphone /><span>Broadcast Announcement</span></DeadLink>
                  <DeadLink className="dash-quick-card"><KeyRound /><span>Admin Access Logs</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Filter /><span>Quality Filters</span></DeadLink>
                  <DeadLink className="dash-quick-card"><RefreshCw /><span>Reprocess Flags</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Sparkles /><span>Platform Announcements</span></DeadLink>
                </div>
              </section>
            </>
          )}

          {activeView === "suppliers" && (
            <>
              <section className="dash-stats">
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Total Suppliers</span><span className="stat-icon"><Users /></span></div>
                  <div className="stat-row"><span className="stat-value">46</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Active</span><span className="stat-icon"><CheckCircle2 /></span></div>
                  <div className="stat-row"><span className="stat-value">36</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Pending Approval</span><span className="stat-icon"><UserCheck /></span></div>
                  <div className="stat-row"><span className="stat-value">19</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Suspended</span><span className="stat-icon"><UserX /></span></div>
                  <div className="stat-row"><span className="stat-value">3</span></div>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>All Suppliers (Platform-wide)</h2>
                  <DeadLink className="dash-panel-link">Export CSV</DeadLink>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead><tr><th>Supplier</th><th>Location</th><th>Product Lines</th><th>Products</th><th>Rating</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                      {ALL_SUPPLIERS.map((f) => (
                        <tr key={f.name}>
                          <td className="strong">{f.name}</td>
                          <td className="muted">{f.region}</td>
                          <td className="muted">{f.crop}</td>
                          <td className="muted">{f.plots}</td>
                          <td className="muted">★ {f.rating}</td>
                          <td><span className={supplierStatusClass(f.status)}>{f.status}</span></td>
                          <td>
                            {f.status === "Pending" ? (
                              <DeadLink className="dash-row-action" ariaLabel="Approve supplier"><UserCheck /></DeadLink>
                            ) : (
                              <DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeView === "products" && (
            <>
              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Product Catalog (Platform-wide)</h2>
                    <DeadLink className="dash-panel-link">Review Submissions</DeadLink>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead><tr><th>Product</th><th>Category</th><th>Supplier</th><th>Approval</th><th>Price</th><th></th></tr></thead>
                      <tbody>
                        {PRODUCT_CATALOG.map((c) => (
                          <tr key={c.name}>
                            <td className="strong">{c.name}</td>
                            <td className="muted">{c.category}</td>
                            <td className="muted">{c.farmers}</td>
                            <td><span className={stockClass(c.stock)}>{c.stock}</span></td>
                            <td className="strong">{c.price}</td>
                            <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Products by Category</h2>
                    <DeadLink className="dash-panel-link">Full report</DeadLink>
                  </div>
                  <ul className="genre-list">
                    {PRODUCTS_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row"><span className="genre-name">{g.genre}</span><span className="genre-percent">{g.percent}%</span></div>
                        <div className="genre-bar"><div className="genre-bar-fill" style={{ width: `${g.percent}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>Hub Compliance Health</h2>
                  <DeadLink className="dash-panel-link">View map</DeadLink>
                </div>
                <ul className="cluster-list">
                  {DISTRIBUTION_HUBS.map((c) => (
                    <li key={c.region}>
                      <DeadLink className="dash-cluster-item">
                        <span className="cluster-pin"><ShieldCheck /></span>
                        <div className="cluster-text">
                          <span className="cluster-name">{c.region}</span>
                          <span className="cluster-meta">{c.farmers} suppliers · {c.crop}</span>
                        </div>
                        <div className="cluster-health">
                          <div className="health-bar"><div className={healthClass(c.health)} style={{ width: `${c.health}%` }} /></div>
                          <span className="health-percent">{c.health}%</span>
                        </div>
                      </DeadLink>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {activeView === "orders" && (
            <section className="dash-panel-card">
              <div className="panel-header">
                <h2>All Orders (Platform-wide)</h2>
                <DeadLink className="dash-panel-link">Export CSV</DeadLink>
              </div>
              <div className="table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Order</th><th>Supplier</th><th>Customer</th><th>Items</th><th>Date</th><th>Status</th><th>Amount</th><th></th></tr></thead>
                  <tbody>
                    {RECENT_ORDERS.map((o) => (
                      <tr key={o.id}>
                        <td className="muted">{o.id}</td>
                        <td className="strong">{o.operator}</td>
                        <td className="muted">{o.pilot}</td>
                        <td className="muted">{o.qty}</td>
                        <td className="muted">{o.date}</td>
                        <td><span className={statusClass(o.status)}>{o.status}</span></td>
                        <td className="strong">{o.amount}</td>
                        <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeView === "analytics" && (
            <>
              <section className="dash-stats">
                {ANALYTICS_KPIS.map((k) => (
                  <div className="dash-stat-card" key={k.label}>
                    <div className="stat-top-row"><span className="stat-label">{k.label}</span><span className="stat-icon"><BarChart3 /></span></div>
                    <div className="stat-row"><span className="stat-value">{k.value}</span></div>
                    <span className="cert-expiry">{k.note}</span>
                  </div>
                ))}
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>Monthly Platform Revenue (₹ Lakhs)</h2>
                  <DeadLink className="dash-panel-link">Export Report</DeadLink>
                </div>
                <div className="bar-chart">
                  {MONTHLY_REVENUE.map((m) => (
                    <div className="bar-chart-col" key={m.month}>
                      <div className="bar-chart-bar-wrap">
                        <div className="bar-chart-bar" style={{ height: `${(m.value / 200) * 100}%` }} title={`₹${m.value}L`} />
                      </div>
                      <span className="bar-chart-label">{m.month}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Top Suppliers by Revenue</h2>
                    <DeadLink className="dash-panel-link">Details</DeadLink>
                  </div>
                  <ul className="top-list">
                    {TOP_SUPPLIERS.map((b) => (
                      <li key={b.title}>
                        <DeadLink className="dash-top-item">
                          <div className="top-item-text"><span className="top-item-title">{b.title}</span><span className="top-item-author">{b.farmer}</span></div>
                          <div className="top-item-bar-wrap">
                            <div className="top-item-bar"><div className="top-item-bar-fill" style={{ width: `${b.percent}%` }} /></div>
                            <span className="top-item-sales">{b.sales} orders</span>
                          </div>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Products by Category</h2>
                    <DeadLink className="dash-panel-link">Full report</DeadLink>
                  </div>
                  <ul className="genre-list">
                    {PRODUCTS_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row"><span className="genre-name">{g.genre}</span><span className="genre-percent">{g.percent}%</span></div>
                        <div className="genre-bar"><div className="genre-bar-fill" style={{ width: `${g.percent}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </>
          )}

          {activeView === "messages" && (
            <section className="dash-panel-card">
              <div className="panel-header">
                <h2>Inbox</h2>
                <DeadLink className="dash-panel-link"><Mail style={{ marginRight: "0.3rem", verticalAlign: "-2px", width: "1em", height: "1em" }} />New Message</DeadLink>
              </div>
              <ul className="message-list">
                {MESSAGES_PREVIEW.concat(MESSAGES_PREVIEW.map((m, i) => ({
                  ...m,
                  name: i === 0 ? "Nashik Dairy Collective — Ops" : i === 1 ? "Quality Team" : i === 2 ? "Finance Desk" : "Support Escalations",
                  unread: false,
                }))).map((m, i) => (
                  <li key={i}>
                    <DeadLink className="dash-message-item">
                      <span className="message-avatar">{m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                      <div className="message-text">
                        <div className="message-top"><span className="message-name">{m.name}</span><span className="message-time">{m.time}</span></div>
                        <span className="message-snippet">{m.snippet}</span>
                      </div>
                      {m.unread && <span className="message-dot" />}
                    </DeadLink>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeView === "settings" && (
            <section className="dash-panels-three settings-grid">
              {SETTINGS_GROUPS.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <div className="dash-panel-card" key={group.title}>
                    <div className="panel-header">
                      <h2><GroupIcon style={{ marginRight: "0.5rem", verticalAlign: "-3px", color: "var(--green)", width: "1em", height: "1em" }} />{group.title}</h2>
                    </div>
                    <ul className="settings-list">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <DeadLink className="dash-settings-item">
                            <div className="settings-text"><span className="settings-label">{item.label}</span><span className="settings-desc">{item.desc}</span></div>
                            <ChevronRight className="settings-chevron" />
                          </DeadLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </section>
          )}

          {activeView === "help" && (
            <section className="dash-panels">
              <div className="dash-panel-card panel-wide">
                <div className="panel-header">
                  <h2>Frequently Asked Questions</h2>
                  <DeadLink className="dash-panel-link"><BookOpen style={{ marginRight: "0.3rem", verticalAlign: "-2px", width: "1em", height: "1em" }} />Full Help Center</DeadLink>
                </div>
                <ul className="faq-list">
                  {FAQ_ITEMS.map((f) => (
                    <li key={f.q} className="faq-item">
                      <span className="faq-q">{f.q}</span>
                      <span className="faq-a">{f.a}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dash-panel-card">
                <div className="panel-header"><h2>Contact Us</h2></div>
                <ul className="support-list">
                  {SUPPORT_CHANNELS.map((s) => {
                    const SIcon = s.icon;
                    return (
                      <li key={s.label}>
                        <DeadLink className="dash-support-item">
                          <span className="support-icon"><SIcon /></span>
                          <div className="support-text"><span className="support-label">{s.label}</span><span className="support-detail">{s.detail}</span></div>
                          <ExternalLink className="settings-chevron" />
                        </DeadLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}