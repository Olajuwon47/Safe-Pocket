function Icon({ kind }: { kind: "telegram" | "whatsapp" | "chat" }) {
  const common = "mx-auto mb-4 h-12 w-12"
  switch (kind) {
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={`${common} text-blue-500`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 11 17-7-4 16-5-6-4 4 1-6Z" />
        </svg>
      )
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={`${common} text-green-500`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21a9 9 0 1 0-7.7-4.3L3 21l4.4-1.2A9 9 0 0 0 12 21Z" />
          <path d="M9.5 8.5c.3-1 .8-1.1 1.3-.4l.8 1.1c.2.3.2.7 0 1l-.7.8c.7 1.5 1.9 2.7 3.4 3.4l.8-.7c.3-.2.7-.2 1 0l1.1.8c.7.5.6 1-.4 1.3-.6.2-1.3.2-2 .1-3.2-.5-5.8-3-6.3-6.3-.1-.7-.1-1.4.1-2Z" />
        </svg>
      )
    case "chat":
      return (
        <svg viewBox="0 0 24 24" className={`${common} text-purple-500`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 5h16v10H8l-4 4V5Z" />
          <path d="M8 9h8" />
        </svg>
      )
  }
}

export default function Community() {
  const telegramLink = "https://t.me/safepocketcommunity";
  const whatsappLink = "https://chat.whatsapp.com/KiX1b8k3mYJH9F7y5G6Z5F";

  const mentors = [
    { name: "Agent jay", number: "" },
    { name: "Agent Sarah", number: "" },
  ];

  const getRandomMentor = () => mentors[Math.floor(Math.random() * mentors.length)];

  const handleMentorChat = () => {
    const mentor = getRandomMentor();
    window.open(`https://wa.me/${mentor.number}`, "_blank");
  };

  return (
    <div className="mt-16 bg-gradient-to-b from-lime-100 to-lime-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mt-8 text-4xl font-bold text-gray-900">Join Our Community</h1>
          <p className="text-xl text-gray-600">Connect with fellow savers, learn from mentors, and grow your wealth together.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-md bg-white shadow-lg transition-transform hover:scale-105">
            <div className="p-6 text-center">
              <Icon kind="telegram" />
              <h2 className="mb-3 text-2xl font-semibold">Telegram Group</h2>
              <p className="mb-6 text-gray-600">Join our Telegram hub for tips, discussions, and investment insights.</p>
              <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
                Join Telegram
              </a>
            </div>
          </div>

          <div className="rounded-md bg-white shadow-lg transition-transform hover:scale-105">
            <div className="p-6 text-center">
              <Icon kind="whatsapp" />
              <h2 className="mb-3 text-2xl font-semibold">WhatsApp Community</h2>
              <p className="mb-6 text-gray-600">Be part of savings groups and get daily financial motivation.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-500 px-6 py-2 text-white hover:bg-green-600">
                Join WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-md bg-white shadow-lg transition-transform hover:scale-105">
            <div className="p-6 text-center">
              <Icon kind="chat" />
              <h2 className="mb-3 text-2xl font-semibold">Chat a Mentor</h2>
              <p className="mb-6 text-gray-600">Need guidance? Chat with one of our financial mentors anytime.</p>
              <button onClick={handleMentorChat} className="rounded-full bg-purple-500 px-6 py-2 text-white hover:bg-purple-600">
                Chat Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">About Our Community</h2>
          <p className="mb-2 text-gray-600">
            Our community is more than a chat group - it is a circle of trust, accountability, and financial empowerment.
          </p>
        </div>

        <div className="mt-5 rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">What We Stand For</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>Empowering members to build consistent saving habits</li>
            <li>Creating investment awareness through peer learning</li>
            <li>Building group savings opportunities</li>
            <li>Encouraging accountability and collective financial growth</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
