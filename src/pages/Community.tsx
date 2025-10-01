import { FaTelegram, FaWhatsapp, FaComments } from 'react-icons/fa';

function Community() {
  const telegramLink = "https://t.me/safepocketcommunity";
  const whatsappLink = "https://chat.whatsapp.com/KiX1b8k3mYJH9F7y5G6Z5F"; 

  const mentors = [
    { name: "Agent jay", number: "" },
    { name: "Agent Sarah", number: "" },
  ];

  const getRandomMentor = () => {
    const randomIndex = Math.floor(Math.random() * mentors.length);
    return mentors[randomIndex];
  };

  const handleMentorChat = () => {
    const mentor = getRandomMentor();
    const whatsappUrl = `https://wa.me/${mentor.number}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="mt-16 bg-gradient-to-b from-lime-100 to-lime-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mt-8">Join Our Community</h1>
          <p className="text-xl text-gray-600">
            Connect with fellow savers, learn from mentors, and grow your wealth together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Telegram */}
          <div className="bg-white rounded-md shadow-lg hover:scale-105 transition-transform">
            <div className="p-6 text-center">
              <FaTelegram className="text-blue-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Telegram Group</h2>
              <p className="text-gray-600 mb-6">
                Join our Telegram hub for tips, discussions, and investment insights.
              </p>
              <a href={telegramLink} target="_blank" rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full">
                Join Telegram
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-md shadow-lg hover:scale-105 transition-transform">
            <div className="p-6 text-center">
              <FaWhatsapp className="text-green-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">WhatsApp Community</h2>
              <p className="text-gray-600 mb-6">
                Be part of savings groups and get daily financial motivation.
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full">
                Join WhatsApp
              </a>
            </div>
          </div>

          {/* Mentors */}
          <div className="bg-white rounded-md shadow-lg hover:scale-105 transition-transform">
            <div className="p-6 text-center">
              <FaComments className="text-purple-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Chat a Mentor</h2>
              <p className="text-gray-600 mb-6">
                Need guidance? Chat with one of our financial mentors anytime.
              </p>
              <button onClick={handleMentorChat}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-full">
                Chat Now
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-5 bg-white rounded-md shadow-md p-6">
          <h2 className="text font-semibold text-gray-800 mb-2">About Our Community</h2>
          <p className="text-gray-600 mb-2">
            Our community is more than a chat group — it’s a circle of trust, 
            accountability, and financial empowerment. Whether you’re saving for a 
            goal, exploring stock investments, or just starting your journey, you’ll 
            find support here.
          </p>
        </div>

        {/* Vision */}
        <div className="mt-5 bg-white rounded-md shadow-md p-6">
          <h2 className="text font-semibold text-gray-800 mb-2">What We Stand For</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Empowering members to build consistent saving habits</li>
            <li>Creating investment awareness through peer learning</li>
            <li>Building group savings opportunities</li>
            <li>Encouraging accountability & collective financial growth</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Community;
