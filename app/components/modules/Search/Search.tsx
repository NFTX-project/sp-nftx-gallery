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
  <div className="w-full md:w-auto lg:w-96">
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="font-sans h-14 w-full md:w-80 dark:text-white text-gray-800 font-bold lg:w-96 pr-8 pl-5 border border-1 dark:border-gray-300 border-gray-100 rounded z-0 focus:shadow focus:outline-none dark:focus:border-gray-100 focus:border-gray-200 dark:bg-gray-900 bg-white"
      placeholder={placeholder}
    />
  </div>
);

export default Search;
