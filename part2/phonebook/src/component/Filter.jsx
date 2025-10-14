const Filter = ({filterValue, onFilterChange}) => {
  return <p>filter shown with <input onChange={onFilterChange}
                                     value={filterValue}/></p>;
};

export default Filter;