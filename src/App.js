import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ExchangeForm from './components/ExchangeForm'
import OutputBox from './components/OutputBox'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import fetchCurrencies from './services/apiCurrencies'
import './App.css'

function App() {
	const [amount, setAmount] = useState('')
	const [currency, setCurrency] = useState('EUR')
	const [convertedAmount, setConvertedAmount] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [buttonClicked, setButtonClicked] = useState(false)

	useEffect(() => {
		const performExchange = async () => {
			setLoading(true)
			setError('')
			setConvertedAmount('')

			if (!amount || parseFloat(amount) <= 0) {
				setError('Wpisz liczbę większą niż 0')
				setLoading(false)
				return
			}

			try {
				const data = await fetchCurrencies(amount, currency)
				const exchangeRate = data?.rates?.[0]?.mid

				if (exchangeRate) {
					const converted = (parseFloat(amount) * exchangeRate).toFixed(2)
					setConvertedAmount(`to ${converted} PLN`)
				} else {
					setError('Brak dostępnej stawki wymiany. Prosimy spróbować ponownie później?')
				}
			} catch (err) {
				setError('Nieudana próba pobrania danych')
			} finally {
				setLoading(false)
			}
		}

		if (buttonClicked) {
			performExchange()
			setButtonClicked(false)
		}
	}, [amount, currency, buttonClicked])

	const handleSubmit = e => {
		e.preventDefault()
		setButtonClicked(true)
	}

	return (
		<div className='wrapper'>
			<div className='app-box'>
				<Header />
				<ExchangeForm
					amount={amount}
					setAmount={setAmount}
					currency={currency}
					setCurrency={setCurrency}
					handleSubmit={handleSubmit}
				/>
				{loading && <Loader />}
				<OutputBox convertedAmount={convertedAmount} />
				{error && <ErrorMessage error={error} />}
			</div>
		</div>
	)
}

export default App
