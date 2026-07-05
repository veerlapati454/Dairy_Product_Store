import { useState } from "react";
import {
  LayoutGrid,
  ShoppingCart,
  RefreshCw,
  Heart,
  CreditCard,
  MessageCircle,
  Settings as SettingsIcon,
  HelpCircle,
  Bell,
  Search,
  LogOut,
  Menu,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  MoreHorizontal,
  MapPin,
  Banknote,
  Tag,
  ChevronRight,
  UserCircle,
  Lock,
  Languages,
  BookOpen,
  MessageSquare,
  Smartphone,
  ExternalLink,
  Wallet,
  Gift,
  Repeat,
  Truck,
  Mail,
  Phone,
} from "lucide-react";
import "./UserDashboard.css";
import logo from "../../assets/stackly_logo.webp"
import { useNavigate, useParams } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutGrid, view: "dashboard" },
  { label: "My Orders", icon: ShoppingCart, view: "orders" },
  { label: "Subscriptions", icon: RefreshCw, view: "subscriptions" },
  { label: "Wishlist", icon: Heart, view: "wishlist" },
  { label: "Payments & Addresses", icon: CreditCard, view: "payments" },
  { label: "Messages", icon: MessageCircle, view: "messages" },
  { label: "Settings", icon: SettingsIcon, view: "settings" },
  { label: "Help & Support", icon: HelpCircle, view: "help" },
];

const STATS = [
  { label: "Active", value: "2", up: true, icon: RefreshCw },
  { label: "Orders This Month", value: "6", up: true, icon: ShoppingCart },
  { label: "Wallet Balance", value: "₹350", up: true, icon: Wallet },
  { label: "Loyalty Points", value: "1,240", up: true, icon: Star },
  { label: "Wishlist Items", value: "5", up: true, icon: Heart },
  { label: "Total Saved (MTD)", value: "₹640", up: true, icon: Tag },
];

const RECENT_ORDERS = [
  { id: "#ORD-9231", items: "2x Toned Milk 1L, 1x Curd 400g", status: "Delivered", amount: "₹163", date: "Jun 28" },
  { id: "#ORD-9230", items: "Weekly Milk Subscription (Mon–Sat)", status: "Out for Delivery", amount: "₹348", date: "Jun 28" },
  { id: "#ORD-9229", items: "A2 Cow Ghee 500g", status: "Processing", amount: "₹680", date: "Jun 27" },
  { id: "#ORD-9228", items: "Paneer 200g, Butter 500g", status: "Delivered", amount: "₹345", date: "Jun 26" },
  { id: "#ORD-9227", items: "Vanilla Ice Cream Tub 1L", status: "Cancelled", amount: "₹210", date: "Jun 25" },
  { id: "#ORD-9226", items: "Flavoured Yogurt Cup x4", status: "Delivered", amount: "₹140", date: "Jun 24" },
];

const ORDER_TRACKING = [
  { region: "#ORD-9230 · Out for Delivery", farmers: "ETA 5:00 PM", crop: "Your order has left the hub", health: 75 },
  { region: "#ORD-9229 · Processing", farmers: "Preparing", crop: "Being packed at Anand Milk Union", health: 30 },
];

const ACTIVE_SUBSCRIPTIONS = [
  { title: "Farm Fresh Toned Milk 1L", date: "Daily · 6:00 AM · Next: Tomorrow", priority: "Active" },
  { title: "Fresh Curd Cup 400g", date: "Alternate days · Next: Jul 7", priority: "Active" },
  { title: "Organic A2 Cow Milk 1L", date: "Weekly · Sundays · Currently paused", priority: "Paused" },
];

const UPCOMING_DELIVERIES = [
  { title: "Milk Subscription Delivery", date: "Today, 6:00 AM", priority: "High" },
  { title: "Order #ORD-9230 expected delivery", date: "Today, 5:00 PM", priority: "High" },
  { title: "Curd Subscription Delivery", date: "Jul 7, 6:00 AM", priority: "Medium" },
  { title: "Order #ORD-9229 expected delivery", date: "Jun 29", priority: "Medium" },
  { title: "Weekly Milk Subscription renews", date: "Jul 12", priority: "Low" },
];

