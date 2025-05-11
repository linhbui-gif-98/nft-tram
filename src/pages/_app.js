import Header from "@/components/Header";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [walletAddress, setWalletAddress] = useState(null);
    const [userAssets, setUserAssets] = useState([]);

    const handleConnectWallet = (address) => {
        setWalletAddress(address);

        // Tải tài sản từ localStorage khi kết nối ví
        const storedAssets = JSON.parse(localStorage.getItem(`assets_${address}`) || '[]');
        setUserAssets(storedAssets);

        alert(`Kết nối thành công với địa chỉ ví: ${address}`);
    };

    const handleAssetUpdate = (assets) => {
        setUserAssets(assets);
        if (walletAddress) {
            localStorage.setItem(`assets_${walletAddress}`, JSON.stringify(assets));
        }
    };

    return (
        <>
            <Header walletAddress={walletAddress} onConnectWallet={handleConnectWallet} />
            <Component {...pageProps} walletAddress={walletAddress} onAssetUpdate={handleAssetUpdate} />
        </>
    );
}
