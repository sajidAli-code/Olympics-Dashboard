import { useAppContext } from '@/app/context/AppContext';
import React from 'react'
import { BiCategory } from "react-icons/bi";

const ContainerCard = ({ heading, children, cardType }) => {
    const { toggleModel } = useAppContext();
    return (
        <>
            <div className={` flex flex-col items-start gap-1 py-3 px-4 h-full w-full bg-white rounded-lg`}>
                <span className=' w-full flex flex-row justify-between items-center'>
                    <h2 className=' font-semibold text-mainHeading'>{heading}</h2>
                    {
                        cardType === 'iconCard' ? (
                            <BiCategory
                                className=' text-xl text-mainHeading cursor-pointer hover:text-blue-900'
                                onClick={toggleModel}
                            />
                        ) : <></>
                    }
                </span>
                <span className=' w-full h-full'>
                    {children}
                </span>
            </div>
        </>
    )
}

export default ContainerCard