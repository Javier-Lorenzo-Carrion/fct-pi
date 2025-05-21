"use client";
import ReportContainer, {ReportFormValues} from "@/components/ReportContainer";
import {authHttpClient} from "@/lib/httpclient";

export default function ReportPage() {
    const generateReport = async (values: ReportFormValues) => {
        try {
            const response = await authHttpClient("reports", {
                method: "POST",
                body: JSON.stringify(values),
            });

            if (response.status !== 201) {
                console.error("Error creating reports:", response);
                return;
            }

            const report = await response.json();
            const reportId = report.id;

            const pdfResponse = await authHttpClient(`reports/${reportId}/pdf`);

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
