import { useEffect, useState } from "react";
import "./app.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/loadContract";

function App() {
	const [web3Api, setWeb3Api] = useState({
		provider: null,
		web3: null,
		contract: null,
	});
	const [balance, setBalance] = useState(null);
	const [account, setAccount] = useState(null);
	useEffect(() => {
		const loadProvider = async () => {
			const provider = await detectEthereumProvider();
			const contract = await loadContract("Faucet", provider);
			if (provider) {
				setWeb3Api({
					web3: new Web3(provider),
					provider,
					contract,
				});
			} else {
				console.error("Please install Metamask");
			}
		};
		loadProvider();
	}, []);

	useEffect(() => {
		const loadBalance = async () => {
			const { contract, web3 } = web3Api;
			const balance = await web3.eth.getBalance(contract.address);
			const balanceInEth = web3.utils.fromWei(balance, "ether");
			setBalance(balanceInEth);
		};
		web3Api.contract && loadBalance();
	}, [web3Api]);

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
						Current Balance: <strong>{balance}</strong> ETH
					</div>
					<button className="button is-primary mr-2">Donate</button>
					<button className="button is-link">Withdraw</button>
				</div>
			</div>
		</>
	);
}

export default App;
