// import styled, { css } from "styled-components";

// const Form = styled.form`
//   ${(props) =>
//     props.type !== "regular" &&
//     css`
//       padding: 2.4rem 4rem;

//       /* Box */
//       background-color: #fff;
//       border: 1px solid #f3f4f6;
//       border-radius: 7px;
//     `}

//   ${(props) =>
//     props.type === "modal" &&
//     css`
//       width: 80rem;
//     `}

//   overflow: hidden;
//   font-size: 1.4rem;
// `;
// Form.defaultProps = {
//   type: "regular",
// };
// export default Form;
import styled from "styled-components";

const Form = styled.form`
  /* Basic Styles */
  padding: ${(props) => (props.type === "modal" ? "2.4rem 4rem" : "2.4rem")};
  background-color: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 7px;
  width: ${(props) =>
    props.type === "modal" ? "80rem" : "fit-content"}; /* Adjusted width */
  margin: 0 auto; /* Center the form on the page */

  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;

// import styled from "styled-components";

// const Form = styled.form`
//   /* Basic Styles */
//   padding: 2.4rem 4rem;
//   background-color: #fff;
//   border: 1px solid #f3f4f6;
//   border-radius: 7px;

//   /* Additional Styles for Modal */
//   ${(props) =>
//     props.type === "modal" &&
//     `
//     width: 80rem;
//     padding: 2.4rem 4rem;
//   `}

//   overflow: hidden;
//   font-size: 1.4rem;
// `;

// Form.defaultProps = {
//   type: "regular",
// };

// export default Form;
