"use client";
import ReportContainer, {ReportFormValues} from "@/components/ReportContainer";
import { authFetch } from "@/lib/authFetch";

export default function ReportPage() {
    const generateReport = async (values: ReportFormValues) => {
        try {
            const response = await authFetch("http://localhost:8080/reports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.status !== 201) {
                console.error("Error creating reports:", response);
                return;
            }

            const report = await response.json();
            const reportId = report.id;

            const pdfResponse = await authFetch(`http://localhost:8080/reports/${reportId}/pdf`);

            if (!pdfResponse.ok) {
                console.error("Error fetching PDF:", pdfResponse);
                return;
            }

            const blob = await pdfResponse.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `report-${reportId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    return <ReportContainer handleReportGeneration={generateReport} />;
}
