// setInterval for "This Window will Reset in 60 Seconds"

// VIEWPORT.innerHTML = `Order Placed. Thank you for your order`
// click her to make new order
// flush localStorage
// reset window

export default function PaymentConfirmation(view) {

    setTimeout(()=>{
        window.location.reload();
    }, 10000)

    return `<div id="payment-confirmation">
        Thank you for purchasing with Rezzy. This window will reload in 10 seconds.
    </div>`
}