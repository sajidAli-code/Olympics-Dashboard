import { useAppContext } from '@/app/context/AppContext';
import React, { useState, useEffect } from 'react';

const DisciplinesSelector = ({ disciplines }) => {
    const { setSelectedDisciplineNames } = useAppContext();

    // Initialize `selectedDisciplines` with up to the first 4 items from `disciplines`
    const [selectedDisciplines, setSelectedDisciplines] = useState(
        disciplines ? disciplines.slice(0, 4) : []
    );

    const toggleDiscipline = (dis) => {
        setSelectedDisciplines((prev) => {
            if (prev.includes(dis)) {
                // Remove discipline if already selected
                return prev.filter((item) => item !== dis);
            } else if (prev.length < 4) {
                // Add discipline if less than 4 are selected
                return [...prev, dis];
            } else {
                // Do nothing if 4 are already selected
                return prev;
            }
        });
    };

    const handleCloseAndLog = () => {
        // Update the context with selected disciplines and close the dialog
        setSelectedDisciplineNames(selectedDisciplines);
        document.getElementById("disciplineModel").close();
    };

    return (
        <>
            <dialog id="disciplineModel" className="modal">
                <div className="modal-box min-h-[75vh] overflow-y-hidden">
                    <form
                        method="dialog"
                        className="flex flex-row items-center justify-between h-[10%]"
                    >
                        <h3 className="font-bold text-lg">Select Disciplines (Only Four)</h3>
                        <button className="btn btn-sm btn-circle btn-ghost">✕</button>
                    </form>

                    <div
                        className="flex flex-wrap gap-3 px-2 py-8 overflow-y-scroll hide-scrollbar"
                        style={{ maxHeight: '60vh' }}
                    >
                        {disciplines?.map((dis, index) => {
                            const isSelected = selectedDisciplines.includes(dis);
                            return (
                                <div
                                    key={index}
                                    onClick={() => toggleDiscipline(dis)}
                                    className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all ${isSelected
                                        ? 'bg-indigo-500 text-white shadow-lg'
                                        : 'bg-gray-700 text-gray-200'
                                        } hover:shadow-xl space-x-2`}
                                >
                                    <span>{dis}</span>
                                    {isSelected && (
                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDiscipline(dis);
                                            }}
                                            className="ml-2 text-lg font-semibold cursor-pointer"
                                        >
                                            &times;
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleCloseAndLog}
                            className="btn bg-mainBlue text-white hover:bg-blue-600"
                        >
                            Confirm Selection
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default DisciplinesSelector;