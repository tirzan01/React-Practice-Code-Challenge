import React from 'react'

const SushiWallet = ({ addMoneyToWallet }) => {

    const [amount, setAmount] = React.useState(0)

    const handleChange = e => {
        if(e.target.value >= 0) setAmount(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        addMoneyToWallet(amount)
        setAmount(0)
    }

    return <form onSubmit={handleSubmit}>
        <input type='number' name='amount' onChange={handleChange} value={amount} />
        <input type='submit' name='submit' />
    </form>
}

export default SushiWallet