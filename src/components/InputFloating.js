"use client";
import React, { useState } from "react";

const InputFloating = ({
  label,
  value,
  onChange,
  type = "text",
  className = "w-full sm:w-1/4",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value;

  return (
    <div className={`relative ${className}`}>
      <label
        className={`absolute left-3 transition-all pointer-events-none px-1 
          ${
            isActive && value
              ? "text-sm -top-2 text-primary-light bg-white"
              : "top-3 text-gray-700 bg-transparent"
          }`}
      >
        {label}
      </label>
      <input
        type={type}
        inputMode="numeric"
        className={`w-full rounded-md py-3 px-4 focus:outline-none border 
          ${
            isFocused
              ? "border-primary bg-primary/10"
              : "border-gray-400 bg-white"
          }`}
        value={value}
        autoComplete="new-password"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default InputFloating;
