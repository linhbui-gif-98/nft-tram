import { useEffect, useState } from "react";

import dynamic from 'next/dynamic';

const NFTCard = dynamic(() => import('@/components/NFTCard'), { ssr: false });
export default function MarketPlace({ walletAddress, onAssetUpdate }) {
  
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        const fakeNFTs = Array.from({ length: 50 }, (v, i) => ({
            id: i + 1,
            name: `Cây Trầm Hương #${i + 1}`,
            image: '/tram.jpg',
            description: `Cây trầm hương loại ${['thượng hạng', 'cao cấp', 'tinh khiết', 'hữu cơ', 'chất lượng cao'][i % 5]} tại Việt Nam`,
            price: Math.floor(800 + Math.random() * 1200),
            owner: null,
            details: {
                age: Math.floor(3 + Math.random() * 7) + ' năm',
                location: 'Trang trại Trầm Hương - Việt Nam',
                profit: '500-600%',
                harvesting: '5-7 năm',
                type: ['Gỗ trầm', 'Tinh dầu', 'Nhang'][i % 3]
            }
        }));
        setNFTs(fakeNFTs);
    }, []);

    const handleBuyNow = (nft) => {
        if (!walletAddress) {
            alert('Vui lòng kết nối ví trước khi mua NFT.');
            return;
        }

        // Lưu tài sản vào localStorage
        const key = `assets_${walletAddress}`;
        const currentAssets = JSON.parse(localStorage.getItem(key) || '[]');
        const updatedAssets = [...currentAssets, { ...nft, owner: walletAddress }];
        localStorage.setItem(key, JSON.stringify(updatedAssets));

        // Cập nhật state để hiển thị ngay lập tức
        setNFTs(nfts.map(item => 
            item.id === nft.id ? { ...item, owner: walletAddress } : item
        ));

        // Gọi callback để cập nhật danh sách tài sản trong App
        onAssetUpdate(updatedAssets);

        alert(`Mua thành công ${nft.name} với giá ${nft.price} USDT!`);
    };

return (
    <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} onBuyNow={handleBuyNow} />
            ))}
        </div>
    </div>
);
}
