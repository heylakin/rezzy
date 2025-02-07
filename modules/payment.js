import VIEWPORT from "../index.js"
import PaymentConfirmation from "./paymentConfirmation.js";

export default function Payment(view) {
    // logic

    // CSS -> absolute

    const form = `<form id="payment">

        <label for="card-name">Card Name:</label>
        <input type="text" class="card" name="card-num" required minlength="16" maxlength="16" size="16" />

        <label for="card-num">Credit Card Number:</label>
        <input type="number" class="card" name="card-num" required minlength="16" maxlength="16" size="16" />

        <label for="card-exp">Expiry Date:</label>
        <input type="month" class="card" name="card-exp" required minlength="4" maxlength="8" size="10" />

        <label for="card-cvv">CVV:</label>
        <input type="number" class="card" name="card-cvv" required min="2024-01" value="2025-01"  />

        <input id="pay-btn" type="submit" value="pay now" data-action="payment" />

    </form>
    `

    // Just focus on getting things updating to DOM -> then on form submission inject payment confirmation js
    


    document.addEventListener('click', (e) => {
        e.preventDefault
        if (e.target.dataset.action === 'payment') {
            view.innerHTML = PaymentConfirmation(view);
        }
    })

    // EVENT LISTENER -> BTN CLICK FOR PAYMENT
    return form;
}