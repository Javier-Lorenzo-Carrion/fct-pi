"use client";
import {Button, Divider, Flex, Group, NumberInput, Select, Title, Tooltip} from "@mantine/core";
import {HelpCircle} from "react-feather";
import Image from "next/image";
import {useForm} from "@mantine/form";
import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";
import {useTranslations} from "next-intl";

export interface ReportFormValues {
    fundedCapital: number;
    currency: string;
    nominalInterestRate: number;
    amortizationPeriod: number;
    amortizationSystem: string;
}
interface ReportContainerProps {
    handleReportGeneration: (values: ReportFormValues) => void;
}
export default function ReportContainer(props: ReportContainerProps){
    const form = useForm<ReportFormValues>({
        mode: "controlled",
        initialValues: {
            fundedCapital: 0.00,
            currency: "EUR",
            nominalInterestRate: 0.00,
            amortizationPeriod: 0.00,
            amortizationSystem: "FRENCH"
        },
        validate: {
            fundedCapital: value => value > 0 ? null : 'Funded capital must be greater than zero',
            currency: value => value.length > 0 ? null : "Currency must be selected",
            nominalInterestRate: value => value > 0 ? null : "Nominal annual interest rate must be greater than zero",
            amortizationPeriod: value => value > 0 ? null : "Amortization period must be greater than zero",
            amortizationSystem: value => value.length > 0 ? null : "Amortization system must be selected",
        }
    })
    const t = useTranslations("reportGenerationForm");
    const currencies = [
        {value: 'EUR', label: t("euro")},
        {value: 'USD', label: t("dollar")},
        {value: 'GBP', label: t("pounds")},
    ]
    const amortizationSystems = [
        {value: 'FRENCH', label: t("frenchSystem")},
        {value: 'GERMAN', label: t("germanSystem")},
        {value: 'AMERICAN', label: t("americanSystem")},
    ]
return <div className="min-h-screen w-full bg-black flex items-center justify-center">
    <NavBarRegisteredUser/>
    <div className="flex flex-row items-center justify-center gap-12">
        <div className="text-white w-60">
            <Title size="30" c="white" className="mb-4 text-center">
                {t("titleReportGeneration")}
            </Title>
            <br/>
            <form onSubmit={form.onSubmit(props.handleReportGeneration)} className="mt-8 w-full">
                <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                    <Select
                        classNames={{options: 'text-black'}}
                        label={<Group><Tooltip label={t("infoCurrency")}><HelpCircle size="20"/></Tooltip>{t("currency")}</Group>}
                        placeholder="EUR"
                        data={currencies}
                        {...form.getInputProps("currency")}
                    />
                    <NumberInput
                        className="w-60"
                        label={<Group><Tooltip label={t("infoFundedCapital")}><HelpCircle size="20"/></Tooltip>{t("fundedCapital")}</Group>}
                        placeholder="0.00"
                        allowDecimal={true}
                        decimalSeparator="."
                        hideControls={true}
                        {...form.getInputProps("fundedCapital")}
                    />
                    <NumberInput
                        className="w-60"
                        label={<Group><Tooltip label={t("infoNominalInterestRate")}><HelpCircle size="20"/></Tooltip>{t("nominalInterestRate")}</Group>}
                        placeholder="0.0%"
                        min={0}
                        max={100}
                        decimalSeparator="."
                        allowDecimal={true}
                        hideControls={true}

                        {...form.getInputProps("nominalInterestRate")}
                    />
                    <NumberInput
                        className="w-60"
                        label={<Group><Tooltip label={t("infoAmortizationPeriod")}><HelpCircle size="20"/></Tooltip>{t("amortizationPeriod")}</Group>}
                        placeholder="0"

                        {...form.getInputProps("amortizationPeriod")}
                    />
                    <Select
                        classNames={{options: 'text-black'}}
                        label={<Group><Tooltip label={t("infoAmortizationSystem")}><HelpCircle size="20"/></Tooltip>{t("amortizationSystem")}</Group>}
                        placeholder="French system"
                        data={amortizationSystems}
                        {...form.getInputProps("amortizationSystem")}
                    />
                    <Divider/>
                    <Button className="w-full" variant="filled" color="blue" radius="md" type="submit">
                        {t("generateReportButton")}
                    </Button>
                </Flex>
            </form>
        </div>
        <div className="flex-shrink-0">
            <Image
                src="/images/house.jpg"
                alt={t("mainImage")}
                width={750}
                height={500}
                style={{objectFit: "contain"}}
                priority
            />
        </div>
    </div>
</div>;
}
