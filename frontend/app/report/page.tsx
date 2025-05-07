"use client";
import ReportContainer from "@/components/ReportContainer";

export default function ReportPage(){
    return <ReportContainer handleReportGeneration={(values) => {
        console.log(values)
    }}></ReportContainer>
}