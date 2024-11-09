'use client';

import AthletesCard from "@/components/AthletesCard";
import BiaxialBarChart from "@/components/charts/BiaxialBarChart";
import StackedBarCharts from "@/components/charts/StackedBarCharts";
import ContainerCard from "@/components/ContainerCard";
import HighlightsCard from "@/components/HighlightsCard";
import MedalCard from "@/components/MedalCard";
import { useAppContext } from "./context/AppContext";
import { useEffect, useState } from "react";
import DisciplinesSelector from "@/components/DisciplinesSelector";

export default function Home() {
  const { countryName, selectedDisciplineNames, setSelectedDisciplineNames } = useAppContext();
  const [overviewsData, setOverViewsData] = useState();
  const [disciplineStats, setDisciplineStats] = useState();


  useEffect(() => {
    async function fetchOverviewsData() {
      if (!countryName) return; // Check if countryName is defined

      const response = await fetch(`http://localhost:3000/api/process-csv`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ countryName })
      });

      const data = await response.json();
      setOverViewsData(data);
    }

    fetchOverviewsData();
  }, [countryName]);

  useEffect(() => {
    async function fetchDisciplinesBaseMedalsData() {
      if (!countryName) return; // Check if countryName is defined

      const response = await fetch(`http://localhost:3000/api/get-medals-by-disciplines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            countryName: countryName,
            selectedDisciplines: selectedDisciplineNames
          }
        )
      });

      const data = await response.json();
      setDisciplineStats(data);
    }

    fetchDisciplinesBaseMedalsData();
  }, [countryName, selectedDisciplineNames]);

  useEffect(() => {
    setSelectedDisciplineNames(disciplineStats ? disciplineStats?.allDisciplines.slice(0, 4) : [])
  }, [disciplineStats])


  return (
    <>
      <div className="grid grid-cols-4 grid-rows-3 gap-4">
        <div className="col-span-2">
          <HighlightsCard />
        </div>
        <div className="col-span-2 col-start-3">
          <ContainerCard heading="Top Athletes">
            <div className="flex flex-row justify-between items-center gap-4 px-2 py-4">
              <AthletesCard />
              <AthletesCard />
              <AthletesCard />
            </div>
          </ContainerCard>
        </div>
        <div className="col-span-2 row-start-2">
          <ContainerCard heading="Medals Won">
            <div className="flex flex-row justify-between items-center gap-4 px-2 py-4">
              <MedalCard
                medals={overviewsData?.totalMedals ? overviewsData?.totalMedals["Gold Medal"] : 0}
                bgColor={"#FFE2E5"}
                medalTag={"goldMedal.png"}
                medalName={'Gold Medals'}
              />
              <MedalCard
                medals={overviewsData?.totalMedals ? overviewsData?.totalMedals["Silver Medal"] : 0}
                bgColor={"#FFF4DE"}
                medalTag={"silverMedal.png"}
                medalName={'Silver Medals'}
              />
              <MedalCard
                medals={overviewsData?.totalMedals ? overviewsData?.totalMedals["Bronze Medal"] : 0}
                bgColor={"#DCFCE7"}
                medalTag={"brownsMedal.png"}
                medalName={'Bronze Medals'}
              />
            </div>
          </ContainerCard>
        </div>
        <div className="col-span-2 col-start-3 row-start-2">
          <ContainerCard heading="Medals By Disciplines" cardType={"iconCard"}>
            <BiaxialBarChart
              data={disciplineStats?.medalByDisciplines ? disciplineStats?.medalByDisciplines : {}}
              dataKey={'discipline'}
              firstBarFill={"#0095FF"}
              secBarFill={"#00E096"}
              dataKeyForFBar={"Males"}
              dataKeyForSBar={"Females"}
            />
          </ContainerCard>
        </div>
        <DisciplinesSelector
          disciplines={disciplineStats?.allDisciplines ? disciplineStats?.allDisciplines : []}
        />
        <div className="col-span-2 row-start-3">
          <ContainerCard heading="Athletes Age Distribution">
            <BiaxialBarChart
              data={overviewsData?.athletesAgeGroups ? overviewsData?.athletesAgeGroups : {}}
              dataKey={'range'}
              firstBarFill={"#4AB58E"}
              secBarFill={"#FFCF00"}
              dataKeyForFBar={"Males"}
              dataKeyForSBar={"Females"}
            />
          </ContainerCard>
        </div>
        <div className="col-start-3 row-start-3">
          <ContainerCard heading="Medals Won">
            <StackedBarCharts />
          </ContainerCard>
        </div>
        <div className="col-start-4 row-start-3">
          <ContainerCard heading="Country Name">
            Charts
          </ContainerCard>
        </div>
      </div>
    </>
  );
}