// components/Navbar/Logo.tsx
export default function Logo() {
  return (
    <a href="/homepage" className="flex items-center gap-2 text-emerald-700 font-bold text-xl flex-shrink-0 min-w-0">
      <img src="/logo-rb.png" alt="Logo NextCart" className="w-10 h-10" />
      <span className="ml-2 hidden sm:inline truncate">NextCart</span>
    </a>
  );
}
