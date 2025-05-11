import Link from "next/link";
import { useRouter } from "next/router";

 const NFTCard = ({ nft, onBuyNow }) => {
    const price = nft.price !== undefined ? nft.price : 0;
    const router = useRouter()
    const link  = `/nft/${nft.id}`
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4" >
            <Link href={link}><img src={nft.image} alt={nft.name} className="w-full h-48 object-cover rounded-lg mb-2" /></Link>
            <h3 className="text-xl font-semibold mb-1">
                <Link  href={link}>{nft.name}</Link>
            </h3>
            <p className="text-gray-600 mb-2">{nft.description}</p>
            <span className="text-green-600 font-bold">{Number(price)} USDT</span>
            <p className="text-gray-500 text-sm">Tuổi cây: {nft.details.age}</p>
                        <p className="text-gray-500 text-sm">Vị trí: {nft.details.location}</p>
                        <p className="text-gray-500 text-sm">Lợi nhuận: {nft.details.profit}</p>
            <button onClick={() => onBuyNow(nft)} className="block mt-2 bg-[#4E3620] text-white text-center py-2 px-2 rounded-lg">Mua ngay</button>
        </div>
    )
};
export default NFTCard