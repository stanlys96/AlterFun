import React, { useEffect, useRef, useState } from "react";

export const OTPModal = ({
  open = false,
  onClose = () => {},
  onSubmit = (otp: any) => {},
  phoneOrEmail = "your phone",
  digits = 6,
}) => {
  const [values, setValues] = useState(Array(digits).fill(""));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (!open) return;
    // reset state when opened
    setValues(Array(digits).fill(""));
    setLoading(false);
    // focus first input when opened
    setTimeout(() => inputsRef.current[0].focus(), 50);
  }, [open, digits]);

  useEffect(() => {
    let t: any;
    if (resendTimer > 0) {
      t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (e: any, i: any) => {
    const raw = e.target.value;
    // accept only digits
    const nextChar = raw.replace(/\D/g, "");
    if (!nextChar)
      return setValues((v) => {
        const copy = [...v];
        copy[i] = "";
        return copy;
      });

    // If user pasted multiple chars, handle paste
    if (nextChar.length > 1) {
      const pasteChars = nextChar.split("").slice(0, digits - i);
      setValues((prev) => {
        const copy = [...prev];
        for (let k = 0; k < pasteChars.length; k++) copy[i + k] = pasteChars[k];
        return copy;
      });
      const focusIndex = Math.min(i + nextChar.length, digits - 1);
      inputsRef.current[focusIndex].focus();
      return;
    }

    setValues((prev) => {
      const copy = [...prev];
      copy[i] = nextChar;
      return copy;
    });
    // move focus
    if (i < digits - 1) inputsRef.current[i + 1].focus();
  };

  const handleKeyDown = (e: any, i: any) => {
    if (e.key === "Backspace") {
      if (values[i]) {
        setValues((prev) => {
          const copy = [...prev];
          copy[i] = "";
          return copy;
        });
      } else if (i > 0) {
        inputsRef.current[i - 1]?.focus();
        setValues((prev) => {
          const copy = [...prev];
          copy[i - 1] = "";
          return copy;
        });
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputsRef.current[i - 1].focus();
    } else if (e.key === "ArrowRight" && i < digits - 1) {
      inputsRef.current[i + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const otp = values.join("");
    if (otp.length !== digits) {
      // simple client-side validation
      inputsRef.current[values.findIndex((v) => !v)].focus();
      return;
    }
    setLoading(true);
    try {
      await Promise.resolve(onSubmit(otp));
    } catch (err) {
      // swallow — user callback can throw to indicate failure
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    // user may call API here — we'll just trigger cooldown and call onSubmit with empty string to indicate "resend"
    setResendTimer(30); // 30s cooldown
    try {
      // calling onSubmit with null to indicate a resend action is optional; adapt as you like
      if (typeof onSubmit === "function") onSubmit(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      aria-labelledby="otp-title"
      role="dialog"
      aria-modal="true"
    >
      {/* overlay */}
      <div
        className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* modal panel */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="flex items-start justify-between">
            <div>
              <h2
                id="otp-title"
                className="text-lg font-semibold text-slate-900"
              >
                Enter verification code
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                We sent a {digits}-digit code to{" "}
                <span className="font-medium text-slate-800">
                  {phoneOrEmail}
                </span>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white text-slate-600 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              aria-label="Close dialog"
            >
              ✕
            </button>
          </div>

          {/* OTP inputs */}
          <div className="mt-6">
            <div className="flex justify-center gap-3">
              {Array.from({ length: digits }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={values[i]}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData
                      .getData("text")
                      .replace(/\D/g, "");
                    if (!text) return;
                    const pasteChars = text.split("").slice(0, digits - i);
                    setValues((prev) => {
                      const copy = [...prev];
                      for (let k = 0; k < pasteChars.length; k++)
                        copy[i + k] = pasteChars[k];
                      return copy;
                    });
                    const focusIndex = Math.min(i + text.length, digits - 1);
                    inputsRef.current[focusIndex]?.focus();
                  }}
                  className="h-14 w-12 rounded-xl border border-gray-200 bg-white text-center text-xl font-medium text-slate-900 placeholder-slate-300 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3 text-sm text-slate-600">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                className={`rounded-md px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  resendTimer > 0
                    ? "cursor-not-allowed opacity-60"
                    : "text-indigo-600 hover:underline"
                }`}
              >
                {resendTimer > 0
                  ? `Resend available in ${resendTimer}s`
                  : "Resend code"}
              </button>

              <span aria-hidden className="mx-1">
                •
              </span>

              <button
                type="button"
                onClick={() => {
                  setValues(Array(digits).fill(""));
                  inputsRef.current[0]?.focus();
                }}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Clear
              </button>
            </div>
          </div>

          {/* actions */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
