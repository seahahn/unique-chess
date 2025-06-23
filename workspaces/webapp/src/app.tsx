import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Header from "~/components/Header";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          {/* Header Placeholder */}
          <Header />
          {/* Main Content Area */}
          <main class="min-h-[80vh] flex flex-col items-center justify-center">
            <Suspense>{props.children}</Suspense>
          </main>
          {/* Footer Placeholder */}
          <footer class="w-full text-center py-4 bg-base-200 mt-8">
            {/* TODO: Replace with Footer component */}
            <span class="text-sm text-gray-500">Footer placeholder</span>
          </footer>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
