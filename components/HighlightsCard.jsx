import Image from "next/image"

const HighlightsCard = () => {
    return (
        <div className=" flex flex-row py-3 px-4 h-full w-full bg-white rounded-lg">
            <span className="">
                <Image 
                    height={200}
                    width={200}
                    src={'/players.png'}
                    alt="players"
                />
            </span>
            <span className=" flex-1 flex flex-col mt-8">
                <h4 className=' text-xl font-bold text-mainHeading'>Highlights</h4>
                <p className=" text-justify text-sm text-smallTextColor px-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem,
                    est non adipisci saepe cum vel eligendi odio voluptates eos magnam. Impedit
                    assumenda.
                </p>
            </span>
        </div>
    )
}

export default HighlightsCard