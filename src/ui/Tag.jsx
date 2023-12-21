import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  /* Use dynamic class names based on the received prop */
  &.unconfirmed {
    color: ${(props) => props.textColor || "#0369a1"};
    background-color: ${(props) => props.backgroundColor || "#f3f4f6"};
  }

  &.checked-in {
    color: ${(props) => props.textColor || "#00a859"};
    background-color: ${(props) => props.backgroundColor || "#e8f7f3"};
  }

  &.checked-out {
    color: ${(props) => props.textColor || "#757575"};
    background-color: ${(props) => props.backgroundColor || "#f3f4f6"};
  }
`;

export default Tag;
