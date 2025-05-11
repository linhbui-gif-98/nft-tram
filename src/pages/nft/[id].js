import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NFTDetails = ({ walletAddress, onAssetUpdate }) => {
    const router = useRouter();
    const { id } = router.query;
    const [nft, setNFT] = useState(null);

    useEffect(() => {
        if (id) {
            const fakeNFT = {
                id: id,
                name: `Cây Trầm Hương #${id}`,
                image: '/tram.jpg',
                description: `Cây trầm hương loại ${['thượng hạng', 'cao cấp', 'tinh khiết', 'hữu cơ', 'chất lượng cao'][id % 5]} tại Việt Nam`,
                price: Math.floor(800 + Math.random() * 1200),
                details: {
                    age: Math.floor(3 + Math.random() * 7) + ' năm',
                    location: 'Trang trại Trầm Hương - Việt Nam',
                    profit: '500-600%',
                    harvesting: '5-7 năm',
                    type: ['Gỗ trầm', 'Tinh dầu', 'Nhang'][id % 3],
                    gps: '12.345678, 98.765432',
                    growthStage: ['Mới trồng', 'Phát triển', 'Trưởng thành'][id % 3],
                    careHistory: [
                        { date: '2023-01-01', note: 'Bón phân hữu cơ lần 1' },
                        { date: '2023-03-15', note: 'Tưới nước bổ sung dinh dưỡng' },
                        { date: '2023-06-01', note: 'Kiểm tra sâu bệnh' },
                        { date: '2023-09-20', note: 'Thu hoạch tinh dầu lần 1' }
                    ]
                }
            };
            setNFT(fakeNFT);
        }
    }, [id]);

    const handleBuyNow = () => {
        if (!walletAddress) {
            alert('Vui lòng kết nối ví trước khi mua NFT.');
            return;
        }

        const key = `assets_${walletAddress}`;
        const currentAssets = JSON.parse(localStorage.getItem(key) || '[]');
        const updatedAssets = [...currentAssets, { ...nft, owner: walletAddress }];
        localStorage.setItem(key, JSON.stringify(updatedAssets));

        onAssetUpdate(updatedAssets);

        alert(`Mua thành công ${nft.name} với giá ${nft.price} USDT!`);
        router.push('/my-assets');
    };

    if (!nft) return <div className="container mx-auto p-4">Đang tải dữ liệu...</div>;
    return (
        <div className="container mx-auto p-4">
            <img src={nft.image} alt={nft.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <h2 className="text-3xl font-bold mb-2">{nft.name}</h2>
            <p className="text-gray-600 mb-4">{nft.description}</p>
            <p className="text-green-600 font-bold text-lg mb-2">Giá: {nft.price} USDT</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-2xl font-semibold mb-2">Thông tin chi tiết</h3>
                <ul className="text-gray-600">
                    <li><strong>Tuổi cây:</strong> {nft.details.age}</li>
                    <li><strong>Vị trí:</strong> {nft.details.location}</li>
                    <li><strong>Lợi nhuận:</strong> {nft.details.profit}</li>
                    <li><strong>Thời gian thu hoạch:</strong> {nft.details.harvesting}</li>
                    <li><strong>Loại sản phẩm:</strong> {nft.details.type}</li>
                    <li><strong>Tọa độ GPS:</strong> {nft.details.gps}</li>
                    <li><strong>Giai đoạn phát triển:</strong> {nft.details.growthStage}</li>
                </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="text-2xl font-semibold mb-2">Lịch sử chăm sóc</h3>
                <ul className="text-gray-600">
                    {nft.details.careHistory.map((event, index) => (
                        <li key={index} className="mb-2">
                            <strong>{event.date}:</strong> {event.note}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="block mt-4 bg-[#4E3620] text-white text-center py-2 rounded-lg w-full" onClick={handleBuyNow}>Mua ngay</button>
        </div>
    );
};
export default NFTDetails