import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 p-6 text-base-content sm:p-8 md:grid md:grid-cols-2 md:text-left lg:grid-cols-4 lg:p-10">
      {/* Brand */}
      <aside className="w-full md:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <span className="text-3xl">📚</span>
          <h2 className="text-2xl font-bold">Book Vibe</h2>
        </div>

        <p className="mt-3 max-w-xs text-sm leading-6 text-base-content/70">
          Discover your next favorite book and let every story take you
          somewhere new.
        </p>

        <p className="mt-4 text-xs text-base-content/50">
          © {new Date().getFullYear()} Book Vibe.
          <br className="sm:hidden" /> All rights reserved.
        </p>
      </aside>

      {/* Explore */}
      <nav className="w-full">
        <h6 className="footer-title">Explore</h6>

        <Link href="/books" className="link link-hover">
          All Books
        </Link>

        <Link href="/categories" className="link link-hover">
          Categories
        </Link>

        <Link href="/popular" className="link link-hover">
          Popular Books
        </Link>

        <Link href="/new-releases" className="link link-hover">
          New Releases
        </Link>
      </nav>

      {/* Book Vibe */}
      <nav className="w-full">
        <h6 className="footer-title">Book Vibe</h6>

        <Link href="/about" className="link link-hover">
          About Us
        </Link>

        <Link href="/contact" className="link link-hover">
          Contact
        </Link>

        <Link href="/faq" className="link link-hover">
          FAQ
        </Link>

        <Link href="/privacy" className="link link-hover">
          Privacy Policy
        </Link>
      </nav>

      {/* Newsletter */}
      <nav className="w-full md:col-span-2 lg:col-span-1">
        <h6 className="footer-title">Stay Connected</h6>

        <p className="max-w-sm text-sm leading-6 text-base-content/70">
          Get book recommendations, new releases, and reading inspiration.
        </p>

        <div className="mt-3 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full sm:flex-1"
          />

          <button className="btn btn-primary w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </nav>
    </footer>
  );
}

