"use client";

import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import {useEffect, useState} from "react";
import {Center, Loader, ScrollArea, Table} from "@mantine/core";
import {white} from "next/dist/lib/picocolors";

export type Report = {
    id: string,
    generationDate: string,
    currency: string,
    fundedCapital: number,
    nominalInterestRate: number,
    amortizationPeriod: number,
    amortizationSystem: string,
    totalLoanPayment: number,
    totalInterestPayment: number,
    relativeInterestCharge: number,
    pdfUrl?: string;
}

export default function ReportHistoryContainer() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8080/reports", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
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

    if(loading){
        return (
            <Center className="min-h-screen bg-black">
                <Loader color="white" size="lg" />
            </Center>
        );
    }

    function currencyFormat(report: Report): Intl.NumberFormat {
        const locale = report.currency === "USD" ? "en-US" : "es-ES";
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: report.currency,
            minimumFractionDigits: 2,
        });
    }

    return (
        <div>
            <NavBarRegisteredUser />
            {reports.length === 0 ? (
                <h1 className="text-center">No reports found</h1>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-white text-white">
                        <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-2 border">Generation</th>
                            <th className="px-4 py-2 border">Currency</th>
                            <th className="px-4 py-2 border">Capital</th>
                            <th className="px-4 py-2 border">Interest</th>
                            <th className="px-4 py-2 border">Years</th>
                            <th className="px-4 py-2 border">System</th>
                            <th className="px-4 py-2 border">Total Payment</th>
                            <th className="px-4 py-2 border">Total Interest</th>
                            <th className="px-4 py-2 border">Relative Interest</th>
                            <th className="px-4 py-2 border">PDF</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reports.map((report, idx) => (
                            <tr key={idx}>
                                <td className="px-4 py-2 border">{new Date(report.generationDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border">{report.currency}</td>
                                <td className="px-4 py-2 border">{currencyFormat(report).format(report.fundedCapital)}</td>
                                <td className="px-4 py-2 border">{report.nominalInterestRate.toFixed(2)}%</td>
                                <td className="px-4 py-2 border">{report.amortizationPeriod}</td>
                                <td className="px-4 py-2 border">{report.amortizationSystem}</td>
                                <td className="px-4 py-2 border">{currencyFormat(report).format(report.totalLoanPayment)}</td>
                                <td className="px-4 py-2 border">{currencyFormat(report).format(report.totalInterestPayment)}</td>
                                <td className="px-4 py-2 border">{(report.relativeInterestCharge * 100).toFixed(2)}%</td>
                                <td className="px-4 py-2 border">
                                    <a
                                        href={`http://localhost:8080/reports/${report.id}/pdf`}
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Download
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

