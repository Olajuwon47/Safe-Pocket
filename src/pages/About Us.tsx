import { } from 'react';
import Team from './Team.tsx';

export default function About() {
  return (
    <>
      <section className="bg-white mt-8 text-gray-800 px-10 py-16 max-md:px-6 max-sm:px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 max-sm:text-2xl max-md:text-3xl">
            About SaveWise
          </h1>
          <p className="text-lg text-gray-600 max-sm:text-base">
            Building a culture of savings, smart investments, and financial freedom for everyday people.
          </p>
        </div>

        {/* Image & Story */}
        <div className="grid grid-cols-2 gap-10 items-center max-md:grid-cols-1">
          <img
            src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80"
            alt="Financial Growth"
            className="rounded-2xl shadow-lg w-full h-50 object-cover max-sm:h-64 max-md:h-80"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-4 max-sm:text-xl">Our Story</h2>
            <p className="text-gray-700 text-base leading-relaxed max-sm:text-sm">
              SaveWise was founded on a simple but powerful belief: everyone deserves the tools to build financial stability. 
              What started as a small idea to help young people save more has now grown into a platform where thousands set 
              goals, invest wisely, and take control of their money. From micro-savings to stock investments, we exist to 
              make financial growth simple, accessible, and rewarding.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-20 grid grid-cols-2 gap-10 items-center max-md:grid-cols-1">
          <div>
            <h2 className="text-2xl font-semibold mb-4 max-sm:text-xl">Our Mission</h2>
            <p className="text-gray-700 text-base leading-relaxed max-sm:text-sm">
              To empower individuals across Africa to save consistently, invest smartly, and achieve financial independence. 
              We are committed to creating a secure, user-friendly platform that encourages disciplined money habits and 
              long-term wealth creation.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&w=800&q=80"
            alt="Mission"
            className="rounded-2xl shadow-lg w-full h-50 object-cover max-sm:h-64 max-md:h-80"
          />
        </div>

        {/* Vision Section */}
        <div className="mt-20 grid grid-cols-2 gap-10 items-center max-md:grid-cols-1">
          <img
            src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d7?auto=format&fit=crop&w=800&q=80"
            alt="Vision"
            className="rounded-2xl shadow-lg w-full h-50 object-cover max-sm:h-64 max-md:h-80"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-4 max-sm:text-xl">Our Vision</h2>
            <p className="text-gray-700 text-base leading-relaxed max-sm:text-sm">
              To be the most trusted savings and investment partner across Africa, enabling millions to achieve their 
              financial goals. We envision a continent where financial literacy, access, and discipline are no longer 
              barriers, but stepping stones to prosperity.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-10 max-sm:text-xl">Our Core Values</h2>
          <div className="grid grid-cols-3 gap-8 text-center max-md:grid-cols-2 max-sm:grid-cols-1">
            <div>
              <h4 className="text-lg font-semibold mb-2">Discipline</h4>
              <p className="text-sm text-gray-600">We believe small, consistent actions lead to big results.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Trust</h4>
              <p className="text-sm text-gray-600">We ensure transparency and security in every transaction.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">We embrace technology to make saving and investing seamless.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h3 className="text-xl font-semibold mb-4 max-sm:text-lg">Ready to take control of your finances?</h3>
          <a
            href="/signup"
            className="inline-block bg-green-600 mt-10 hover:bg-green-500 text-white px-6 py-3 rounded-full font-medium transition max-sm:px-4 max-sm:py-2"
          >
            Start Saving Today
          </a>
        </div>
      </section>
      <Team />
    </>
  );
}
