// components/Navbar/GuestNav.tsx
export default function GuestNav() {
  const navItemClass = 'text-lg font-semibold hover:text-emerald-600 transition duration-200';

  return (
    <>
      <a href="/login" className={navItemClass}>
        Login
      </a>
      <a href="/register" className={navItemClass}>
        Registration
      </a>
    </>
  );
}
