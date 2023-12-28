import styled from "styled-components";

const Form = styled.form`
  /* Basic Styles */
  padding: ${(props) => (props.type === "modal" ? "2.4rem 4rem" : "2.4rem")};
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  width: ${(props) =>
    props.type === "modal" ? "80rem" : "fit-content"}; /* Adjusted width */
  margin: 0 auto; /* Center the form on the page */

  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