const ACTIVITY_FEED = [
  { icon: CheckCircle2, text: "Order #ORD-9231 delivered successfully", time: "2 hours ago", tone: "success" },
  { icon: RefreshCw, text: "Milk subscription renewed for next week", time: "6 hours ago", tone: "info" },
  { icon: Banknote, text: "₹50 cashback credited to your wallet", time: "Yesterday", tone: "success" },
  { icon: Heart, text: "\"Salted Table Butter 500g\" is back in stock", time: "Yesterday", tone: "green" },
  { icon: CreditCard, text: "Payment method updated", time: "2 days ago", tone: "info" },
  { icon: Star, text: "120 loyalty points earned on your last order", time: "3 days ago", tone: "success" },
  { icon: AlertCircle, text: "Order #ORD-9227 was cancelled and refunded", time: "4 days ago", tone: "error" },
];

const OFFERS = [
  { name: "FRESH20", snippet: "Get 20% off on your first ghee order.", time: "Jul 15", unread: true },
  { name: "SUBSCRIBE10", snippet: "Extra 10% off on all milk subscriptions.", time: "Jul 31", unread: true },
  { name: "WEEKEND50", snippet: "Flat ₹50 off on orders above ₹499.", time: "Jul 6", unread: false },
  { name: "REFER100", snippet: "Refer a friend and get ₹100 wallet credit.", time: "No expiry", unread: false },
];

const SPENDING_BY_CATEGORY = [
  { genre: "Milk & Cream", percent: 42 },
  { genre: "Cheese & Paneer", percent: 22 },
  { genre: "Yogurt & Curd", percent: 18 },
  { genre: "Butter & Ghee", percent: 12 },
  { genre: "Ice Cream & Desserts", percent: 6 },
];

const MONTHLY_SPENDING = [
  { month: "Jan", value: 62 }, { month: "Feb", value: 58 }, { month: "Mar", value: 71 },
  { month: "Apr", value: 66 }, { month: "May", value: 84 }, { month: "Jun", value: 79 },
];

/* ── My Orders page (full order history) ── */
const ALL_ORDERS = [
  { name: "#ORD-9231", region: "2x Toned Milk 1L, 1x Curd 400g", crop: "Jun 28", plots: "₹163", rating: 5, status: "Delivered" },
  { name: "#ORD-9230", region: "Weekly Milk Subscription", crop: "Jun 28", plots: "₹348", rating: 0, status: "Out for Delivery" },
  { name: "#ORD-9229", region: "A2 Cow Ghee 500g", crop: "Jun 27", plots: "₹680", rating: 0, status: "Processing" },
  { name: "#ORD-9228", region: "Paneer 200g, Butter 500g", crop: "Jun 26", plots: "₹345", rating: 4, status: "Delivered" },
  { name: "#ORD-9227", region: "Vanilla Ice Cream Tub 1L", crop: "Jun 25", plots: "₹210", rating: 0, status: "Cancelled" },
  { name: "#ORD-9226", region: "Flavoured Yogurt Cup x4", crop: "Jun 24", plots: "₹140", rating: 5, status: "Delivered" },
  { name: "#ORD-9225", region: "Farm Fresh Toned Milk 1L x4", crop: "Jun 22", plots: "₹232", rating: 4, status: "Delivered" },
  { name: "#ORD-9224", region: "Malai Paneer Block 200g", crop: "Jun 20", plots: "₹90", rating: 5, status: "Delivered" },
];

