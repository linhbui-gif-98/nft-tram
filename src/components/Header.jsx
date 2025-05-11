import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = ({ walletAddress, onConnectWallet }) => {
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const wallets = [
        { name: 'MetaMask', address: '0xA1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0' },
        { name: 'Trust Wallet', address: '0xB2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1' },
        { name: 'Coinbase Wallet', address: '0xC3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2' }
    ];

    return (
        <>
            <header className="bg-gray-900 text-white p-4 flex justify-between items-center relative">
                <Link href="/" className="text-2xl font-bold">TRẦMX</Link>
                <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <nav className={`md:flex gap-6 items-center absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-gray-900 md:bg-transparent z-50 p-4 md:p-0 transition-all ${menuOpen ? 'block' : 'hidden'}`}>
                    <Link href="/" className="block md:inline-block mb-4 md:mb-0 hover:text-green-400">Trang chủ</Link>
                    <Link href="/marketplace" className="block md:inline-block mb-4 md:mb-0 hover:text-green-400">Marketplace</Link>
                    <Link href="/my-assets" className="block md:inline-block mb-4 md:mb-0 hover:text-green-400">Tài sản của tôi</Link>
                    <Link href="#" className="block md:inline-block mb-4 md:mb-0 hover:text-green-400">Hệ thống</Link>
                    <Link href="#" className="block md:inline-block mb-4 md:mb-0 hover:text-green-400">Hoa hồng</Link>

                    <Link href="#" className="block md:inline-block mb-4 md:mb-0 hover:text-green-400">Lịch sử nạp rút</Link>
                    <Link href="#" className="block md:inline-block mb-4 md:mb-0 hover:text-green-400">Các gói đầu tư</Link>

                    <button onClick={() => setShowWalletModal(true)} className="block md:inline-block bg-[#4E3620] text-white px-4 py-2 rounded-lg mb-4 md:mb-0">
                        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
                    </button>
                </nav>
            </header>

            {showWalletModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-96">
                        <h2 className="text-2xl font-bold mb-4">Chọn ví của bạn</h2>
                        {wallets.map((wallet, index) => (
                            <button key={index} onClick={() => {
                                onConnectWallet(wallet.address);
                                setShowWalletModal(false);
                                setMenuOpen(false);
                            }} className="w-full bg-[#4E3620] text-white py-4 rounded-lg mb-4">
                                {wallet.name}
                            </button>
                        ))}
                        <button onClick={() => setShowWalletModal(false)} className="w-full bg-gray-500 text-white py-2 rounded-lg">Đóng</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header
