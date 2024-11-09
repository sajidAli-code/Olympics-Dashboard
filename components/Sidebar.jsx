import Link from "next/link";
import { FaTrophy, FaHome, FaChartBar, FaShoppingCart, FaBoxOpen, FaEnvelope, FaCog, FaSignOutAlt } from "react-icons/fa";
import { RiPieChart2Fill } from "react-icons/ri";

export default function Sidebar() {
    return (
        <nav className="min-h-screen w-full bg-white px-8 py-4 flex flex-col items-center space-y-3 text-gray-700">
            {/* Olympics Logo Section */}
            <div className=" w-full flex items-center space-x-2 mb-6">
                <span className=" p-2 bg-mainBlue rounded-md">
                    <FaTrophy className="text-white text-xl" />
                </span>
                <h1 className=" text-mainHeading text-xl font-semibold">Olympics</h1>
            </div>

            {/* Navigation Links */}
            <ul className="flex-1 w-full space-y-4">
                <li>
                    <Link href="/overviews" className="flex items-center space-x-4 px-4 py-2 text-white font-semibold bg-mainBlue rounded-lg">
                        <RiPieChart2Fill />
                        <span className=" text-sm">Overviews</span>
                    </Link>
                </li>
                <li>
                    <Link href="/leaderboard" className="flex items-center space-x-4 px-4 py-2 text-lightGrayText rounded-lg hover:bg-blue-100">
                        <FaChartBar />
                        <span className=" text-sm">Leaderboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/order" className="flex items-center space-x-4 px-4 py-2 text-lightGrayText rounded-lg hover:bg-blue-100">
                        <FaShoppingCart />
                        <span className=" text-sm">Order</span>
                    </Link>
                </li>
                <li>
                    <Link href="/products" className="flex items-center space-x-4 px-4 py-2 text-lightGrayText rounded-lg hover:bg-blue-100">
                        <FaBoxOpen />
                        <span className=" text-sm">Products</span>
                    </Link>
                </li>
                <li>
                    <Link href="/sales-report" className="flex items-center space-x-4 px-4 py-2 text-lightGrayText rounded-lg hover:bg-blue-100">
                        <FaChartBar />
                        <span className=" text-sm">Sales Report</span>
                    </Link>
                </li>
                <li>
                    <Link href="/messages" className="flex items-center space-x-4 px-4 py-2 text-lightGrayText rounded-lg hover:bg-blue-100">
                        <FaEnvelope />
                        <span className=" text-sm">Messages</span>
                    </Link>
                </li>
                <li>
                    <Link href="/settings" className="flex items-center space-x-4 px-4 py-2 text-lightGrayText rounded-lg hover:bg-blue-100">
                        <FaCog />
                        <span className=" text-sm">Settings</span>
                    </Link>
                </li>
                <li>
                    <Link href="/sign-out" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg text-red-500">
                        <FaSignOutAlt />
                        <span className=" text-sm">Sign Out</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}