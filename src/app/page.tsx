"use client";

import { useState } from "react";
import Image from "next/image";
import PhoneInput, {
  parsePhoneNumber,
  isValidPhoneNumber,
  getCountries,
  type Country,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Priority countries for smart detection (Portugal and Ukraine)
const PRIORITY_COUNTRIES: Country[] = ["PT", "UA"];

// Get all countries and filter out Russia
const ALL_COUNTRIES = getCountries().filter((country) => country !== "RU");

// Country options order with PT and UA at the top
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COUNTRY_OPTIONS_ORDER: any = ["PT", "UA", "|", "..."];

// Smart country detection function
function detectCountryFromInput(input: string): Country {
  if (!input) return "PT";

  // If it has a +, try to parse it normally
  if (input.startsWith("+")) {
    try {
      const parsed = parsePhoneNumber(input);
      return (parsed?.country as Country) || "PT";
    } catch {
      return "PT";
    }
  }

  // Remove all non-digits for analysis
  const digits = input.replace(/\D/g, "");

  // Portuguese patterns: 9 digits starting with 9 (mobile) or 2 (landline)
  if (
    digits.length === 9 &&
    (digits.startsWith("9") || digits.startsWith("2"))
  ) {
    try {
      const phoneNumber = parsePhoneNumber(digits, "PT");
      if (phoneNumber && isValidPhoneNumber(phoneNumber.number)) {
        return "PT";
      }
    } catch {}
  }

  // Ukrainian mobile patterns: 9 digits with specific prefixes
  if (digits.length === 9) {
    const ukrainianPrefixes = [
      "50",
      "63",
      "66",
      "67",
      "68",
      "73",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
    ];
    const prefix = digits.substring(0, 2);

    if (ukrainianPrefixes.includes(prefix)) {
      try {
        const phoneNumber = parsePhoneNumber(digits, "UA");
        if (phoneNumber && isValidPhoneNumber(phoneNumber.number)) {
          return "UA";
        }
      } catch {}
    }
  }

  // Try validation against priority countries
  for (const country of PRIORITY_COUNTRIES) {
    try {
      const phoneNumber = parsePhoneNumber(digits, country);
      if (phoneNumber && isValidPhoneNumber(phoneNumber.number)) {
        return country;
      }
    } catch {}
  }

  // Default to Portugal
  return "PT";
}

export default function Home() {
  const [phoneValue, setPhoneValue] = useState<string>("");

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value || "");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleanText = text.trim();

      // Detect the country from the pasted text
      const country = detectCountryFromInput(cleanText);

      // Parse and format the number properly to E.164
      try {
        const phoneNumber = cleanText.startsWith("+")
          ? parsePhoneNumber(cleanText) // International format
          : parsePhoneNumber(cleanText, country); // National format

        if (phoneNumber) {
          setPhoneValue(phoneNumber.number); // E.164 format (e.g., +380931290288)
        } else {
          setPhoneValue(cleanText);
        }
      } catch {
        // If parsing fails, try to at least clean spaces from international format
        if (cleanText.startsWith("+")) {
          const cleaned = "+" + cleanText.substring(1).replace(/\D/g, "");
          setPhoneValue(cleaned);
        } else {
          setPhoneValue(cleanText);
        }
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      alert("Unable to paste from clipboard. Please check permissions.");
    }
  };

  const handleLaunch = () => {
    if (!phoneValue) {
      alert("Please enter a phone number");
      return;
    }

    if (!isValidPhoneNumber(phoneValue)) {
      alert("Please enter a valid phone number");
      return;
    }

    // Remove the + and all non-digits for WhatsApp URL
    const cleanNumber = phoneValue.replace(/\D/g, "");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#075E54]">
      <main className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#128C7E]/20">
        <div className="text-center mb-8">
          <Image
            src="/whatsapp.svg"
            alt="WhatsApp"
            width={64}
            height={64}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-[#075E54]">
            WhatsApp Message
          </h1>
          <p className="text-[#128C7E] text-sm mt-2">
            Start a conversation without saving the contact
          </p>
        </div>

        <div className="space-y-4">
          <div className="phone-input-wrapper relative">
            <PhoneInput
              defaultCountry="PT"
              countries={ALL_COUNTRIES}
              countryOptionsOrder={COUNTRY_OPTIONS_ORDER}
              value={phoneValue}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              className="custom-phone-input"
              smartCaret={true}
            />
            <button
              onClick={handlePaste}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#075E54] hover:text-[#128C7E] focus:outline-none transition-colors z-10"
              title="Paste from clipboard"
              type="button"
            >
              📋
            </button>
          </div>

          <button
            onClick={handleLaunch}
            className="w-full py-2 px-4 bg-[#25D366] text-white rounded-md hover:bg-[#2EE072] focus:outline-none transition-colors shadow-sm"
          >
            Open in WhatsApp
          </button>
        </div>
      </main>
    </div>
  );
}
