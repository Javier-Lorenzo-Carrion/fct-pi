"use client";

import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import {JSX} from "react";
import {Center, Loader} from "@mantine/core";
import {useTranslations} from "next-intl";

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

export type ReportHistoryProps = {
    reports: Report[];
    loading: boolean;
    downloadReport: (reportId: string) => string;
}

export default function ReportHistoryContainer({reports, loading, downloadReport}: ReportHistoryProps): JSX.Element {
    const t = useTranslations("reportsTable");

    if(loading){
        return (
            <Center className="min-h-screen bg-black">
                <Loader color="white" size="lg" />
            </Center>
        );
    }

    function currencyFormat(report: Report): Intl.NumberFormat {
        const localeByCurrency: Record<string, string> = {
            EUR: "es-ES",
            USD: "en-US",
            GBP: "en-GB",
        }
        const locale = localeByCurrency[report.currency] || "es-ES";
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
                                        href={downloadReport(report.id)}
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

