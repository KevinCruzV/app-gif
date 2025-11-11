'use client';

import { useEffect, useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
}

export default function SearchBar({ value, onChange, onCancel }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search"
        value={localValue}
        onChange={(event) => {
          const next = event.target.value;
          setLocalValue(next);
          onChange(next);
        }}
      />
      {localValue.length > 0 && (
        <button type="button" onClick={onCancel} aria-label="Cancel search">
          Cancel
        </button>
      )}
    </div>
  );
}
