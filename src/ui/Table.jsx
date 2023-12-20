import PropTypes from "prop-types";

import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid #e5e7eb;

  font-size: 1.4rem;
  background-color: #fff;
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns.join(" ")};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: #4b5563;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: #f9fafb;
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();
// function Table({ columns, children }) {
//   return (
//     <TableContext.Provider value={{ columns }}>
//       <StyledTable role="table">{children}</StyledTable>
//     </TableContext.Provider>
//   );
// }
// function Table({ columns, children }) {
//   return (
//     <TableContext.Provider value={{ columns }}>
//       <StyledTable role="table">{children}</StyledTable>
//     </TableContext.Provider>
//   );
// }
function Table({ columns = [], children }) {
  if (!Array.isArray(columns)) {
    console.error('Table component: "columns" prop must be an array.');
    columns = [];
  }

  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  children: PropTypes.node.isRequired,
};

export default Table;

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
// function Header({ children }) {
//   const { columns } = useContext(TableContext);
//   return (
//     <StyledHeader role="row" columns={columns} as="header">
//       {children}
//     </StyledHeader>
//   );
// }
Header.propTypes = {
  children: PropTypes.node.isRequired,
};
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}
// function Row({ children }) {
//   const { columns } = useContext(TableContext);
//   return (
//     <StyledRow role="row" columns={columns}>
//       {children}
//     </StyledRow>
//   );
// }
Row.propTypes = {
  children: PropTypes.node.isRequired,
};
function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// function Body({ data, render }) {
//   if (!data.length) return <Empty>No data show ata the moment</Empty>;
//   return <StyledBody>{data.map(render)}</StyledBody>;
// }
Body.propTypes = {
  data: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
