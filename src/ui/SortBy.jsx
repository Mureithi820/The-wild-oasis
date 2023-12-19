import PropTypes from "prop-types";
// import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { useSearchParams } from "../features/cabins/useSearchParams";

function Sort({ options }) {
  const { searchParams, setSearchParams } = useSearchParams();

  const sortBy =
    searchParams && searchParams.get("sortBy")
      ? searchParams.get("sortBy")
      : "";

  function handleChange(e) {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("sortBy", e.target.value);

    window.history.replaceState({}, "", `?${newSearchParams.toString()}`);

    setSearchParams(newSearchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
}

Sort.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default Sort;
