import { useState, useEffect } from "react";
import {
  X,
  Package,
  Zap,
  CheckCircle,
  Loader2,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  talentName: string;
}

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  userSparks: number;
}

type ModalState = "confirmation" | "processing" | "success";

export function RedeemModal({
  isOpen,
  onClose,
  product,
  userSparks,
}: RedeemModalProps) {
  const [modalState, setModalState] = useState<ModalState>("confirmation");
  const [processingProgress, setProcessingProgress] = useState(0);

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setModalState("confirmation");
      setProcessingProgress(0);
    }
  }, [isOpen]);

  // Processing animation
  useEffect(() => {
    if (modalState === "processing") {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Delay before showing success
            setTimeout(() => setModalState("success"), 300);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [modalState]);

  const handleConfirm = () => {
    setModalState("processing");
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const hasEnoughSparks = userSparks >= product.price;
  const remainingSparks = userSparks - product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={modalState === "confirmation" ? handleClose : undefined}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* CONFIRMATION STATE */}
        {modalState === "confirmation" && (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-6">
              {/* Decorative particles */}
              <div className="absolute top-2 right-20 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute top-6 right-32 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-75"></div>
              <div className="absolute bottom-4 right-16 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-150"></div>

              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3
                    className="font-bold text-2xl mb-1"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Confirm Redemption
                  </h3>
                  <p className="text-white/90 text-sm">
                    Review your purchase details
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Product Summary */}
              <div className="flex gap-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200">
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-purple-300 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-purple-600 font-bold mb-1">
                    {product.talentName}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-600 fill-purple-600" />
                    <span className="font-bold text-purple-600 text-lg">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-600">Sparks</span>
                  </div>
                </div>
              </div>

              {/* Sparks Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">
                    Your Current Sparks
                  </span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600 fill-purple-600" />
                    <span
                      className="font-bold text-gray-900 text-lg"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {userSparks.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-semibold">Item Cost</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-bold text-red-600 text-lg"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      -{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 bg-purple-50 rounded-xl px-4">
                  <span className="text-gray-900 font-bold">
                    After Redemption
                  </span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600 fill-purple-600" />
                    <span
                      className="font-bold text-purple-600 text-xl"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {remainingSparks.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Warning if low balance */}
              {remainingSparks < 1000 && hasEnoughSparks && (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Your Sparks balance will be low after this redemption.
                    Consider completing missions to earn more!
                  </p>
                </div>
              )}

              {/* Insufficient funds */}
              {!hasEnoughSparks && (
                <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
                  <p className="text-sm text-red-800 font-semibold">
                    ❌ Insufficient Sparks. You need{" "}
                    {(product.price - userSparks).toLocaleString()} more Sparks
                    to redeem this item.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!hasEnoughSparks}
                className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  hasEnoughSparks
                    ? "bg-gradient-to-r from-green-600 to-green-500 text-white hover:scale-105 hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Package className="w-5 h-5" />
                Confirm Redemption
              </button>
            </div>
          </>
        )}

        {/* PROCESSING STATE */}
        {modalState === "processing" && (
          <div className="p-12 text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              {/* Spinning loader */}
              <div className="absolute inset-0 border-8 border-purple-200 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-transparent border-t-purple-600 rounded-full animate-spin"></div>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-12 h-12 text-purple-600 animate-pulse" />
              </div>
            </div>

            <h3
              className="font-bold text-2xl text-gray-900 mb-2"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Processing Redemption
            </h3>
            <p className="text-gray-600 mb-6">
              Please wait while we process your order...
            </p>

            {/* Progress bar */}
            <div className="max-w-xs mx-auto">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 ease-out"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {processingProgress}%
              </p>
            </div>
          </div>
        )}

        {/* SUCCESS STATE */}
        {modalState === "success" && (
          <>
            <div className="p-12 text-center">
              {/* Success animation */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                {/* Outer glow rings */}
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="absolute inset-4 bg-green-500/30 rounded-full animate-pulse"></div>

                {/* Main circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle className="w-16 h-16 text-white animate-in zoom-in duration-500" />
                </div>

                {/* Sparkles */}
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                <Sparkles className="absolute -bottom-2 -left-2 w-5 h-5 text-yellow-400 animate-pulse delay-150" />
              </div>

              <h3
                className="font-bold text-3xl text-gray-900 mb-3"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Redemption Successful!
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Congratulations!{" "}
                <span className="font-bold text-purple-600">
                  {product.name}
                </span>{" "}
                has been added to your inventory.
              </p>

              {/* Success details */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 mb-6 max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs text-purple-600 font-bold mb-1">
                      {product.talentName}
                    </div>
                    <div className="font-bold text-gray-900 leading-tight">
                      {product.name}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spent</span>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-purple-600 fill-purple-600" />
                      <span className="font-bold text-gray-900">
                        {product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining</span>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-purple-600 fill-purple-600" />
                      <span className="font-bold text-purple-600">
                        {remainingSparks.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info message */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  📦 Physical items will be shipped within 7 business days.
                  Check your Dashboard for tracking info!
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
