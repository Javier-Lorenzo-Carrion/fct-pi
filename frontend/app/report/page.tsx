"use client";
import ReportContainer, {ReportFormValues} from "@/components/ReportContainer";

export default function ReportPage() {
    const generateReport = async (values: ReportFormValues) => {
        console.log(values)
        const response = await fetch("http://localhost:8080/reports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.status !== 201) {
            console.error(response)
        }
    }
    return <ReportContainer handleReportGeneration={generateReport} />
}
