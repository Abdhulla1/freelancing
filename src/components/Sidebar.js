'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Ripple } from 'primereact/ripple';

export default function SidebarComp() {
  const [visible, setVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);

      handleResize(); // Initialize on mount
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-primary text-white transition-all transform z-40 ${
          visible || isLargeScreen ? 'w-64' : 'w-16'
        } overflow-y-auto`}
      >
        <SidebarContent isExpanded={visible || isLargeScreen} setVisible={setVisible} />
      </div>

      {/* Overlay for Mobile */}
      {visible && !isLargeScreen && (
        <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setVisible(false)}></div>
      )}
    </div>
  );
}

function SidebarContent({ isExpanded, setVisible }) {
  const [workDropdown, setWorkDropdown] = useState(false);
  const [monitorDropdown, setMonitorDropdown] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures rendering happens on the client side
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-primary text-white px-4">
      {/* Close Button for Mobile */}
      {isExpanded && isClient && window.innerWidth < 1024 && (
        <div className="lg:hidden flex justify-end p-4">
          <i className="pi pi-times text-white cursor-pointer" onClick={() => setVisible(false)}></i>
        </div>
      )}

      {/* Company Logo & Name */}
      {isExpanded && (
        <div className="flex flex-col items-center justify-center py-4">
          <img src="/path-to-logo.png" alt="CAPINEX Logo" className="h-8 transition-transform duration-300 transform hover:scale-110" />
          <p className="text-xs text-gray-400 mt-1">MONEY MARK</p>
        </div>
      )}

      {/* Sidebar Items */}
      <div className="overflow-y-auto flex-1 mt-3">
        {/* Burger Menu Icon for Mobile */}
        {!isExpanded && (
          <i
            className="pi pi-bars px-3 py-1 mb-10 lg:hidden text-white cursor-pointer transition-transform duration-300 transform hover:scale-110"
            onClick={() => setVisible(true)}
          ></i>
        )}
        <ul className="list-none space-y-4">
          <SidebarItem icon="pi pi-home" label="Home" isExpanded={isExpanded} href="/" />
          <SidebarItem icon="pi pi-user" label="Admin Board" isExpanded={isExpanded} href="/admin-board" />

          {/* My Work Dropdown */}
          <SidebarDropdown
            icon="pi pi-briefcase"
            label="My Work"
            isOpen={workDropdown}
            toggle={() => setWorkDropdown(!workDropdown)}
            items={[
              { label: 'Leads', href: '/my-work/leads' },
              { label: 'Backend Processing', href: '/my-work/backend-processing' },
              { label: 'Cold Calling', href: '/my-work/cold-calling' },
              { label: 'Backlog', href: '/my-work/backlog' },
              { label: 'Missed Calls', href: '/my-work/missed-calls' },
            ]}
            isExpanded={isExpanded}
          />

          <SidebarItem icon="pi pi-check-circle" label="Disbursed Leads" isExpanded={isExpanded} href="/disbursed-leads" />
          <SidebarItem icon="pi pi-star" label="Customer" isExpanded={isExpanded} href="/customer" />
          <SidebarItem icon="pi pi-users" label="Users" isExpanded={isExpanded} href="/users" />
          <SidebarItem icon="pi pi-ban" label="DND" isExpanded={isExpanded} href="/dnd" />
          <SidebarItem icon="pi pi-send" label="Campaign" isExpanded={isExpanded} href="/campaign" />

          {/* Monitoring Dropdown */}
          <SidebarDropdown
            icon="pi pi-headphones"
            label="Monitoring"
            isOpen={monitorDropdown}
            toggle={() => setMonitorDropdown(!monitorDropdown)}
            items={[
              { label: 'Agent Board', href: '/monitoring/agent-board' },
              { label: 'Agent Report', href: '/monitoring/agent-report' },
              { label: 'Voice Logger', href: '/monitoring/voice-logger' },
              { label: 'SIM Map', href: '/monitoring/sim-map' },
            ]}
            isExpanded={isExpanded}
          />
          <SidebarItem icon="pi pi-building-columns" label="Bank Contact" isExpanded={isExpanded} href="/bank-contact" />
          <SidebarItem icon="pi pi-link" label="Connector" isExpanded={isExpanded} href="/connector" />
        </ul>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, isExpanded, href }) {
  return (
    <li>
      <Link href={href} className="flex items-center space-x-3 text-white hover:text-gray-300 px-3 py-1">
        <i className={`${icon} text-lg`}></i>
        {isExpanded && <span>{label}</span>}
      </Link>
    </li>
  );
}

function SidebarDropdown({ icon, label, isOpen, toggle, items, isExpanded }) {
  return (
    <li>
      <div className="p-ripple flex items-center justify-between text-white cursor-pointer hover:text-gray-300 px-3 py-2 " onClick={toggle}>
        <div className="flex items-center space-x-3">
          <i className={icon}></i>
          {isExpanded && <span className="font-medium">{label}</span>}
        </div>
        {isExpanded && <i className={`pi pi-chevron-down transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}></i>}
        <Ripple />
      </div>
      {isExpanded && (
        <ul className={`list-none pl-6 mt-2 space-y-2 transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
          {items.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="text-white hover:text-gray-300 transition-transform duration-300 transform hover:scale-105">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}