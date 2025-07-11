import Navbar from '../navbar/pages/navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <Outlet />
      </main>
    </>
  );
}
