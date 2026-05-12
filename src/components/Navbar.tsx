"use client"

import { useState } from "react"

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/Service" },
  { title: "Community", href: "/Community" },
  { title: "Contact Us", href: "/contact" },
  { title: "About Us", href: "/About Us" },
  { title: "Faq", href: "/Faq" },
]

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-gradient-to-r from-lime-400 to-lime-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 max-sm:px-2 max-md:px-3">
        <a href="/" className="flex items-center gap-3">
          <img src="/image.png" alt="SafePocket logo" className="h-10" />
          <span className="hidden text-sm font-semibold text-white sm:inline">SafePocket</span>
        </a>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-md p-2.5 text-white sm:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle main menu"
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav className="hidden sm:block" aria-label="Main navigation">
          <ul className="flex items-center gap-3">
            {menuItems.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-lime-100 hover:text-lime-800"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {mobileMenuOpen && (
        <nav className="space-y-2 rounded-b-md bg-lime-700 px-4 pb-6 pt-2 text-white sm:hidden" aria-label="Mobile navigation">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-lime-600"
            >
              {item.title}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Navbar
