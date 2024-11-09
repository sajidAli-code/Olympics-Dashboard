import { useAppContext } from "@/app/context/AppContext";
import Image from "next/image"

const MedalCard = ({ medals, bgColor, medalTag, medalName }) => {
    const { countryName } = useAppContext();
    return (
        <div
            className=" relative w-36 px-4 pt-12 pb-4 rounded-lg"
            style={{ backgroundColor: bgColor }}
        >
            <h2 className=" text-xl font-semibold text-mainHeading">{medals}</h2>
            <h3 className=" text-sm font-semibold text-smallTextColor">{medalName}</h3>
            <p className=" text-xs font-semibold text-mainBlue">Won by {countryName}</p>
            <Image
                height={70}
                width={70}
                src={`/icons/${medalTag}`}
                alt="medalTag"
                className=" absolute -top-5 -left-2"
            />
        </div>
    )
}

export default MedalCard