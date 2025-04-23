
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FerryOrderModal from "./FerryOrderModal";

export default function TopNav() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-200 dark:bg-gray-900 text-black dark:text-white px-6 py-4 shadow flex items-center gap-6 z-50">
        <div className="relative">
          <button onClick={() => toggleDropdown('ferry')} className="font-semibold hover:underline">
            FERRY
          </button>
          {openDropdown === 'ferry' && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded text-sm w-56 z-50">
              <Link
                to="/ferry-orders"
                className={"block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 " + (isActive("/ferry-orders") ? "font-bold" : "")}
                onClick={() => setOpenDropdown(null)}
              >
                Zamówienia promowe
              </Link>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => toggleDropdown('ustawienia')} className="font-semibold hover:underline">
            USTAWIENIA
          </button>
          {openDropdown === 'ustawienia' && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded text-sm w-56 z-50">
              <Link
                to="/users"
                className={"block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 " + (isActive("/users") ? "font-bold" : "")}
                onClick={() => setOpenDropdown(null)}
              >
                Użytkownicy
              </Link>
              <Link
                to="/roles"
                className={"block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 " + (isActive("/roles") ? "font-bold" : "")}
                onClick={() => setOpenDropdown(null)}
              >
                Role
              </Link>
            </div>
          )}
        </div>
        <Link to="/dashboard" className={isActive("/dashboard") ? "font-semibold" : ""}>
          Dashboard
        </Link>
        <Link to="/contractors" className={isActive("/contractors") ? "font-semibold" : ""}>
          Kontrahenci
        </Link>
      </nav>
      {showModal && (
        <FerryOrderModal
          onClose={() => setShowModal(false)}
          onSave={() => setShowModal(false)}
        />
      )}
    </>
  );
}
