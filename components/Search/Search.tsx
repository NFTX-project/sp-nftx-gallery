import React from 'react';

export interface SearchProps {
  value: string;
  placeholder?: string;
  handleChange: (event: { target: HTMLInputElement }) => void;
}

const Search = ({
  value,
  handleChange,
  placeholder = 'Search...',
}: SearchProps) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="h-14 w-96 pr-8 pl-5 border border-gray-100 rounded z-0 focus:shadow focus:outline-none"
      placeholder={placeholder}
    />
  </div>
);

export default Search;
