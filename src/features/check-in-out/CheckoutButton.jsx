import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  const handleCheckout = async () => {
    try {
      if (bookingId !== undefined && bookingId !== null) {
        const id = String(bookingId);
        await checkout(id);
      } else {
        console.error("Booking ID is undefined or null");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Button
      variation="primary"
      size="small"
      onClick={handleCheckout}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};
export default CheckoutButton;
