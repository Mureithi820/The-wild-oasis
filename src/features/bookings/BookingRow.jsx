import PropTypes from "prop-types";

import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: #4b5563;
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: #6b7280;
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
function BookingRow({
  booking: {
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}) {
  // const guestName = guests?.fullName || "Guest Name N/A";
  // const email = guests?.email || "Email N/A";
  // const cabinName = cabins?.name || "Cabin Name N/A";

  const { fullName = "Guest Name N/A", email = "Email N/A" } = guests || {};
  const { name: cabinName = "Cabin Name N/A" } = cabins || {};

  // const statusToTagName = {
  //   unconfirmed: "#0369a1",
  //   "checked-in": "#008000",
  //   "checked-out": "#c0c0c0",
  // };
  const statusToTagColors = {
    unconfirmed: { textColor: "#0369a1", backgroundColor: "#e0f2fe" },
    "checked-in": { textColor: "#008000", backgroundColor: " #dcfce7" },
    "checked-out": { textColor: "#374151", backgroundColor: "#e5e7eb" },
  };

  const tagColors = statusToTagColors[status] || {};

  const tagStyle = {
    textTransform: "uppercase",
    fontSize: "1.1rem",
    fontWeight: 600,
    padding: "0.4rem 1.2rem",
    borderRadius: "100px",
    color: tagColors.textColor || "inherit",
    backgroundColor: tagColors.backgroundColor || "inherit",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{fullName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      {/* <Tag type={tagColors[status]}>{status.replace("-", " ")}</Tag> */}
      <Tag style={tagStyle}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
    </Table.Row>
  );
}
BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "checked-in", "checked-out"])
      .isRequired,

    guests: PropTypes.object,
    cabins: PropTypes.object,
  }).isRequired,
};

export default BookingRow;
