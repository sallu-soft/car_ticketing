'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBox = ({ toList, fromList }) => {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({ from, to, date }).toString();
    router.push(`/search?${query}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="space-y-6 w-full md:w-[400px] bg-white shadow-lg rounded-xl p-6 border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">🔍 বাস সার্চ করুন</h2>

      {/* From field */}
      <div>
        <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
          যাত্রার স্থান
        </label>
        <select
          id="from"
          name="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">স্থান নির্বাচন করুন</option>
          {fromList.map((item) => (
            <option key={item.from} value={item.from}>
              {item.from}
            </option>
          ))}
        </select>
      </div>

      {/* To field */}
      <div>
        <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
          গন্তব্য
        </label>
        <select
          id="to"
          name="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">গন্তব্য নির্বাচন করুন</option>
          {toList.map((item) => (
            <option key={item.to} value={item.to}>
              {item.to}
            </option>
          ))}
        </select>
      </div>

      {/* Date field */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          যাত্রার তারিখ
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
      >
        🚌 বাস খুঁজুন
      </button>
    </form>
  );
};

export default SearchBox;
