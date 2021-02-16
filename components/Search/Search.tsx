import React from 'react';

export interface SearchProps {
  value: string;
  placeholder?: string;
  handleChange: (event: { target: HTMLInputElement }) => void;
}

const Search = ({
  value,
  handleChange,
  placeholder = 'Search',
}: SearchProps) => (
  <div className="w-full sm:w-auto lg:w-96">
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="font-sans h-14 w-full md:w-80 text-white font-bold lg:w-96 pr-8 pl-5 border border-1 border-gray-300 rounded z-0 focus:shadow focus:outline-none focus:border-gray-100 bg-gray-900"
      placeholder={placeholder}
    />
  </div>
);

export default Search;
