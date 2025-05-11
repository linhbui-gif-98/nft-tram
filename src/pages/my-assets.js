import { useEffect, useState } from 'react';

const MyAssets = ({ walletAddress }) => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        if (walletAddress) {
            const key = `assets_${walletAddress}`;
            const storedAssets = JSON.parse(localStorage.getItem(key) || '[]');
            setAssets(storedAssets);
        }
    }, [walletAddress]);

    if (!walletAddress) {
        return <div className="container mx-auto p-4">Vui lòng kết nối ví để xem tài sản của bạn.</div>;
    }

    if (assets.length === 0) {
        return <div className="container mx-auto p-4">Bạn chưa sở hữu tài sản nào.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Tài sản của tôi</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {assets.map((nft, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md p-4 mb-4">
                        <img src={'/tram.jpg'} alt={nft.name} className="w-full h-48 object-cover rounded-lg mb-2" />
                        <h3 className="text-xl font-semibold mb-1">{nft.name}</h3>
                        <p className="text-gray-600 mb-2">{nft.description}</p>
                        <p className="text-green-600 font-bold">{nft.price} USDT</p>
                        <p className="text-gray-500 text-sm">Tuổi cây: {nft.details.age}</p>
                        <p className="text-gray-500 text-sm">Vị trí: {nft.details.location}</p>
                        <p className="text-gray-500 text-sm">Lợi nhuận: {nft.details.profit}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAssets;
