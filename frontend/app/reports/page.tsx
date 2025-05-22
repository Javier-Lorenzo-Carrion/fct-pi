"use client";

import ReportContainer, { ReportFormValues } from "@/components/ReportContainer";
import { authHttpClient } from "@/lib/httpclient";
import { useState } from "react";
import { useError } from "@/error/context";
import { redirect } from "next/navigation";

export default function ReportPage() {
    const [loading, setLoading] = useState(false);


    const generateReport = async (values: ReportFormValues) => {
        setLoading(true);

        try {
            const response = await authHttpClient("reports", {
                method: "POST",
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error creating report: ${JSON.stringify(errorData)}`);
            }

            const { id: reportId } = await response.json();

            const pdfResponse = await authHttpClient(`reports/${reportId}/pdf`);

            if (!pdfResponse.ok) {
                const errorData = await pdfResponse.json();
                throw new Error(`Error generating PDF: ${JSON.stringify(errorData)}`);
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

            redirect("/reports");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return <ReportContainer handleReportGeneration={generateReport} />;
}
