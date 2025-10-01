import { FaTelegram, FaWhatsapp, FaComments,
  //  FaFacebook,
  //   FaInstagram, FaTwitter, FaTiktok 
  } from 'react-icons/fa';

function Community() {
  const telegramLink = "https://t.me/+ggTLaOM6gCZjZGNk";
  const whatsappLink = "https://chat.whatsapp.com/B7hAvRzlvZF0EtisQ7GaRJ"; 
  // const socials = [ 
  //   { name: "Telegram", icon: <FaTelegram />, link: telegramLink },
  //   { name: "WhatsApp", icon: <FaWhatsapp />, link: whatsappLink },
  //   // { name: "Chat a Councilor", icon: <FaComments />, onClick: handleCouncilorChat },
  //   {name: "Facebook", icon: <FaFacebook />, link: "https://www.facebook.com/H.O.P.E" },
  //   {name: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/H.O.P.E" },
  //   {name: "Twitter", icon: <FaTwitter />, link: "https://twitter.com/H.O.P.E" },
  //   {name: "TikTok", icon: <FaTiktok />, link: "https://www.tiktok.com/@H.O.P.E" },
  // ];

  const councilors = [
    { name: "Councilor sulaiman", number: "+2348038390300" },
    { name: "Councilor Sarah", number: "+2349096155347" },
    
  ];

  // Function to get a random councilor
  const getRandomCouncilor = () => {
    const randomIndex = Math.floor(Math.random() * councilors.length);
    return councilors[randomIndex];
  };

  // Function to handle "Chat a Councilor" click
  const handleCouncilorChat = () => {
    const councilor = getRandomCouncilor();
    const whatsappUrl = `https://wa.me/${councilor.number}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mt-8">Join Our Community</h1>
          <p className="text-xl text-gray-600">
            Connect with others, get support, and engage with our councilors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Telegram Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <FaTelegram className="text-blue-500 text-5xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">Telegram Group</h2>
              <p className="text-gray-600 text-center mb-6">
                Join our active Telegram community for discussions and updates.
              </p>
              <div className="flex justify-center">
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
                >
                  Join {}
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <FaWhatsapp className="text-green-500 text-5xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">WhatsApp Community</h2>
              <p className="text-gray-600 text-center mb-6">
                Be part of our WhatsApp group for instant communication.
              </p>
              <div className="flex justify-center">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
                >
                  Join WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Councilor Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <FaComments className="text-purple-500 text-5xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">Chat a Councilor</h2>
              <p className="text-gray-600 text-center mb-6">
                Get personalized help by chatting with one of our councilors.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleCouncilorChat}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
                >
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">About Our Community</h2>
          <p className="text-gray-600 mb-4">
            Our community is a safe space for sharing ideas, getting support, and connecting with
            like-minded individuals. Whether you prefer Telegram or WhatsApp, we have an active
            group waiting for you.
          </p>
          <p className="text-gray-600">
            Our councilors are available to provide guidance and support. The "Chat a Councilor"
            feature will connect you with one of our available councilors.
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Stand For</h2>
          <p className="text-gray-600 mb-4">
            Gender-based violence is not just a personal issue — it is a societal crisis.
        It affects women, men, children and individuals across cultures and communities. 
        Our mission is to:
          </p>
        <ul > 
        <li>Empower survivors through support, healing, and advocacy</li>
        <li>Educate communities on the root causes and consequences of GBV</li>
        <li>Engage allies and changemakers to take action and create safe spaces</li>
        <li>Elevate voices that are often silenced, ignored, or marginalized</li>
            </ul>
          
        </div>
      </div>
    </div>
  );
};

export default Community;