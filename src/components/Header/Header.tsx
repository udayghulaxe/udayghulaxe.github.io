import React from "react";
import { NavLink } from "react-router-dom";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import './Header.scss';

const Header = () => {
  const headerLinks = [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Calendar',
      path: '/calendar'
    },
    {
      label: 'Payments',
      path: '/payments'
    },
  ]
  return (
    <header className="global__header">
      <div className="firefox:bg-neutral-0 fixed top-0 left-0 right-0 z-50 border-b border-neutral-400/50 bg-neutral-50/80 py-3 backdrop-blur-md firefox:bg-neutral-100 md:py-5">
        <div className="mx-auto max-w-screen-xl px-2 md:px-16 lg:text-left">
          <div className="flex items-center justify-between">
            <div className="flex-shrink-0 flex">
              <div className="site-logo">CP</div>
              <span className="text-2xl hidden md:block font-semibold text-indigo-800">
                Calendar & Payments
              </span>
            </div>
            <div className="md:block">
              <div className="md:ml-10 flex space-x-4">
                {headerLinks.map((link, index) => {
                  return <NavLink
                  key={`headerlink-${index}`}
                  className={({ isActive }) =>
                  isActive
                    ? "active bg-indigo-800 text-white hover:bg-indigo-800 hover:text-white px-3 py-2 rounded-md text-sm font-large"
                    : "text-indigo-800 hover:bg-indigo-800 hover:text-white px-1 md:px-3 py-2 rounded-md text-sm font-medium"
                }
                  to={link.path}
                >
                  {link.label}
                </NavLink>
                })}
                <GoogleLogin></GoogleLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
