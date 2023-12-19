import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid #f3f4f6;
  background-color: #fff;
  box-shadow: var(--shadow-sm);
  border-radius: 5px;
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: #fff;
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: #4f46e5;
      color: #eef2ff;
    `}

  border-radius: 5px;
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: #4f46e5;
    color: #eef2ff;
  }
`;
function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // const currentFilter = searchParams.get(filterField) || options[0]?.value;
  const currentFilter =
    searchParams && searchParams.get(filterField)
      ? searchParams.get(filterField)
      : options[0]?.value;

  function handleClick(value) {
    if (searchParams) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(filterField, value);

      if (newSearchParams.get("page")) {
        newSearchParams.set("page", "1");
      }

      setSearchParams(newSearchParams);
    }
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
Filter.propTypes = {
  filterField: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Filter;
