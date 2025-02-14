"use client";

import { useState } from "react";
import Image from "next/image";

// Country codes data
// const countries = [
//   { code: "351", name: "Portugal 🇵🇹" },
//   { code: "1", name: "United States 🇺🇸" },
//   { code: "44", name: "United Kingdom 🇬🇧" },
//   { code: "34", name: "Spain 🇪🇸" },
//   { code: "55", name: "Brazil 🇧🇷" },
//   // Add more countries as needed
// ];

const countries = [
  { code: "93", name: "Afghanistan 🇦🇫" },
  { code: "355", name: "Albania 🇦🇱" },
  { code: "213", name: "Algeria 🇩🇿" },
  { code: "54", name: "Argentina 🇦🇷" },
  { code: "61", name: "Australia 🇦🇺" },
  { code: "43", name: "Austria 🇦🇹" },
  { code: "973", name: "Bahrain 🇧🇭" },
  { code: "880", name: "Bangladesh 🇧🇩" },
  { code: "32", name: "Belgium 🇧🇪" },
  { code: "55", name: "Brazil 🇧🇷" },
  { code: "359", name: "Bulgaria 🇧🇬" },
  { code: "1", name: "Canada 🇨🇦" },
  { code: "56", name: "Chile 🇨🇱" },
  { code: "86", name: "China 🇨🇳" },
  { code: "57", name: "Colombia 🇨🇴" },
  { code: "506", name: "Costa Rica 🇨🇷" },
  { code: "385", name: "Croatia 🇭🇷" },
  { code: "53", name: "Cuba 🇨🇺" },
  { code: "357", name: "Cyprus 🇨🇾" },
  { code: "420", name: "Czech Republic 🇨🇿" },
  { code: "45", name: "Denmark 🇩🇰" },
  { code: "20", name: "Egypt 🇪🇬" },
  { code: "372", name: "Estonia 🇪🇪" },
  { code: "251", name: "Ethiopia 🇪🇹" },
  { code: "358", name: "Finland 🇫🇮" },
  { code: "33", name: "France 🇫🇷" },
  { code: "49", name: "Germany 🇩🇪" },
  { code: "30", name: "Greece 🇬🇷" },
  { code: "852", name: "Hong Kong 🇭🇰" },
  { code: "36", name: "Hungary 🇭🇺" },
  { code: "91", name: "India 🇮🇳" },
  { code: "62", name: "Indonesia 🇮🇩" },
  { code: "353", name: "Ireland 🇮🇪" },
  { code: "39", name: "Italy 🇮🇹" },
  { code: "81", name: "Japan 🇯🇵" },
  { code: "962", name: "Jordan 🇯🇴" },
  { code: "7", name: "Kazakhstan 🇰🇿" },
  { code: "82", name: "South Korea 🇰🇷" },
  { code: "965", name: "Kuwait 🇰🇼" },
  { code: "856", name: "Laos 🇱🇦" },
  { code: "371", name: "Latvia 🇱🇻" },
  { code: "961", name: "Lebanon 🇱🇧" },
  { code: "218", name: "Libya 🇱🇾" },
  { code: "423", name: "Liechtenstein 🇱🇮" },
  { code: "370", name: "Lithuania 🇱🇹" },
  { code: "352", name: "Luxembourg 🇱🇺" },
  { code: "853", name: "Macau 🇲🇴" },
  { code: "60", name: "Malaysia 🇲🇾" },
  { code: "356", name: "Malta 🇲🇹" },
  { code: "52", name: "Mexico 🇲🇽" },
  { code: "377", name: "Monaco 🇲🇨" },
  { code: "31", name: "Netherlands 🇳🇱" },
  { code: "64", name: "New Zealand 🇳🇿" },
  { code: "505", name: "Nicaragua 🇳🇮" },
  { code: "47", name: "Norway 🇳🇴" },
  { code: "92", name: "Pakistan 🇵🇰" },
  { code: "507", name: "Panama 🇵🇦" },
  { code: "595", name: "Paraguay 🇵🇾" },
  { code: "51", name: "Peru 🇵🇪" },
  { code: "63", name: "Philippines 🇵🇭" },
  { code: "48", name: "Poland 🇵🇱" },
  { code: "351", name: "Portugal 🇵🇹" },
  { code: "974", name: "Qatar 🇶🇦" },
  { code: "40", name: "Romania 🇷🇴" },
  { code: "966", name: "Saudi Arabia 🇸🇦" },
  { code: "381", name: "Serbia 🇷🇸" },
  { code: "65", name: "Singapore 🇸🇬" },
  { code: "421", name: "Slovakia 🇸🇰" },
  { code: "386", name: "Slovenia 🇸🇮" },
  { code: "27", name: "South Africa 🇿🇦" },
  { code: "34", name: "Spain 🇪🇸" },
  { code: "94", name: "Sri Lanka 🇱🇰" },
  { code: "46", name: "Sweden 🇸🇪" },
  { code: "41", name: "Switzerland 🇨🇭" },
  { code: "886", name: "Taiwan 🇹🇼" },
  { code: "66", name: "Thailand 🇹🇭" },
  { code: "90", name: "Turkey 🇹🇷" },
  { code: "380", name: "Ukraine 🇺🇦" },
  { code: "971", name: "United Arab Emirates 🇦🇪" },
  { code: "44", name: "United Kingdom 🇬🇧" },
  { code: "1", name: "United States 🇺🇸" },
  { code: "58", name: "Venezuela 🇻🇪" },
  { code: "84", name: "Vietnam 🇻🇳" },
];

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      // Remove any non-digit characters from the pasted text
      const cleanNumber = text.replace(/\D/g, "");
      setPhoneNumber(cleanNumber);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleLaunch = () => {
    if (!phoneNumber) {
      alert("Please enter a phone number");
      return;
    }
    const cleanNumber = phoneNumber.replace(/\D/g, "");
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${selectedCountry}${cleanNumber}`;
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
            Send a message without saving the contact
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex gap-2">
              <div className="relative w-[4.5rem]">
                <select
                  id="country"
                  className="w-full p-2 border border-[#075E52]/30 rounded-md bg-white text-gray-900 appearance-none outline-none focus:ring-1 focus:ring-[#085E54] focus:border-[#085E54] cursor-pointer"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country.name} value={country.code}>
                      +{country.code} {country.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute rounded-md inset-y-0 left-0 right-0 flex items-center px-2 text-gray-900 bg-white">
                  +{selectedCountry}
                </div>
              </div>
              <div className="relative flex-1">
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 pr-10 border border-[#075E52]/30 rounded-md bg-white text-gray-900 outline-none focus:ring-1 focus:ring-[#085E54] focus:border-[#085E54]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                />
                <button
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#075E54] hover:text-[#128C7E] focus:outline-none"
                  title="Paste from clipboard"
                >
                  📋
                </button>
              </div>
            </div>
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
