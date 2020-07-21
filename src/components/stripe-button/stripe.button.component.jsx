import React from 'react'

import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100

    // the publishable key from STRIPE API page
    const publishableKey = 'pk_test_NtveQH2AaNRT2cQWH6K3AePt00VWCFsAQB'

    //onToken is the one that's gonna send messag to your backend
    // and then compeletely process the "charging of the customer"
    const onToken = token => {
        console.log(token)
        // since we are really not processing then we are just going to
        // "alert()"
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Eshop'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton