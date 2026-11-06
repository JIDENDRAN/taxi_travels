import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Package,
  CalendarCheck,
  Edit,
  Trash2,
  LogOut,
  CheckCircle,
  Clock,
  MessageSquare,
  Settings,
  UserPlus,
  X,
  Plus,
  Phone,
  Mail,
  Upload,
  Menu,
  ArrowUpRight,
  AlertCircle,
  Loader2,
  CalendarDays,
  Users,
  CircleCheck,
  Hourglass,
  BadgeCheck,
  Send,
  RefreshCw,
  Unplug,
  QrCode,
  MessageCircle,
  Inbox,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { getVehicleImage, getPackageImage } from '../../utils/imageImports';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig.js';
import logo from '../../assets/new_logo.jpg';

/* ─── Navigation metadata ─────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck, title: 'Bookings', description: 'Review trip requests submitted from the website and update their status.' },
  { id: 'cars', label: 'Vehicles', icon: Car, title: 'Fleet', description: 'Manage the vehicles, rates and images shown on the public site.' },
  { id: 'packages', label: 'Tour packages', icon: Package, title: 'Tour packages', description: 'Create and edit the tour packages customers can book.' },
  { id: 'contacts', label: 'Enquiries', icon: MessageSquare, title: 'Enquiries', description: 'Messages received through the Contact Us form.' },
  { id: 'settings', label: 'Settings', icon: Settings, title: 'Settings', description: 'Admin profile, notification numbers and the WhatsApp alert bot.' },
  { id: 'add-admin', label: 'Add administrator', icon: UserPlus, title: 'Add administrator', description: 'Give another team member access to this dashboard.' },
];

const STATUS_STYLES = {
  Pending: 'bg-gold-50 text-gold-700 ring-gold-300/60',
  Approved: 'bg-leaf-50 text-leaf-600 ring-leaf-500/30',
  Completed: 'bg-ink-100 text-ink-700 ring-ink-300/70',
};

const STATUS_DOT = {
  Pending: 'bg-gold-500',
  Approved: 'bg-leaf-500',
  Completed: 'bg-ink-500',
};

const waLink = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
};

/* ─── Presentational helpers ──────────────────────────────── */
const Sidebar = ({ activeTab, onSelect, onLogout, onClose }) => (
  <div className="flex h-full flex-col bg-ink-900 text-white">
    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
      <div className="flex min-w-0 items-center gap-3">
        <img src={logo} alt="" className="h-11 w-11 shrink-0 rounded-[10px] bg-white object-contain p-0.5" />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-bold">Madurai Best</p>
          <p className="truncate text-xs font-semibold text-gold-400">Admin console</p>
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>

    <nav aria-label="Admin sections" className="flex-1 overflow-y-auto px-3 py-5">
      <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-400">Manage</p>
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <NavItem item={item} active={activeTab === item.id} onClick={() => onSelect(item.id)} />
          </li>
        ))}
      </ul>
    </nav>

    <div className="space-y-1 border-t border-white/10 px-3 py-4">
      <Link
        to="/"
        className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold text-ink-300 transition-colors hover:bg-white/5 hover:text-white"
      >
        <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
        View public site
      </Link>
      <button
        type="button"
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold text-ink-300 transition-colors hover:bg-red-500/10 hover:text-red-300"
      >
        <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
        Log out
      </button>
    </div>
  </div>
);

const NavItem = ({ item, active, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold transition-colors ${
        active ? 'bg-white/[0.08] text-white' : 'text-ink-300 hover:bg-white/5 hover:text-white'
      }`}
    >
      {active && <span aria-hidden="true" className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-gold-500" />}
      <Icon className={`h-[18px] w-[18px] ${active ? 'text-gold-400' : ''}`} aria-hidden="true" />
      {item.label}
    </button>
  );
};

const StatCard = ({ label, value, icon: Icon, tone = 'ink' }) => {
  const tones = {
    ink: 'bg-ink-50 text-ink-700',
    gold: 'bg-gold-50 text-gold-600',
    leaf: 'bg-leaf-50 text-leaf-600',
  };
  return (
    <div className="card flex items-center gap-4 p-4 sm:p-5">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] ${tones[tone]}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-ink-500">{label}</p>
        <p className="font-display text-2xl font-semibold leading-tight text-ink-900">{value}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const s = status || 'Pending';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${STATUS_STYLES[s] || STATUS_STYLES.Pending}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[s] || STATUS_DOT.Pending}`} aria-hidden="true" />
      {s}
    </span>
  );
};

const Field = ({ id, label, hint, className = '', children }) => (
  <div className={className}>
    <label htmlFor={id} className="field-label">{label}</label>
    {children}
    {hint && <p className="mt-1.5 text-xs text-ink-400">{hint}</p>}
  </div>
);

