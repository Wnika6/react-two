function ExchangeForm({ amount, setAmount, currency, setCurrency, handleSubmit }) {
	return (
		<form className='bottom-section' onSubmit={handleSubmit}>
			<input
				type='number'
				className='input-amount input'
				value={amount}
				onChange={e => setAmount(e.target.value)}
				step='0.01'
			/>
			<select className='select' value={currency} onChange={e => setCurrency(e.target.value)}>
				<option className='option' value='EUR' selected>
					EUR
				</option>
				<option className='option' value='USD'>
					USD
				</option>
				<option className='option' value='CHF'>
					CHF
				</option>
			</select>
			<button type='submit' className='exchange-btn'>
				PRZELICZ
			</button>
		</form>
	)
}

export default ExchangeForm
