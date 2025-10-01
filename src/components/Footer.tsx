import {} from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r  from-lime-400 to-lime-800 text-white py-10 px-6 max-sm:px-4 max-md:px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 max-md:grid-cols-2 max-sm:grid-cols-1">
        
        {/* Company */}
        <div>
          <h2 className="text-xl font-semibold mb-4">SafePocket Inc.</h2>
          <p className="text-sm max-w-xs">
            Building financial freedom, one saving goal at a time. 
            Save, invest, and grow your future with ease and security.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="/savings" className="hover:text-black">Savings</a></li>
            <li><a href="/stocks" className="hover:text-black">Invest in Stocks</a></li>
            <li><a href="/goals" className="hover:text-black">Savings Goals</a></li>
            <li><a href="/contact" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/faq" className="hover:text-black">FAQs</a></li>
            <li><a href="/policy" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-black">Terms & Conditions</a></li>
            <li><a href="/support" className="hover:text-black">Customer Support</a></li>
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-white text-black text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-cyan-300 text-black py-2 rounded hover:bg-cyan-600 transition"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            {/* Socials */}
            <a href="https://facebook.com" className="text-black hover:text-gray-800">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="https://instagram.com" className="text-black hover:text-gray-800">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="https://twitter.com" className="text-black hover:text-gray-800">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://youtube.com" className="text-black hover:text-gray-800">
              <i className="fab fa-youtube text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-300 mt-10 border-t border-gray-600 pt-4">
        &copy; {new Date().getFullYear()} SafePocket Inc. All rights reserved.
      </div>
    </footer>
  );
}
