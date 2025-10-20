import { TrendingUp, Users, Search, Gift, Check, X, ChevronDown, UserPlus, Key, Trophy } from 'lucide-react';

type JoinUsProps = {
  onNavigate: (page: string) => void;
};

export default function JoinUs({ onNavigate }: JoinUsProps) {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      <section className="relative bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <img
              src="https://i.imgur.com/2ejEbAY.png"
              alt="AlterFUN Creator Platform"
              className="w-full max-w-6xl mx-auto rounded-xl shadow-lg"
            />
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Give Your True Fans a Way to Grow With You.
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Alterfun helps you create "Creator Keys"—a special pass for your community. Your most loyal fans can get a Key to show their support. It's a new way for them to be part of your journey and get exclusive perks, all powered by you.
            </p>

            <button
              onClick={() => onNavigate('apply')}
              className="px-8 py-4 bg-[#7E34FF] text-white text-lg font-bold rounded-lg hover:bg-purple-700 transition-all hover:shadow-lg mb-4"
            >
              Apply Now
            </button>

            <div className="mt-4">
              <button
                onClick={scrollToHowItWorks}
                className="text-[#7E34FF] hover:text-purple-700 font-medium inline-flex items-center gap-2"
              >
                How does this work?
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-4">
            A New Way to Build Your "Inner Circle"
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple features that help you connect with your most dedicated supporters
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[#7E34FF] rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Show Off Your Hard Work
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our platform displays your key stats (like your viewer growth and stream hours). This shows new supporters that you're a dedicated creator, which helps your community grow.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[#03EC86] rounded-xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Connect with Your Core Supporters
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fans who get your Key aren't just passing by; they're your core community. They're here for the long haul and genuinely want to celebrate your success with you.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[#7E34FF] rounded-xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Be Seen by a New Audience
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our discovery page helps people find active streamers. Your strong stats help you stand out and attract new supporters who are excited about your content.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-[#03EC86] rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Give Back with Exclusive Perks
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You decide what your Key holders get. It's easy to grant access to a private Discord, host a special Q&A, or share behind-the-scenes content. It's your way of saying "thanks!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-4">
            How to Get Started
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Three simple steps to launch your Creator Keys
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#7E34FF] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full font-bold text-sm">
                  1
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Apply & Connect
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fill out a quick application. Once you're in, just connect your streaming accounts (YouTube, Twitch, etc.) so we can display your stats for your fans.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#7E34FF] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Key className="w-10 h-10 text-white" />
              </div>
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full font-bold text-sm">
                  2
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Create Your Key
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You get to set up your Creator Key. This is the special "pass" your fans will be able to get. You tell your community all about it.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#03EC86] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white rounded-full font-bold text-sm">
                  3
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Grow & Reward
              </h3>
              <p className="text-gray-700 leading-relaxed">
                As you stream and grow, your community can support you by getting a Key. You can then see who your holders are and give them the special perks you promised.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-12">
            Is This Right For You? (Let's Be Honest)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                This is a great fit if...
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#03EC86] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 leading-relaxed">
                    You are a consistent streamer (even if your audience is small!).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#03EC86] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 leading-relaxed">
                    You want a new, fun way to interact with your loyal fans.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#03EC86] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 leading-relaxed">
                    You want to offer special perks to your biggest supporters.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What This is NOT
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 leading-relaxed">
                    This is NOT a "get rich quick" scheme.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 leading-relaxed">
                    This is NOT a replacement for your main streaming platform (like YouTube or Twitch).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 leading-relaxed">
                    This is NOT just for huge streamers. It's for *consistent* streamers.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#7E34FF] via-purple-600 to-[#03EC86]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Build Something New With Your Fans?
          </h2>

          <p className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
            Give your best fans a new way to be part of your story. Applications are open, and we'd love to see what you're building.
          </p>

          <button
            onClick={() => onNavigate('apply')}
            className="px-8 py-4 bg-white text-[#7E34FF] text-lg font-bold rounded-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Start Your Creator Page
          </button>
        </div>
      </section>
    </div>
  );
}
