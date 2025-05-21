"use client";

import ReportHistoryContainer, {Report} from "@/components/ReportHistoryContainer";
import {useEffect, useState} from "react";
import {authHttpClient} from "@/lib/httpclient";

export default function ReportHistoryPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await authHttpClient("reports");
                if (!response.ok) throw new Error("Error fetching reports");
                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);
    const downloadReport = (reportId: string) => `${process.env.NEXT_PUBLIC_BACKEND_URL}/reports/${reportId}/pdf`;
    return (
        <div className="flex flex-row items-center justify-center gap-12 mt-36">
            <ReportHistoryContainer loading={loading} reports={reports} downloadReport={downloadReport}/>
        </div>
    );
}
