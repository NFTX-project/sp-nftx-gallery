import React from 'react';

export interface SearchProps {
  value: string;
  handleChange: (event: { target: HTMLInputElement }) => void;
}

const Search = ({ value, handleChange }: SearchProps) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
      placeholder="Search anything..."
    />
    <div className="absolute top-4 right-3">
      {' '}
      <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>{' '}
    </div>
  </div>
);

export default Search;
