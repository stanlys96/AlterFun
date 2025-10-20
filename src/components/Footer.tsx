import { Twitter, MessageCircle, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#7E34FF] via-purple-600 to-[#03EC86] text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://i.imgur.com/qlv7uap.png"
              alt="ALTERFUN"
              className="h-8 mb-2"
            />
            <p className="text-blue-100 text-sm">
              The launchpad for tomorrow's Digital Talent
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Connect With Us</h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-blue-100">
          <p>&copy; 2025 AlterFUN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
