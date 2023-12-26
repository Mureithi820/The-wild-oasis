import PropTypes from "prop-types";

import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";

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
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}) {
  const { fullName = "Guest Name N/A", email = "Email N/A" } = guests || {};
  const { name: cabinName = "Cabin Name N/A" } = cabins || {};

  const statusToTagColors = {
    unconfirmed: { textColor: "#0369a1", backgroundColor: "#e0f2fe" },
    "checked-in": { textColor: "#008000", backgroundColor: " #dcfce7" },
    "checked-out": { textColor: "#374151", backgroundColor: "#e5e7eb" },
  };
  const navigate = useNavigate();
  const { checkout, isCheckingout } = useCheckout();

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

      <Menus.Menu>
        <Menus.Toggle id={bookingId} />
        <Menus.List id={bookingId}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See Details
          </Menus.Button>
          {status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check In
            </Menus.Button>
          )}
          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
              disabled={isCheckingout}
            >
              Check Out
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
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
