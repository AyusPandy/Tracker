import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Tracker from './Tracker';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import { ArrowUpDown } from 'lucide-react';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';


function NavItem({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`px-2.5 py-0.5 rounded-full text-sm transition-all ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      {children}
    </Link>
  );
}

function Layout() {
  const [activeUsers, setActiveUsers] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Tracker setActiveUsers={setActiveUsers} />
      
      <header className="sticky top-0 z-50 w-full bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-md font-medium text-foreground">
              <ArrowUpDown className="size-4 text-foreground opacity-70" />
              <span>Tracker</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-0.5">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/about">About us</NavItem>
              <NavItem to="/services">Services</NavItem>
              <NavItem to="/contact">Contact</NavItem>
              <NavItem to="/dashboard">Dashboard</NavItem>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[0.7rem] tracking-widest opacity-60 uppercase font-medium text-foreground">{activeUsers} Online user</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
