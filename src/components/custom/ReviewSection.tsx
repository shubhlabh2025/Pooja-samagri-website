import React, { useState } from "react";

const ReviewSection = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    console.log({ name, review, rating });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-6 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-800">Write a review</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none"
        />
        <p className="mt-1 text-sm text-red-500">
          Note: HTML is not translated!
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rating <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex items-center space-x-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num} className="flex items-center space-x-1">
              <input
                type="radio"
                name="rating"
                value={num}
                checked={rating === num}
                onChange={() => setRating(num)}
                required
                className="accent-orange-500"
              />
              <span className="text-sm">{num}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="0 inline-flex items-center rounded px-5 py-2 text-white transition hover:bg-orange-600"
        >
          Continue →
        </button>
      </div>
    </form>
  );
};

export default ReviewSection;
