import { Gem, ChevronDown, Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

export interface TokenOption {
  id: string;
  name: string; // Auremiya, Lunaria
  ticker: string; // $YAMI, $LUNA
  avatar: string;
  balance: number;
  color: string; // For accent color
}

interface TokenSelectorProps {
  tokens: TokenOption[];
  selectedToken: string; // token id
  onSelectToken: (tokenId: string) => void;
  label?: string;
  showBalance?: boolean;
}

export function TokenSelector({
  tokens,
  selectedToken,
  onSelectToken,
  label = "Select Token:",
  showBalance = true,
}: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedTokenData =
    tokens.find((t) => t.id === selectedToken) || tokens[0];

  // Filter tokens based on search
  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If 4 or fewer tokens, use grid layout
  if (tokens.length <= 4) {
    return (
      <div>
        {label && (
          <label className="text-gray-900 font-bold mb-3 block">{label}</label>
        )}

        <div className="grid grid-cols-2 gap-3">
          {tokens.map((token) => {
            const isSelected = selectedToken === token.id;

            return (
              <button
                key={token.id}
                onClick={() => onSelectToken(token.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all text-left
                  ${
                    isSelected
                      ? "border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                  }
                `}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/* Token Info */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 flex-shrink-0">
                    <ImageWithFallback
                      src={token.avatar}
                      alt={token.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 truncate">
                      {token.name}
                    </div>
                    <div className="text-sm font-semibold text-purple-600">
                      {token.ticker}
                    </div>
                  </div>
                </div>

                {/* Balance */}
                {showBalance && (
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Gem className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                    <span className="font-semibold truncate">
                      {token.balance.toLocaleString()}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // For more than 4 tokens, use compact dropdown with search
  return (
    <div>
      {label && (
        <label className="text-gray-900 font-bold mb-3 block">{label}</label>
      )}

      <div className="relative">
        {/* Selected Token Display */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 flex-shrink-0">
              <ImageWithFallback
                src={selectedTokenData.avatar}
                alt={selectedTokenData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900">
                {selectedTokenData.name}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="font-semibold text-purple-600">
                  {selectedTokenData.ticker}
                </span>
                {showBalance && (
                  <>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1">
                      <Gem className="w-3.5 h-3.5 text-yellow-600" />
                      <span>{selectedTokenData.balance.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Dropdown Content */}
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-purple-200 rounded-xl shadow-2xl z-20 overflow-hidden">
              {/* Search Bar */}
              <div className="p-3 border-b-2 border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search talents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-400 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Token List - Scrollable */}
              <div className="max-h-80 overflow-y-auto">
                {filteredTokens.length > 0 ? (
                  filteredTokens.map((token) => {
                    const isSelected = selectedToken === token.id;

                    return (
                      <button
                        key={token.id}
                        onClick={() => {
                          onSelectToken(token.id);
                          setIsDropdownOpen(false);
                          setSearchQuery("");
                        }}
                        className={`
                          w-full p-3 flex items-center gap-3 transition-colors text-left
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600"
                              : "hover:bg-gray-50 border-l-4 border-transparent"
                          }
                        `}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200 flex-shrink-0">
                          <ImageWithFallback
                            src={token.avatar}
                            alt={token.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 truncate">
                            {token.name}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="font-semibold text-purple-600">
                              {token.ticker}
                            </span>
                            {showBalance && (
                              <>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center gap-1">
                                  <Gem className="w-3.5 h-3.5 text-yellow-600" />
                                  <span>{token.balance.toLocaleString()}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No talents found
                  </div>
                )}
              </div>

              {/* Footer Info */}
              <div className="p-3 bg-gray-50 border-t-2 border-gray-100 text-xs text-gray-600 text-center">
                {tokens.length} talents available
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
