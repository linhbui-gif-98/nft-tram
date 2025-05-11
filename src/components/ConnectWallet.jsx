export const ConnectWallet = ({ onConnect }) => {
    const wallets = [
        { name: 'MetaMask', address: '0xA1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0' },
        { name: 'Trust Wallet', address: '0xB2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8s9T0u1' },
        { name: 'Coinbase Wallet', address: '0xC3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2' }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Chọn ví của bạn</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wallets.map((wallet, index) => (
                    <button key={index} onClick={() => onConnect(wallet.address)} className="bg-green-500 text-white py-4 rounded-lg">
                        {wallet.name}
                    </button>
                ))}
            </div>
        </div>
    );
};
