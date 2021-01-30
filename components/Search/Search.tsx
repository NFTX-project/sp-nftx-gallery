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
      className="font-mono h-14 w-full md:w-80 text-gray-50 font-bold lg:w-96 pr-8 pl-5 border border-1 border-gray-500 border-opacity-30 rounded z-0 focus:shadow focus:outline-none bg-gray-900"
      placeholder={placeholder}
    />
  </div>
);

export default Search;
