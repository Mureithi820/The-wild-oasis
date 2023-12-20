import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: ${(props) => props.textColor || "#0369a1"};
  background-color: ${(props) => props.backgroundColor || "#f3f4f6"};
`;

export default Tag;
