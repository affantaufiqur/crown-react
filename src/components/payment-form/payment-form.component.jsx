import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { FormContainer, PaymentFormContainer } from './payment-form.styles'

const PaymentForm = () => {
  const stripe = useStripe
  const elements = useElements()

  const paymentHandler = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    const response = await fetch('/netlify/functions/create-payment-intent.js', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: 10000,
      }),
    }).then((res) => res.json())
    const clientSecret = response.paymentIntent.client_secret
    const paymentResult = await stripe.confirmCardPayment(paymentResult, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'user',
        },
      },
    })
    if (paymentResult.error) {
      alert('error', paymentResult.error)
    }
    if (paymentResult.paymentIntent.status === 'succeeded') {
      alert('success')
    }

    return response
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card payment: </h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}
export default PaymentForm