const SectionCard = ({ title, description, icon: Icon, action, children, className = '' }) => (
  <section className={`card overflow-hidden ${className}`}>
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-sand-200 px-5 py-4 sm:px-6">
      <div className="flex min-w-0 items-start gap-3">
        {Icon && (
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-sand-100 text-ink-700">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="text-base font-bold text-ink-900">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-ink-500">{description}</p>}
        </div>
      </div>
      {action}
    </header>
    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

const LoadingState = ({ label }) => (
  <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-sm font-medium text-ink-500" role="status">
    <Loader2 className="h-7 w-7 animate-spin text-gold-500" aria-hidden="true" />
    {label}
  </div>
);

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" role="status" aria-label="Loading">
    {[0, 1, 2].map((i) => (
      <div key={i} className="card overflow-hidden">
        <div className="h-44 animate-pulse bg-sand-100" />
        <div className="space-y-3 p-5">
          <div className="h-4 w-2/3 animate-pulse rounded bg-sand-200" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-sand-100" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-sand-100" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-sand-100 text-ink-400">
      <Icon className="h-7 w-7" aria-hidden="true" />
    </span>
    <p className="mt-4 text-base font-bold text-ink-900">{title}</p>
    {description && <p className="mt-1 max-w-sm text-sm text-ink-500">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);

const ModalShell = ({ title, description, onClose, onSubmit, submitLabel, children }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/60 p-3 backdrop-blur-sm sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        initial={{ scale: 0.97, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[14px] bg-white shadow-[var(--shadow-panel)]"
      >
        <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-sand-200 px-5 py-4 sm:px-6">
            <div>
              <h3 id="admin-modal-title" className="font-display text-xl font-semibold text-ink-900">{title}</h3>
              {description && <p className="mt-0.5 text-sm text-ink-500">{description}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-sand-100 hover:text-ink-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-sand-200 bg-sand-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">{submitLabel}</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const FormGroupTitle = ({ children }) => (
  <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-gold-600">{children}</h4>
);

const ImagePicker = ({ id, label, previewSrc, contain, onChange }) => (
  <Field id={id} label={label}>
    <div className="flex items-center gap-3 rounded-[10px] border border-dashed border-ink-200 bg-sand-50 p-2.5">
      <span className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-sand-200 bg-white">
        {previewSrc ? (
          <img src={previewSrc} alt="Current image preview" className={`h-full w-full ${contain ? 'object-contain p-1' : 'object-cover'}`} />
        ) : (
          <Upload className="h-5 w-5 text-ink-300" aria-hidden="true" />
        )}
      </span>
      <label htmlFor={id} className="btn btn-outline min-h-0 cursor-pointer px-3 py-2 text-sm focus-within:outline focus-within:outline-2 focus-within:outline-gold-500">
        <Upload className="h-4 w-4" aria-hidden="true" />
        Upload image
        <input id={id} type="file" accept="image/*" className="sr-only" onChange={onChange} />
      </label>
    </div>
  </Field>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [toast, setToast] = useState(null);

  // Authenticate
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = async (e, setModalState, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    showToast('Uploading image...', 'success');

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        setModalState(prev => ({
          ...prev,
          data: { ...prev.data, [fieldName]: data.filePath }
        }));
        showToast('Image uploaded successfully!');
      } else {
        showToast('Image upload failed', 'error');
      }
    } catch (error) {
      console.error('Upload error', error);
      showToast('Connection error during upload', 'error');
    }
  };

  // State Management
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState({ name: '', phone: '', whatsapp: '', password: '' });
  const [whatsappStatus, setWhatsappStatus] = useState({ isConnected: false, qrCode: null });
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);
  const [customMsgPhone, setCustomMsgPhone] = useState('');
  const [customMsgText, setCustomMsgText] = useState('');
  const [sendingCustomMsg, setSendingCustomMsg] = useState(false);

  const [loading, setLoading] = useState(true);

  // Modal forms states
  const [carModal, setCarModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [pkgModal, setPkgModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [newAdmin, setNewAdmin] = useState({ name: '', phone: '', whatsapp: '', password: '' });

  // Pre-defined values for assets mapping
  const availableCarImages = [
    'sedan_cab-removebg-preview.png',
    'toyota_etios-removebg-preview.png',
    'innova_crysta-removebg-preview.png',
    'suv-removebg-preview.png',
    'tempo_traveller-removebg-preview.png'
  ];

  const availableBgs = [
    'kanyakumari_bg.png',
    'thirumalai_mahal_bg.png',
    'kodaikanal_bg.png',
    'munnar_bg.png',
    'rameswaram_bg.png'
  ];

  const availablePkgImages = [
    'meenakshi_bg.png',
    'rameswaram_bg.png',
    'kodaikanal_bg.png',
    'ooty_bg.png'
  ];

  // Fetch functions
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading bookings.', 'error');
    }
  };

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cars`);
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading vehicles.', 'error');
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/packages`);
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading packages.', 'error');
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading contact messages.', 'error');
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data) setSettings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading system settings.', 'error');
    }
  };

  const fetchWhatsappStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-status`);
      if (response.ok) {
        const data = await response.json();
        setWhatsappStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch WhatsApp status', error);
    }
  };

  const handleWhatsappReconnect = async () => {
    try {
      setLoadingWhatsapp(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-reconnect`, { method: 'POST' });
      if (response.ok) {
        showToast('WhatsApp bot reconnect triggered', 'success');
        setTimeout(fetchWhatsappStatus, 2000);
      } else {
        showToast('Failed to trigger reconnect', 'error');
      }
    } catch {
      showToast('Error reconnecting bot', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleWhatsappDisconnect = async () => {
    try {
      setLoadingWhatsapp(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-disconnect`, { method: 'POST' });
      if (response.ok) {
        showToast('WhatsApp bot disconnected successfully', 'success');
        setTimeout(fetchWhatsappStatus, 1000);
      } else {
        showToast('Failed to disconnect bot', 'error');
      }
    } catch {
      showToast('Error disconnecting bot', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleWhatsappTest = async () => {
    try {
      setLoadingWhatsapp(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-test`, { method: 'POST' });
      if (response.ok) {
        showToast('Test message sent successfully!', 'success');
      } else {
        showToast('Failed to send test message.', 'error');
      }
    } catch {
      showToast('Error sending test message.', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleSendCustomMessage = async () => {
    if (!customMsgPhone.trim() || !customMsgText.trim()) {
      showToast('Please enter both phone number and message', 'error');
      return;
    }
    try {
      setSendingCustomMsg(true);
      const response = await fetch(`${API_BASE_URL}/api/admin/whatsapp-custom-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: customMsgPhone, message: customMsgText })
      });
      if (response.ok) {
        showToast('Custom message sent successfully!', 'success');
        setCustomMsgPhone('');
        setCustomMsgText('');
      } else {
        showToast('Failed to send message. Is number registered on WhatsApp?', 'error');
      }
    } catch {
      showToast('Error sending message', 'error');
    } finally {
      setSendingCustomMsg(false);
    }
  };

  // Load all based on active tab
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      if (activeTab === 'bookings') await fetchBookings();
      if (activeTab === 'cars') await fetchCars();
      if (activeTab === 'packages') await fetchPackages();
      if (activeTab === 'contacts') await fetchContacts();
      if (activeTab === 'settings') await fetchSettings();
      setLoading(false);
    };
    loadData();
  }, [activeTab]);

  useEffect(() => {
    let interval;
    if (activeTab === 'settings') {
      fetchWhatsappStatus();
      interval = setInterval(fetchWhatsappStatus, 5000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  // Logout - redirects to home page "/"
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  // Bookings Handlers
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
        showToast(`Booking status updated to ${newStatus}.`);
      } else {
        showToast('Failed to update booking status.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== id));
        showToast('Booking deleted successfully.');
      } else {
        showToast('Failed to delete booking.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Cars (Fleet) CRUD
  const handleOpenCarModal = (isEdit = false, data = null) => {
    let parsedData = {
      name: '', seats: '4 Seater', ac: 'AC', price: '₹12/km', desc: '', image: availableCarImages[0], bgImage: availableBgs[0],
      outstationRate: '', outstationMinKm: '', outstationDriver: '',
      dayBaseRent: '', dayPerKm: '', dayDriver: ''
    };
    if (data) {
      parsedData = { ...parsedData, ...data };
      if (data.desc) {
        const lines = data.desc.split('\n');
        let currentSection = '';
        lines.forEach(line => {
          if (line.includes('[Outstation Plan]')) currentSection = 'outstation';
          else if (line.includes('[Day Rental Plan]')) currentSection = 'day';
          else if (line.includes(':')) {
            const [k, v] = line.split(':');
            const key = k.trim().toLowerCase();
            const val = v ? v.trim() : '';
            if (currentSection === 'outstation') {
              if (key === 'rate') parsedData.outstationRate = val;
              if (key === 'min distance') parsedData.outstationMinKm = val;
              if (key === 'driver charge') parsedData.outstationDriver = val;
            } else if (currentSection === 'day') {
              if (key === 'base rent') parsedData.dayBaseRent = val;
              if (key === 'per km charge') parsedData.dayPerKm = val;
              if (key === 'driver charge') parsedData.dayDriver = val;
            }
          }
        });
      }
    }
    setCarModal({ isOpen: true, isEdit, data: parsedData });
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = carModal;

    // Auto format the description string
    const formattedDesc = `[Outstation Plan]
Rate: ${data.outstationRate || ''}
Min Distance: ${data.outstationMinKm || ''}
Driver Charge: ${data.outstationDriver || ''}

[Day Rental Plan]
Base Rent: ${data.dayBaseRent || ''}
Per km Charge: ${data.dayPerKm || ''}
Driver Charge: ${data.dayDriver || ''}`;

    const submissionData = { ...data, desc: formattedDesc };

    const url = isEdit ? `${API_BASE_URL}/api/cars/${submissionData.id}` : `${API_BASE_URL}/api/cars`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      if (response.ok) {
        showToast(isEdit ? 'Vehicle updated successfully.' : 'Vehicle added successfully.');
        setCarModal({ isOpen: false, isEdit: false, data: null });
        fetchCars();
      } else {
        showToast('Failed to save vehicle details.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving vehicle details.', 'error');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCars(cars.filter(c => c.id !== id));
        showToast('Vehicle removed from fleet.');
      } else {
        showToast('Failed to delete vehicle.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Packages CRUD
  const handleOpenPkgModal = (isEdit = false, data = null) => {
    setPkgModal({
      isOpen: true,
      isEdit,
      data: data ? { ...data } : { name: '', duration: '', places: '', price: '', image: availablePkgImages[0] }
    });
  };

  const handlePkgSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = pkgModal;
    const url = isEdit ? `${API_BASE_URL}/api/packages/${data.id}` : `${API_BASE_URL}/api/packages`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showToast(isEdit ? 'Package updated successfully.' : 'Package added successfully.');
        setPkgModal({ isOpen: false, isEdit: false, data: null });
        fetchPackages();
      } else {
        showToast('Failed to save package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving package.', 'error');
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/packages/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setPackages(packages.filter(p => p.id !== id));
        showToast('Package deleted successfully.');
      } else {
        showToast('Failed to delete package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Contact Us message delete
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        showToast('Message deleted successfully.');
      } else {
        showToast('Failed to delete message.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Settings Handlers
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (response.ok) {
        showToast('Admin settings saved successfully.');
      } else {
        showToast('Failed to save admin settings.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Add Admin Handler
  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.password) {
      showToast('Name and password are required.', 'error');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin)
      });
      if (response.ok) {
        showToast('Additional administrator registered successfully.');
        setNewAdmin({ name: '', phone: '', whatsapp: '', password: '' });
      } else {
        showToast('Failed to register new administrator.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };


  // ─── Presentation-only state & helpers ───────────────────
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const selectTab = (id) => {
    setActiveTab(id);
    setMobileNavOpen(false);
  };

  const closeCarModal = () => setCarModal({ isOpen: false, isEdit: false, data: null });
  const closePkgModal = () => setPkgModal({ isOpen: false, isEdit: false, data: null });
  const setCarField = (key) => (e) => setCarModal({ ...carModal, data: { ...carModal.data, [key]: e.target.value } });
  const setPkgField = (key) => (e) => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, [key]: e.target.value } });

  const currentNav = NAV_ITEMS.find((n) => n.id === activeTab) || NAV_ITEMS[0];

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => (b.status || 'Pending') === 'Pending').length,
    approved: bookings.filter((b) => b.status === 'Approved').length,
    completed: bookings.filter((b) => b.status === 'Completed').length,
  };

  const headerAction =
    activeTab === 'cars' ? (
      <button type="button" onClick={() => handleOpenCarModal(false)} className="btn btn-primary">
        <Plus className="h-4 w-4" aria-hidden="true" /> Add vehicle
      </button>
    ) : activeTab === 'packages' ? (
      <button type="button" onClick={() => handleOpenPkgModal(false)} className="btn btn-primary">
        <Plus className="h-4 w-4" aria-hidden="true" /> Add package
      </button>
    ) : null;

  const viewMotion = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-ink-900">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <Sidebar activeTab={activeTab} onSelect={selectTab} onLogout={handleLogout} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink-950/60"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="absolute inset-y-0 left-0 w-[min(18rem,85vw)] shadow-[var(--shadow-panel)]"
            >
              <Sidebar
                activeTab={activeTab}
                onSelect={selectTab}
                onLogout={handleLogout}
                onClose={() => setMobileNavOpen(false)}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Toast notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-4 left-4 right-4 z-[60] flex items-center gap-3 rounded-[12px] bg-ink-900 px-4 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-panel)] sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
          >
            {toast.type === 'error' ? (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
            ) : (
              <CheckCircle className="h-5 w-5 shrink-0 text-leaf-500" aria-hidden="true" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-ink-800 bg-ink-900 px-4 py-3 text-white lg:hidden">
          <div className="flex min-w-0 items-center gap-2.5">
            <img src={logo} alt="" className="h-9 w-9 shrink-0 rounded-lg bg-white object-contain p-0.5" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-bold">Madurai Best</p>
              <p className="truncate text-[11px] font-semibold text-gold-400">{currentNav.label}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileNavOpen}
            className="flex h-10 w-10 items-center justify-center rounded-[10px] text-white transition-colors hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-[1240px]">
            {/* Page header */}
            <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="eyebrow">Admin console</p>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-[2.125rem]">
                  {currentNav.title}
                </h1>
                <p className="mt-1.5 max-w-2xl text-sm text-ink-500">{currentNav.description}</p>
              </div>
              {headerAction && <div className="shrink-0">{headerAction}</div>}
            </div>

            <AnimatePresence mode="wait">
              {/* BOOKINGS VIEW */}
              {activeTab === 'bookings' && (
                <motion.div key="bookings" {...viewMotion} className="space-y-6">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
                    <StatCard label="Total bookings" value={loading ? '–' : bookingStats.total} icon={CalendarDays} tone="ink" />
                    <StatCard label="Pending" value={loading ? '–' : bookingStats.pending} icon={Hourglass} tone="gold" />
                    <StatCard label="Approved" value={loading ? '–' : bookingStats.approved} icon={BadgeCheck} tone="leaf" />
                    <StatCard label="Completed" value={loading ? '–' : bookingStats.completed} icon={CircleCheck} tone="ink" />
                  </div>

                  <div className="card overflow-hidden">
                    {loading ? (
                      <LoadingState label="Loading bookings..." />
                    ) : bookings.length === 0 ? (
                      <EmptyState
                        icon={CalendarCheck}
                        title="No bookings yet"
                        description="Bookings submitted from the website will show up here automatically."
                      />
                    ) : (
                      <>
                        {/* Desktop table */}
                        <div className="hidden max-h-[70vh] overflow-auto lg:block">
                          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
                            <thead className="sticky top-0 z-10 bg-sand-50">
                              <tr className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                                <th scope="col" className="border-b border-sand-200 px-5 py-3">Booking</th>
                                <th scope="col" className="border-b border-sand-200 px-5 py-3">Customer</th>
                                <th scope="col" className="border-b border-sand-200 px-5 py-3">Route</th>
                                <th scope="col" className="border-b border-sand-200 px-5 py-3">Date &amp; time</th>
                                <th scope="col" className="border-b border-sand-200 px-5 py-3">Vehicle / package</th>
                                <th scope="col" className="border-b border-sand-200 px-5 py-3">Status</th>
                                <th scope="col" className="border-b border-sand-200 px-5 py-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings.map((booking) => (
                                <tr key={booking.id} className="align-top transition-colors hover:bg-sand-50">
                                  <td className="border-b border-sand-200 px-5 py-4 font-mono text-xs font-bold text-ink-700">
                                    BKG-{String(booking.id).padStart(4, '0')}
                                  </td>
                                  <td className="border-b border-sand-200 px-5 py-4">
                                    <div className="font-bold text-ink-900">{booking.name}</div>
                                    <BookingPhone phone={booking.phone} />
                                  </td>
                                  <td className="max-w-[260px] border-b border-sand-200 px-5 py-4">
                                    <BookingRoute from={booking.fromLocation} to={booking.toLocation} />
                                  </td>
                                  <td className="border-b border-sand-200 px-5 py-4">
                                    <div className="font-semibold text-ink-900">{booking.date}</div>
                                    <div className="text-xs text-ink-500">{booking.time || 'Not specified'}</div>
                                  </td>
                                  <td className="border-b border-sand-200 px-5 py-4">
                                    <div className="font-semibold text-ink-900">{booking.vehicle || 'Not Selected'}</div>
                                    <div className="text-xs text-ink-500">{booking.packageType || 'Custom Trip'}</div>
                                  </td>
                                  <td className="border-b border-sand-200 px-5 py-4">
                                    <StatusBadge status={booking.status} />
                                  </td>
                                  <td className="border-b border-sand-200 px-5 py-4">
                                    <BookingActions
                                      booking={booking}
                                      onStatus={handleStatusUpdate}
                                      onDelete={handleDeleteBooking}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile cards */}
                        <ul className="divide-y divide-sand-200 lg:hidden">
                          {bookings.map((booking) => (
                            <li key={booking.id} className="space-y-3 p-4 sm:p-5">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="font-mono text-[11px] font-bold text-ink-500">
                                    BKG-{String(booking.id).padStart(4, '0')}
                                  </p>
                                  <p className="truncate font-bold text-ink-900">{booking.name}</p>
                                  <BookingPhone phone={booking.phone} />
                                </div>
                                <StatusBadge status={booking.status} />
                              </div>
                              <BookingRoute from={booking.fromLocation} to={booking.toLocation} />
                              <dl className="grid grid-cols-2 gap-3 rounded-[10px] bg-sand-50 p-3 text-xs">
                                <div>
                                  <dt className="font-semibold text-ink-500">Date &amp; time</dt>
                                  <dd className="mt-0.5 font-semibold text-ink-900">
                                    {booking.date}
                                    <span className="block font-medium text-ink-500">{booking.time || 'Not specified'}</span>
                                  </dd>
                                </div>
                                <div>
                                  <dt className="font-semibold text-ink-500">Vehicle / package</dt>
                                  <dd className="mt-0.5 font-semibold text-ink-900">
                                    {booking.vehicle || 'Not Selected'}
                                    <span className="block font-medium text-ink-500">{booking.packageType || 'Custom Trip'}</span>
                                  </dd>
                                </div>
                              </dl>
                              <BookingActions
                                booking={booking}
                                onStatus={handleStatusUpdate}
                                onDelete={handleDeleteBooking}
                                stretch
                              />
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* CARS VIEW */}
              {activeTab === 'cars' && (
                <motion.div key="cars" {...viewMotion}>
                  {loading ? (
                    <SkeletonGrid />
                  ) : cars.length === 0 ? (
                    <div className="card">
                      <EmptyState
                        icon={Car}
                        title="No vehicles yet"
                        description="Add your first vehicle to show it on the Fleet page."
                        action={
                          <button type="button" onClick={() => handleOpenCarModal(false)} className="btn btn-primary">
                            <Plus className="h-4 w-4" aria-hidden="true" /> Add vehicle
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {cars.map((car) => (
                        <article key={car.id} className="card card-hover flex flex-col overflow-hidden">
                          <div className="relative h-44 bg-sand-100">
                            <img
                              src={getVehicleImage(car.image)}
                              alt={car.name}
                              className="absolute inset-0 h-full w-full object-contain p-4"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="min-w-0 truncate text-base font-bold text-ink-900">{car.name}</h3>
                              <span className="shrink-0 text-sm font-bold text-gold-700">{car.price}</span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1.5 text-xs font-semibold text-ink-600">
                              <span className="inline-flex items-center gap-1 rounded-md bg-ink-50 px-2 py-1">
                                <Users className="h-3.5 w-3.5" aria-hidden="true" /> {car.seats}
                              </span>
                              <span className="rounded-md bg-ink-50 px-2 py-1">{car.ac}</span>
                            </div>
                            <CardActions
                              name={car.name}
                              onEdit={() => handleOpenCarModal(true, car)}
                              onDelete={() => handleDeleteCar(car.id)}
                            />
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* PACKAGES VIEW */}
              {activeTab === 'packages' && (
                <motion.div key="packages" {...viewMotion}>
                  {loading ? (
                    <SkeletonGrid />
                  ) : packages.length === 0 ? (
                    <div className="card">
                      <EmptyState
                        icon={Package}
                        title="No packages yet"
                        description="Create a tour package to list it on the website."
                        action={
                          <button type="button" onClick={() => handleOpenPkgModal(false)} className="btn btn-primary">
                            <Plus className="h-4 w-4" aria-hidden="true" /> Add package
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {packages.map((pkg) => (
                        <article key={pkg.id} className="card card-hover flex flex-col overflow-hidden">
                          <div className="h-44 bg-sand-100">
                            <img src={getPackageImage(pkg.image)} alt={pkg.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="min-w-0 truncate text-base font-bold text-ink-900">{pkg.name}</h3>
                              <span className="shrink-0 text-sm font-bold text-gold-700">{pkg.price}</span>
                            </div>
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {pkg.duration}
                            </p>
                            <p className="mt-3 line-clamp-3 flex-1 text-sm text-ink-600">{pkg.places}</p>
                            <CardActions
                              name={pkg.name}
                              onEdit={() => handleOpenPkgModal(true, pkg)}
                              onDelete={() => handleDeletePackage(pkg.id)}
                            />
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* CONTACT MESSAGES VIEW */}
              {activeTab === 'contacts' && (
                <motion.div key="contacts" {...viewMotion}>
                  <div className="card overflow-hidden">
                    {loading ? (
                      <LoadingState label="Loading enquiries..." />
                    ) : contacts.length === 0 ? (
                      <EmptyState
                        icon={Inbox}
                        title="No enquiries yet"
                        description="Messages from the Contact Us form will appear here."
                      />
                    ) : (
                      <ul className="divide-y divide-sand-200">
                        {contacts.map((c) => (
                          <li key={c.id} className="flex flex-col gap-4 p-4 transition-colors hover:bg-sand-50 sm:flex-row sm:items-start sm:p-5">
                            <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-100 text-sm font-bold text-ink-700 sm:flex" aria-hidden="true">
                              {String(c.name || '?').trim().charAt(0).toUpperCase()}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <p className="font-bold text-ink-900">{c.name}</p>
                                <span className="text-xs font-semibold text-ink-400">
                                  {new Date(c.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
                                <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1.5 hover:text-ink-900">
                                  <Phone className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" /> {c.phone}
                                </a>
                                {c.email && (
                                  <a href={`mailto:${c.email}`} className="inline-flex min-w-0 items-center gap-1.5 break-all hover:text-ink-900">
                                    <Mail className="h-3.5 w-3.5 shrink-0 text-gold-600" aria-hidden="true" /> {c.email}
                                  </a>
                                )}
                              </div>
                              <p className="mt-3 whitespace-pre-line rounded-[10px] border border-sand-200 bg-sand-50 p-3.5 text-sm leading-relaxed text-ink-700">
                                {c.message}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteContact(c.id)}
                              aria-label={`Delete message from ${c.name}`}
                              className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-[10px] border border-sand-200 text-ink-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-start"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}

              {/* SETTINGS VIEW */}
              {activeTab === 'settings' && (
                <motion.div key="settings" {...viewMotion} className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
                  {/* Profile settings */}
                  <SectionCard
                    title="Admin profile"
                    description="Login name, contact and alert numbers for the superadmin account."
                    icon={ShieldCheck}
                  >
                    {loading ? (
                      <LoadingState label="Loading settings..." />
                    ) : (
                      <form onSubmit={handleSettingsSubmit} className="space-y-5">
                        <Field id="settings-name" label="Superadmin username">
                          <input
                            id="settings-name"
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                            className="field"
                            autoComplete="username"
                            required
                          />
                        </Field>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field id="settings-phone" label="Contact phone">
                            <input
                              id="settings-phone"
                              type="text"
                              inputMode="tel"
                              value={settings.phone}
                              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                              className="field"
                              required
                            />
                          </Field>
                          <Field id="settings-whatsapp" label="WhatsApp dispatch number">
                            <input
                              id="settings-whatsapp"
                              type="text"
                              inputMode="tel"
                              value={settings.whatsapp}
                              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                              className="field"
                              required
                            />
                          </Field>
                        </div>

                        <Field id="settings-password" label="Password" hint="Enter the password to keep or a new one to change it.">
                          <input
                            id="settings-password"
                            type="password"
                            value={settings.password}
                            onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                            className="field"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                          />
                        </Field>

                        <div className="flex justify-end border-t border-sand-200 pt-5">
                          <button type="submit" className="btn btn-dark w-full sm:w-auto">
                            Save settings
                          </button>
                        </div>
                      </form>
                    )}
                  </SectionCard>

                  {/* WhatsApp bot */}
                  <SectionCard
                    title="WhatsApp alert bot"
                    description="Sends booking and enquiry alerts to the admin number."
                    icon={MessageCircle}
                    action={
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${
                          whatsappStatus.isConnected
                            ? 'bg-leaf-50 text-leaf-600 ring-leaf-500/30'
                            : 'bg-red-50 text-red-700 ring-red-200'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${whatsappStatus.isConnected ? 'animate-pulse bg-leaf-500' : 'bg-red-500'}`}
                          aria-hidden="true"
                        />
                        {whatsappStatus.isConnected ? 'Connected' : 'Disconnected'}
                      </span>
                    }
                  >
                    <div className="space-y-5">
                      <div className="flex flex-wrap gap-2">
                        {whatsappStatus.isConnected && (
                          <>
                            <button
                              type="button"
                              onClick={handleWhatsappTest}
                              disabled={loadingWhatsapp}
                              className="btn btn-whatsapp min-h-10 px-3.5 py-2 text-sm"
                            >
                              <Send className="h-4 w-4" aria-hidden="true" /> Test message
                            </button>
                            <button
                              type="button"
                              onClick={handleWhatsappDisconnect}
                              disabled={loadingWhatsapp}
                              className="btn min-h-10 border border-red-200 bg-white px-3.5 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Unplug className="h-4 w-4" aria-hidden="true" /> Disconnect
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={handleWhatsappReconnect}
                          disabled={loadingWhatsapp}
                          className="btn btn-outline min-h-10 px-3.5 py-2 text-sm"
                        >
                          <RefreshCw className={`h-4 w-4 ${loadingWhatsapp ? 'animate-spin' : ''}`} aria-hidden="true" />
                          {loadingWhatsapp ? 'Processing...' : 'Reconnect bot'}
                        </button>
                      </div>

                      {!whatsappStatus.isConnected && (
                        <div className="rounded-[14px] border border-sand-200 bg-sand-50 p-5 text-center">
                          <p className="flex items-center justify-center gap-2 text-sm font-bold text-ink-900">
                            <QrCode className="h-4 w-4 text-gold-600" aria-hidden="true" />
                            Scan with WhatsApp to link this device
                          </p>
                          {whatsappStatus.qrCode ? (
                            <div className="mt-4 inline-block rounded-[14px] border border-sand-200 bg-white p-3 shadow-[var(--shadow-soft)]">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappStatus.qrCode)}`}
                                alt="WhatsApp QR code"
                                className="mx-auto block h-48 w-48"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center gap-2 py-8 text-xs font-medium text-ink-500" role="status">
                              <Loader2 className="h-6 w-6 animate-spin text-gold-500" aria-hidden="true" />
                              Waiting for server to generate QR code...
                            </div>
                          )}
                          <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-ink-500">
                            Open WhatsApp on your phone → Menu or Settings → Linked devices → Link a device.
                          </p>
                        </div>
                      )}

                      {whatsappStatus.isConnected && (
                        <>
                          <div className="flex items-start gap-3 rounded-[10px] border border-leaf-500/20 bg-leaf-50 p-4 text-sm font-medium text-leaf-600">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                            Bot is active and ready to dispatch booking and contact alerts to admin.
                          </div>

                          <div className="rounded-[14px] border border-sand-200 p-4 sm:p-5">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ink-900">
                              <MessageSquare className="h-4 w-4 text-gold-600" aria-hidden="true" /> Send a custom message
                            </h3>
                            <div className="space-y-4">
                              <Field id="wa-custom-phone" label="Recipient phone number">
                                <input
                                  id="wa-custom-phone"
                                  type="text"
                                  inputMode="tel"
                                  value={customMsgPhone}
                                  onChange={(e) => setCustomMsgPhone(e.target.value)}
                                  className="field"
                                  placeholder="e.g. 6382513075"
                                />
                              </Field>
                              <Field id="wa-custom-text" label="Message">
                                <textarea
                                  id="wa-custom-text"
                                  value={customMsgText}
                                  onChange={(e) => setCustomMsgText(e.target.value)}
                                  className="field h-28 resize-none"
                                  placeholder="Type your message..."
                                />
                              </Field>
                              <button
                                type="button"
                                onClick={handleSendCustomMessage}
                                disabled={sendingCustomMsg || !customMsgPhone || !customMsgText}
                                className="btn btn-dark w-full"
                              >
                                {sendingCustomMsg ? (
                                  <>
                                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending...
                                  </>
                                ) : (
                                  <>
                                    <Send className="h-4 w-4" aria-hidden="true" /> Send message
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      <p className="text-xs text-ink-400">
                        Session credentials are stored securely in SQLite and persist across restarts.
                      </p>
                    </div>
                  </SectionCard>
                </motion.div>
              )}

              {/* ADD ADMIN VIEW */}
              {activeTab === 'add-admin' && (
                <motion.div key="add-admin" {...viewMotion} className="max-w-2xl">
                  <SectionCard
                    title="New administrator account"
                    description="The new admin can sign in with this username and password."
                    icon={UserPlus}
                  >
                    <form onSubmit={handleAddAdminSubmit} className="space-y-5">
                      <Field id="new-admin-name" label="Username">
                        <input
                          id="new-admin-name"
                          type="text"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                          className="field"
                          placeholder="e.g. Subadmin2"
                          autoComplete="off"
                          required
                        />
                      </Field>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Field id="new-admin-phone" label="Phone">
                          <input
                            id="new-admin-phone"
                            type="text"
                            inputMode="tel"
                            value={newAdmin.phone}
                            onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                            className="field"
                            placeholder="Phone number"
                          />
                        </Field>
                        <Field id="new-admin-whatsapp" label="WhatsApp number">
                          <input
                            id="new-admin-whatsapp"
                            type="text"
                            inputMode="tel"
                            value={newAdmin.whatsapp}
                            onChange={(e) => setNewAdmin({ ...newAdmin, whatsapp: e.target.value })}
                            className="field"
                            placeholder="Alert recipient number"
                          />
                        </Field>
                      </div>

                      <Field id="new-admin-password" label="Password">
                        <input
                          id="new-admin-password"
                          type="password"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                          className="field"
                          placeholder="Create a password"
                          autoComplete="new-password"
                          required
                        />
                      </Field>

                      <div className="flex justify-end border-t border-sand-200 pt-5">
                        <button type="submit" className="btn btn-primary w-full sm:w-auto">
                          <UserPlus className="h-4 w-4" aria-hidden="true" /> Create administrator
                        </button>
                      </div>
                    </form>
                  </SectionCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* VEHICLE MODAL */}
      <AnimatePresence>
        {carModal.isOpen && (
          <ModalShell
            title={carModal.isEdit ? 'Edit vehicle' : 'Add new vehicle'}
            description="Details shown on the public Fleet page."
            onClose={closeCarModal}
            onSubmit={handleCarSubmit}
            submitLabel={carModal.isEdit ? 'Save changes' : 'Add vehicle'}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="car-name" label="Vehicle name">
                  <input id="car-name" type="text" value={carModal.data.name} onChange={setCarField('name')} className="field" required />
                </Field>
                <Field id="car-price" label="Price label" hint="e.g. ₹12/km">
                  <input id="car-price" type="text" value={carModal.data.price} onChange={setCarField('price')} className="field" required />
                </Field>
                <Field id="car-seats" label="Seats">
                  <select id="car-seats" value={carModal.data.seats} onChange={setCarField('seats')} className="field">
                    <option>4 Seater</option>
                    <option>7 Seater</option>
                    <option>12 Seater</option>
                    <option>18 Seater</option>
                  </select>
                </Field>
                <Field id="car-ac" label="AC / Non-AC">
                  <select id="car-ac" value={carModal.data.ac} onChange={setCarField('ac')} className="field">
                    <option>AC</option>
                    <option>Non-AC</option>
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <ImagePicker
                    id="car-image"
                    label="Vehicle image"
                    previewSrc={carModal.data.image ? getVehicleImage(carModal.data.image) : null}
                    contain
                    onChange={(e) => handleImageUpload(e, setCarModal, 'image')}
                  />
                </div>
              </div>

              <div className="border-t border-sand-200 pt-5">
                <FormGroupTitle>Outstation plan</FormGroupTitle>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field id="car-out-rate" label="Rate">
                    <input id="car-out-rate" type="text" value={carModal.data.outstationRate || ''} onChange={setCarField('outstationRate')} className="field" placeholder="₹14/km" />
                  </Field>
                  <Field id="car-out-min" label="Min distance">
                    <input id="car-out-min" type="text" value={carModal.data.outstationMinKm || ''} onChange={setCarField('outstationMinKm')} className="field" placeholder="Above 250 km" />
                  </Field>
                  <Field id="car-out-driver" label="Driver charge">
                    <input id="car-out-driver" type="text" value={carModal.data.outstationDriver || ''} onChange={setCarField('outstationDriver')} className="field" placeholder="₹300/day" />
                  </Field>
                </div>
              </div>

              <div className="border-t border-sand-200 pt-5">
                <FormGroupTitle>Day rental plan</FormGroupTitle>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field id="car-day-base" label="Base rent">
                    <input id="car-day-base" type="text" value={carModal.data.dayBaseRent || ''} onChange={setCarField('dayBaseRent')} className="field" placeholder="Rs. 2700" />
                  </Field>
                  <Field id="car-day-km" label="Per km charge">
                    <input id="car-day-km" type="text" value={carModal.data.dayPerKm || ''} onChange={setCarField('dayPerKm')} className="field" placeholder="Rs. 17/km" />
                  </Field>
                  <Field id="car-day-driver" label="Driver charge">
                    <input id="car-day-driver" type="text" value={carModal.data.dayDriver || ''} onChange={setCarField('dayDriver')} className="field" placeholder="Rs. 400/day" />
                  </Field>
                </div>
              </div>
            </div>
          </ModalShell>
        )}
      </AnimatePresence>

      {/* PACKAGE MODAL */}
      <AnimatePresence>
        {pkgModal.isOpen && (
          <ModalShell
            title={pkgModal.isEdit ? 'Edit package' : 'Add new package'}
            description="Details shown on the public Packages page."
            onClose={closePkgModal}
            onSubmit={handlePkgSubmit}
            submitLabel={pkgModal.isEdit ? 'Save changes' : 'Add package'}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="pkg-name" label="Package name">
                  <input id="pkg-name" type="text" value={pkgModal.data.name} onChange={setPkgField('name')} className="field" required />
                </Field>
                <Field id="pkg-duration" label="Duration & distance">
                  <input id="pkg-duration" type="text" value={pkgModal.data.duration} onChange={setPkgField('duration')} className="field" placeholder="e.g. 12 Hours / 300 KM" required />
                </Field>
                <Field id="pkg-price" label="Price">
                  <input id="pkg-price" type="text" value={pkgModal.data.price} onChange={setPkgField('price')} className="field" placeholder="e.g. ₹5000" required />
                </Field>
                <Field id="pkg-location" label="Location">
                  <input id="pkg-location" type="text" value={pkgModal.data.location || ''} onChange={setPkgField('location')} className="field" placeholder="e.g. Madurai, Tamil Nadu" />
                </Field>
                <Field id="pkg-rating" label="Rating">
                  <input id="pkg-rating" type="text" value={pkgModal.data.rating || ''} onChange={setPkgField('rating')} className="field" placeholder="e.g. 5.0" />
                </Field>
                <Field id="pkg-reviews" label="Review count">
                  <input id="pkg-reviews" type="text" value={pkgModal.data.reviewCount || ''} onChange={setPkgField('reviewCount')} className="field" placeholder="e.g. 250+" />
                </Field>
                <div className="sm:col-span-2">
                  <ImagePicker
                    id="pkg-image"
                    label="Cover image"
                    previewSrc={pkgModal.data.image ? getPackageImage(pkgModal.data.image) : null}
                    onChange={(e) => handleImageUpload(e, setPkgModal, 'image')}
                  />
                </div>
              </div>

              <Field id="pkg-places" label="Places covered (description)">
                <textarea id="pkg-places" value={pkgModal.data.places} onChange={setPkgField('places')} className="field h-28" required />
              </Field>
            </div>
          </ModalShell>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Small row/card sub-components ───────────────────────── */
const BookingPhone = ({ phone }) => {
  if (!phone) return null;
  const wa = waLink(phone);
  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs">
      <a href={`tel:${phone}`} className="inline-flex items-center gap-1 font-medium text-ink-500 hover:text-ink-900">
        <Phone className="h-3 w-3" aria-hidden="true" /> {phone}
      </a>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`WhatsApp ${phone}`}
          className="inline-flex items-center gap-1 rounded px-1 font-semibold text-leaf-600 hover:bg-leaf-50"
        >
          <MessageCircle className="h-3 w-3" aria-hidden="true" /> WhatsApp
        </a>
      )}
    </div>
  );
};

const BookingRoute = ({ from, to }) => (
  <div className="space-y-1 text-xs font-medium text-ink-700">
    <div className="flex min-w-0 items-center gap-2" title={from}>
      <span className="h-2 w-2 shrink-0 rounded-full border-2 border-ink-700" aria-hidden="true" />
      <span className="sr-only">From:</span>
      <span className="truncate">{from}</span>
    </div>
    <div className="flex min-w-0 items-center gap-2" title={to}>
      <MapPin className="h-3 w-3 shrink-0 -translate-x-0.5 text-gold-600" aria-hidden="true" />
      <span className="sr-only">To:</span>
      <span className="truncate">{to}</span>
    </div>
  </div>
);

const BookingActions = ({ booking, onStatus, onDelete, stretch = false }) => (
  <div className={`flex items-center gap-2 ${stretch ? '' : 'justify-end'}`}>
    <select
      value={booking.status || 'Pending'}
      onChange={(e) => onStatus(booking.id, e.target.value)}
      aria-label={`Update status for booking ${booking.id}`}
      className={`field min-h-9 py-1.5 pl-3 text-sm ${stretch ? 'flex-1' : 'w-36'}`}
    >
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Completed">Completed</option>
    </select>
    <button
      type="button"
      onClick={() => onDelete(booking.id)}
      aria-label={`Delete booking ${booking.id}`}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-sand-200 text-ink-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  </div>
);

const CardActions = ({ name, onEdit, onDelete }) => (
  <div className="mt-5 flex items-center gap-2 border-t border-sand-200 pt-4">
    <button type="button" onClick={onEdit} className="btn btn-outline min-h-9 flex-1 px-3 py-1.5 text-sm" aria-label={`Edit ${name}`}>
      <Edit className="h-4 w-4" aria-hidden="true" /> Edit
    </button>
    <button
      type="button"
      onClick={onDelete}
      aria-label={`Delete ${name}`}
      className="btn min-h-9 border border-sand-200 px-3 py-1.5 text-sm text-red-600 hover:border-red-200 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
    </button>
  </div>
);

export default AdminDashboard;