/* ── Wishlist page ── */
const WISHLIST = [
  { label: "Malai Paneer Block 200g", expiry: "Cheese & Paneer · ₹90/pack", status: "In Stock" },
  { label: "Vanilla Ice Cream Tub 1L", expiry: "Ice Cream & Desserts · ₹210/tub", status: "In Stock" },
  { label: "Salted Table Butter 500g", expiry: "Butter & Ghee · ₹255/pack", status: "Low Stock" },
  { label: "Organic A2 Cow Milk 1L", expiry: "Milk & Cream · ₹95/litre", status: "In Stock" },
  { label: "Flavoured Yogurt Cup (Mango)", expiry: "Yogurt & Curd · ₹35/cup", status: "In Stock" },
];

/* ── Payments & Addresses page ── */
const ADDRESSES = [
  { name: "Home", region: "14, Lakeview Residency, Indiranagar, Bengaluru – 560038", plots: "Default address", joined: "" },
  { name: "Work", region: "3rd Floor, Prestige Tech Park, Whitefield, Bengaluru – 560066", plots: "Delivery address", joined: "" },
  { name: "Mother's House", region: "22, Green Park Colony, Warangal – 506002", plots: "Delivery address", joined: "" },
];

const PAYMENT_METHODS = [
  { icon: CreditCard, label: "HDFC Debit Card •••• 4821", detail: "Expires 08/28" },
  { icon: Smartphone, label: "UPI — ananya@okhdfcbank", detail: "Linked on Apr 12" },
  { icon: Wallet, label: "Amrit Wallet", detail: "Balance ₹350" },
  { icon: CreditCard, label: "ICICI Credit Card •••• 1190", detail: "Expires 11/27" },
];

