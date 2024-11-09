import CountrySelect from "./CountrySelect"

const HeadBar = () => {
  return (
    <>
      <div className=" w-full h-full px-8 py-2 bg-white flex flex-row justify-between items-center">
        <h1 className=" text-2xl font-bold text-mainHeading">Overviews</h1>
        <CountrySelect />
      </div>
    </>
  )
}

export default HeadBar