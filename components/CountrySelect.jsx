'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";

export default function CountrySelect() {
    const { setCountryName } = useAppContext();
    const [countriesCode, setCountriesCode] = useState([]);
    const [countryFlag, setCountryFlag] = useState("https://flagcdn.com/w320/us.png");

    useEffect(() => {
        async function fetchCountriesCodeAndFlags() {
            const response = await fetch("http://localhost:3000/api/get-country-codes");
            const data = await response.json();
            setCountriesCode(data?.countries || []);
        }
        fetchCountriesCodeAndFlags();
    }, []);

    const handleCountryChange = (event) => {
        const countryObj = JSON.parse(event.target.value);
        setCountryName(countryObj.country);
        setCountryFlag(countryObj.flag_url);
    };

    return (
        <div className="flex items-center space-x-2">
            <Image
                height={20}
                width={20}
                src={countryFlag}
                alt="country flag"
            />
            {countriesCode.length > 0 && (
                <select
                    onChange={handleCountryChange}
                    className="hide-scrollbar bg-transparent text-gray-700 font-medium focus:outline-none"
                >
                    {countriesCode.map((country, index) => (
                        <option key={index} value={JSON.stringify(country)}>
                            {country.country_code.toUpperCase()}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}