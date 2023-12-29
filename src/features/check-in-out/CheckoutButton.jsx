import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  const handleCheckout = async () => {
    try {
      if (bookingId !== undefined && bookingId !== null) {
        const id = String(bookingId); // Ensure id is a string
        await checkout(id); // Assuming checkout function expects id as a string
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

// function CheckoutButton({ bookingId }) {
//   const { checkout, isCheckingOut } = useCheckout();
//   return (
//     <Button
//       variation="primary"
//       size="small"
//       onClick={() => checkout(bookingId)}
//       disabled={isCheckingOut}
//     >
//       Check out
//     </Button>
//   );
// }
// function CheckoutButton({
//   bookingId,
//   status,
//   isPaid,
//   hasBreakfast,
//   extrasPrice,
//   totalPrice,
// }) {
//   const { checkout, isCheckingOut } = useCheckout();

//   const handleCheckout = () => {
//     checkout({
//       bookingId,
//       status: "checked-out",
//       isPaid, // Make sure to pass the actual value for isPaid
//       hasBreakfast, // Make sure to pass the actual value for hasBreakfast
//       extrasPrice, // Make sure to pass the actual value for extrasPrice
//       totalPrice, // Make sure to pass the actual value for totalPrice
//     });
//   };

//   return (
//     <Button
//       variation="primary"
//       size="small"
//       onClick={handleCheckout}
//       disabled={isCheckingOut}
//     >
//       Check out
//     </Button>
//   );
// }

CheckoutButton.propTypes = {
  bookingId: PropTypes.number,
};
export default CheckoutButton;
