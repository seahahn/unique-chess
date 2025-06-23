import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

/**
 * Header component using DaisyUI navbar structure.
 * Includes navigation links and a user status placeholder.
 */
export default function Header() {
  const [open, setOpen] = createSignal(false);
  return (
    <header class="w-full bg-base-100 shadow">
      <nav class="navbar max-w-7xl mx-auto px-4">
        <div class="navbar-start">
          <A href="/" class="btn btn-ghost normal-case text-xl">3D Chess</A>
        </div>
        {/* Desktop Nav */}
        <div class="navbar-center hidden md:flex">
          <ul class="menu menu-horizontal px-1">
            <li><A href="/">Home</A></li>
            <li><A href="/login">Login</A></li>
            <li><A href="/profile">Profile</A></li>
          </ul>
        </div>
        {/* Mobile Nav Dropdown */}
        <div class="navbar-center md:hidden">
          <div class="dropdown">
            <label tabIndex={0} class="btn btn-ghost md:hidden" onClick={() => setOpen(!open())}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            {open() && (
              <ul tabIndex={0} class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><A href="/">Home</A></li>
                <li><A href="/login">Login</A></li>
                <li><A href="/profile">Profile</A></li>
              </ul>
            )}
          </div>
        </div>
        <div class="navbar-end flex items-center gap-2">
          {/* DaisyUI avatar for user status placeholder */}
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-8">
              <span>U</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm">Login</button>
        </div>
      </nav>
    </header>
  );
}