
const AthletesCard = () => {
    return (
        <>

            <div
                className=" px-2 py-4 w-36 rounded-lg"
                style={{ backgroundColor: "#FFE2E5" }}
            >
                <div className="mx-auto w-16 h-16 border-4 border-white rounded-full overflow-hidden">
                    <img className="object-cover object-center h-16" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
                </div>
                <div className="text-center mt-2">
                    <h2 className="font-semibold text-mainHeading">Sarah Smith</h2>
                    <p className="text-gray-500 text-sm">2 Medals</p>
                </div>
            </div>
        </>
    )
}

export default AthletesCard