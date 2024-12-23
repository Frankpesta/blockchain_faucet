import { useEffect, useState } from "react";
import "./app.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
	const [web3Api, setWeb3Api] = useState({
		provider: null,
		web3: null,
	});
	const [account, setAccount] = useState(null);
	useEffect(() => {
		const loadProvider = async () => {
			const provider = await detectEthereumProvider();
			if (provider) {
				setWeb3Api({
					web3: new Web3(provider),
					provider,
				});
			} else {
				console.error("Please install Metamask");
			}
		};
		loadProvider();
	}, []);

	useEffect(() => {
		const getAccount = async () => {
			const accounts = await web3Api.web3.eth.getAccounts();
			setAccount(accounts[0]);
		};
		web3Api.web3 && getAccount();
	}, [web3Api.web3]);

	const handleConnectWallet = () => {
		web3Api.provider.request({ method: "eth_requestAccounts" });
	};

	return (
		<>
			<div className="faucet-wrapper">
				<div className="faucet">
					<span>
						<strong>Account:</strong>
					</span>
					<h1>
						{account ? (
							account
						) : (
							<button
								className="button is-info is-small my-4"
								onClick={handleConnectWallet}>
								Connect Wallet
							</button>
						)}
					</h1>
					<div className="balance-view is-size-2">
						Current Balance: <strong>10</strong> ETH
					</div>
					<button className="button is-primary mr-2">Donate</button>
					<button className="button is-link">Withdraw</button>
				</div>
			</div>
		</>
	);
}

export default App;