/* ── Settings page ── */
const SETTINGS_GROUPS = [
  {
    title: "Profile",
    icon: UserCircle,
    items: [
      { label: "Personal details", desc: "Name, email, phone number" },
      { label: "Delivery preferences", desc: "Preferred time slot & delivery instructions" },
    ],
  },
  {
    title: "Security",
    icon: Lock,
    items: [
      { label: "Password", desc: "Last changed 3 months ago" },
      { label: "Two-factor authentication", desc: "Enabled via SMS OTP" },
      { label: "Login activity", desc: "Review recent sign-ins" },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    items: [
      { label: "Saved cards & UPI", desc: "Manage your payment methods" },
      { label: "Wallet & refunds", desc: "Track cashback and refund history" },
    ],
  },
  {
    title: "Preferences",
    icon: Languages,
    items: [
      { label: "Language", desc: "English (India)" },
      { label: "Notification preferences", desc: "Order updates, offers, and reminders" },
    ],
  },
];

/* ── Help & Support page ── */
const FAQ_ITEMS = [
  { q: "How do I pause or skip a subscription delivery?", a: "Go to Subscriptions and select \"Pause\" or \"Skip next delivery\" for any active plan." },
  { q: "How do I track my order?", a: "Open My Orders and tap on an order to see live delivery status and estimated arrival time." },
  { q: "How do refunds work?", a: "Refunds for cancelled or returned orders are credited to your wallet within 3–5 business days." },
  { q: "How do I change my delivery address?", a: "Go to Payments & Addresses and set a new default address before your next delivery cutoff." },
];

const SUPPORT_CHANNELS = [
  { icon: Phone, label: "Call Customer Support", detail: "+91 1800 200 4000 · 9 AM–9 PM" },
  { icon: MessageSquare, label: "Live Chat", detail: "Avg. response time: 3 minutes" },
  { icon: Mail, label: "Email Support", detail: "support@amritdairy.in" },
  { icon: Smartphone, label: "WhatsApp Us", detail: "Order updates & quick help" },
];

const VIEW_HEADINGS = {
  dashboard: { title: "Welcome back🥛", subtitle: "Here's what's happening with your orders, subscriptions, and rewards." },
  orders: { title: "My Orders", subtitle: "Track and manage all your past and current orders." },
  subscriptions: { title: "My Subscriptions", subtitle: "Manage your recurring dairy deliveries and schedules." },
  wishlist: { title: "My Wishlist", subtitle: "Products you've saved for later." },
  payments: { title: "Payments & Addresses", subtitle: "Manage your saved cards, UPI, wallet, and delivery addresses." },
  messages: { title: "Messages", subtitle: "Conversations with support and updates from Amrit Dairy." },
  settings: { title: "Settings", subtitle: "Manage your profile, security, and delivery preferences." },
  help: { title: "Help & Support", subtitle: "Answers to common questions and ways to reach our support team." },
};

function priorityClass(p) {
  if (p === "High") return "priority-pill high";
  if (p === "Medium") return "priority-pill medium";
  if (p === "Active") return "priority-pill low";
  if (p === "Paused") return "priority-pill medium";
  return "priority-pill low";
}

function statusClass(status) {
  switch (status) {
    case "Delivered": return "status-pill delivered";
    case "Out for Delivery": return "status-pill shipped";
    case "Processing": return "status-pill processing";
    case "Cancelled": return "status-pill cancelled";
    default: return "status-pill";
  }
}

function healthClass(h) {
  if (h >= 90) return "health-bar-fill excellent";
  if (h >= 60) return "health-bar-fill good";
  return "health-bar-fill fair";
}

function stockClass(stock) {
  if (stock === "In Stock") return "status-pill delivered";
  if (stock === "Low Stock") return "status-pill processing";
  return "status-pill cancelled";
}

/* All placeholder buttons/links across the user dashboard route to /404
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

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // The active tab lives in the URL (/user-dashboard/:view) so that browser
  // back/forward navigation restores the exact tab the customer was on,
  // instead of always resetting to "dashboard".
  const { view } = useParams();
  const activeView = VIEW_HEADINGS[view] ? view : "dashboard";

  const handleLogout = () => {
    setSidebarOpen(false);
    navigate("/login");
  };

  const goToView = (nextView) => {
    navigate(`/user-dashboard/${nextView}`);
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
          <span className="dash-nav-label">My Account</span>
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
            <input type="text" placeholder="Search products, orders, offers…" />
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
              <DeadLink className="dash-btn-primary">
                <ShoppingCart />
                Shop Now
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
                      </div>
                    </DeadLink>
                  );
                })}
              </section>

              <section className="dash-panels">
                <div className="dash-panel-card panel-wide">
                  <div className="panel-header">
                    <h2>Recent Orders</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <div className="table-wrap">
                    <table className="dash-table">
                      <thead>
                        <tr>
                          <th>Order</th><th>Items</th><th>Date</th><th>Status</th><th>Amount</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {RECENT_ORDERS.map((o) => (
                          <tr key={o.id}>
                            <td className="muted">{o.id}</td>
                            <td className="strong">{o.items}</td>
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
                    <h2>Track Your Orders</h2>
                    <DeadLink className="dash-panel-link">Details</DeadLink>
                  </div>
                  <ul className="cluster-list">
                    {ORDER_TRACKING.map((c) => (
                      <li key={c.region}>
                        <DeadLink className="dash-cluster-item">
                          <span className="cluster-pin"><Truck /></span>
                          <div className="cluster-text">
                            <span className="cluster-name">{c.region}</span>
                            <span className="cluster-meta">{c.farmers} · {c.crop}</span>
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
                            <span className={`activity-icon ${a.tone}`}><Icon /></span>
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
                    <h2>Upcoming Deliveries</h2>
                    <DeadLink className="dash-panel-link">Manage</DeadLink>
                  </div>
                  <ul className="task-list">
                    {UPCOMING_DELIVERIES.map((t, i) => (
                      <li key={i}>
                        <DeadLink className="dash-task-item">
                          <span className="task-icon"><Truck /></span>
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
                    <h2>Active Subscriptions</h2>
                    <DeadLink className="dash-panel-link">Manage</DeadLink>
                  </div>
                  <ul className="task-list">
                    {ACTIVE_SUBSCRIPTIONS.map((t, i) => (
                      <li key={i}>
                        <DeadLink className="dash-task-item">
                          <span className="task-icon"><RefreshCw /></span>
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

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Your Spending by Category</h2>
                    <DeadLink className="dash-panel-link">Full report</DeadLink>
                  </div>
                  <ul className="genre-list">
                    {SPENDING_BY_CATEGORY.map((g) => (
                      <li key={g.genre} className="genre-item">
                        <div className="genre-row"><span className="genre-name">{g.genre}</span><span className="genre-percent">{g.percent}%</span></div>
                        <div className="genre-bar"><div className="genre-bar-fill" style={{ width: `${g.percent}%` }} /></div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Offers For You</h2>
                    <DeadLink className="dash-panel-link">View all</DeadLink>
                  </div>
                  <ul className="message-list">
                    {OFFERS.map((m, i) => (
                      <li key={i}>
                        <DeadLink className="dash-message-item">
                          <span className="message-avatar"><Gift size={16} /></span>
                          <div className="message-text">
                            <div className="message-top"><span className="message-name">{m.name}</span><span className="message-time">till {m.time}</span></div>
                            <span className="message-snippet">{m.snippet}</span>
                          </div>
                          {m.unread && <span className="message-dot" />}
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dash-panel-card quick-actions">
                <div className="panel-header"><h2>Quick Actions</h2></div>
                <div className="quick-grid">
                  <DeadLink className="dash-quick-card"><Repeat /><span>Reorder Last Purchase</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Truck /><span>Track an Order</span></DeadLink>
                  <DeadLink className="dash-quick-card"><RefreshCw /><span>Manage Subscriptions</span></DeadLink>
                  <DeadLink className="dash-quick-card"><MapPin /><span>Add New Address</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Star /><span>Redeem Points</span></DeadLink>
                  <DeadLink className="dash-quick-card"><Gift /><span>Refer a Friend</span></DeadLink>
                </div>
              </section>
            </>
          )}

          {activeView === "orders" && (
            <>
              <section className="dash-stats">
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Total Orders</span><span className="stat-icon"><ShoppingCart /></span></div>
                  <div className="stat-row"><span className="stat-value">42</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Delivered</span><span className="stat-icon"><CheckCircle2 /></span></div>
                  <div className="stat-row"><span className="stat-value">37</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">In Progress</span><span className="stat-icon"><Truck /></span></div>
                  <div className="stat-row"><span className="stat-value">2</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Cancelled</span><span className="stat-icon"><AlertCircle /></span></div>
                  <div className="stat-row"><span className="stat-value">3</span></div>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>Order History</h2>
                  <DeadLink className="dash-panel-link">Download Invoices</DeadLink>
                </div>
                <div className="table-wrap">
                  <table className="dash-table">
                    <thead><tr><th>Order</th><th>Items</th><th>Date</th><th>Amount</th><th>Your Rating</th><th>Status</th><th></th></tr></thead>
                    <tbody>
                      {ALL_ORDERS.map((f) => (
                        <tr key={f.name}>
                          <td className="strong">{f.name}</td>
                          <td className="muted">{f.region}</td>
                          <td className="muted">{f.crop}</td>
                          <td className="muted">{f.plots}</td>
                          <td className="muted">{f.rating > 0 ? `★ ${f.rating}` : "—"}</td>
                          <td><span className={statusClass(f.status)}>{f.status}</span></td>
                          <td><DeadLink className="dash-row-action" ariaLabel="More options"><MoreHorizontal /></DeadLink></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {activeView === "subscriptions" && (
            <>
              <section className="dash-stats">
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Active Plans</span><span className="stat-icon"><RefreshCw /></span></div>
                  <div className="stat-row"><span className="stat-value">2</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Paused Plans</span><span className="stat-icon"><Clock /></span></div>
                  <div className="stat-row"><span className="stat-value">1</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Monthly Spend</span><span className="stat-icon"><Banknote /></span></div>
                  <div className="stat-row"><span className="stat-value">₹1,890</span></div>
                </div>
                <div className="dash-stat-card">
                  <div className="stat-top-row"><span className="stat-label">Next Delivery</span><span className="stat-icon"><Truck /></span></div>
                  <div className="stat-row"><span className="stat-value">Tomorrow</span></div>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>Your Subscriptions</h2>
                  <DeadLink className="dash-panel-link">Add New Subscription</DeadLink>
                </div>
                <ul className="task-list">
                  {ACTIVE_SUBSCRIPTIONS.map((t, i) => (
                    <li key={i}>
                      <DeadLink className="dash-task-item">
                        <span className="task-icon"><RefreshCw /></span>
                        <div className="task-text">
                          <span className="task-title">{t.title}</span>
                          <span className="task-date">{t.date}</span>
                        </div>
                        <span className={priorityClass(t.priority)}>{t.priority}</span>
                      </DeadLink>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {activeView === "wishlist" && (
            <section className="dash-panel-card certifications-panel">
              <div className="panel-header">
                <h2>Saved for Later</h2>
                <DeadLink className="dash-panel-link">Add All to Cart</DeadLink>
              </div>
              <div className="cert-grid">
                {WISHLIST.map((c) => (
                  <DeadLink className="dash-cert-card" key={c.label}>
                    <div className="cert-top"><Heart className="cert-icon" /><span className={stockClass(c.status)}>{c.status}</span></div>
                    <span className="cert-label">{c.label}</span>
                    <span className="cert-expiry">{c.expiry}</span>
                  </DeadLink>
                ))}
              </div>
            </section>
          )}

          {activeView === "payments" && (
            <>
              <section className="dash-panels">
                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Saved Addresses</h2>
                    <DeadLink className="dash-panel-link">Add New</DeadLink>
                  </div>
                  <ul className="author-list">
                    {ADDRESSES.map((a) => (
                      <li key={a.name}>
                        <DeadLink className="dash-author-item">
                          <span className="author-avatar">{a.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
                          <div className="author-text">
                            <span className="author-name">{a.name}</span>
                            <span className="author-meta">{a.region}</span>
                          </div>
                          <span className="author-joined">{a.plots}</span>
                        </DeadLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dash-panel-card">
                  <div className="panel-header">
                    <h2>Payment Methods</h2>
                    <DeadLink className="dash-panel-link">Add New</DeadLink>
                  </div>
                  <ul className="support-list">
                    {PAYMENT_METHODS.map((s, i) => {
                      const SIcon = s.icon;
                      return (
                        <li key={i}>
                          <DeadLink className="dash-support-item">
                            <span className="support-icon"><SIcon /></span>
                            <div className="support-text"><span className="support-label">{s.label}</span><span className="support-detail">{s.detail}</span></div>
                            <ChevronRight className="settings-chevron" />
                          </DeadLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>

              <section className="dash-panel-card">
                <div className="panel-header">
                  <h2>Your Monthly Spending (₹)</h2>
                  <DeadLink className="dash-panel-link">Export Statement</DeadLink>
                </div>
                <div className="bar-chart">
                  {MONTHLY_SPENDING.map((m) => (
                    <div className="bar-chart-col" key={m.month}>
                      <div className="bar-chart-bar-wrap">
                        <div className="bar-chart-bar" style={{ height: `${(m.value / 100) * 100}%` }} title={`₹${m.value * 10}`} />
                      </div>
                      <span className="bar-chart-label">{m.month}</span>
                    </div>
                  ))}
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
                {OFFERS.concat([
                  { name: "Amrit Dairy Support", snippet: "Your query about order #ORD-9227 has been resolved.", time: "2d", unread: false },
                  { name: "Delivery Partner", snippet: "Your delivery executive is 10 minutes away.", time: "5d", unread: false },
                ]).map((m, i) => (
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