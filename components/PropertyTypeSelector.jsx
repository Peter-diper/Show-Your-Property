const TypeSelector = ({ id, value, options = [], onHandle }) => {
  return (
    <select
      id={id}
      className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
      value={value}
      onChange={onHandle}
    >
      {options.map((dropdownOption) => (
        <option key={dropdownOption} value={dropdownOption}>
          {dropdownOption}
        </option>
      ))}
    </select>
  );
};

export default TypeSelector;
