"use client";

import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import {useEffect, useState, useTransition} from "react";
import {Center, Loader, ScrollArea, Table} from "@mantine/core";
import {white} from "next/dist/lib/picocolors";
import {useTranslations} from "next-intl";
import {Locale} from "@/i18n/config";
import {setStoredLocale} from "@/i18n/locale";

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

    const t = useTranslations("reportsTable");

    const [_, startTransition] = useTransition();
    function handleChangeLocale(locale: Locale) {
        startTransition(() => setStoredLocale(locale))
    }

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
        let locale: string = "es-ES";
        if (report.currency === "USD") {
            locale = "en-US";
        } else if (report.currency === "GBP") {
            locale = "en-GB";
        }
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
                <h1 className="text-center">{t("emptyReports")}</h1>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-white text-white">
                        <thead className="bg-gray-800">
                        <tr>
                            <th className="px-4 py-2 border">{t("generationDate")}</th>
                            <th className="px-4 py-2 border">{t("currency")}</th>
                            <th className="px-4 py-2 border">{t("capital")}</th>
                            <th className="px-4 py-2 border">{t("interest")}</th>
                            <th className="px-4 py-2 border">{t("years")}</th>
                            <th className="px-4 py-2 border">{t("system")}</th>
                            <th className="px-4 py-2 border">{t("totalPayment")}</th>
                            <th className="px-4 py-2 border">{t("totalInterest")}</th>
                            <th className="px-4 py-2 border">{t("relativeInterest")}</th>
                            <th className="px-4 py-2 border">{t("pdf")}</th>
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
                                        {t("download")}
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

