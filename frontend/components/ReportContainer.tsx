import {Button, Divider, Flex, Group, NumberInput, Select, Title, Tooltip} from "@mantine/core";
import {HelpCircle} from "react-feather";
import Image from "next/image";
import {useForm} from "@mantine/form";
import NavBarRegisteredUser from "@/components/NavBarRegisteredUser";

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
            // TODO: CUANDO SE INTRODUCE EL DATO EN EL CAMPO SIGUE APARECIENDO EL CERO AL PRINCIPIO CUANDO EL USUARIO ESCRIBE
            fundedCapital: 0.00,
            currency: "EUR",
            nominalInterestRate: 0.00,
            amortizationPeriod: 0.00,
            amortizationSystem: "FRENCH"

        // TODO: TENGO EL PROBLEMA DE QUE CUANDO DEJO LOS INITIAL VALUES LOS PLACEHOLDERS NO SIRVEN PARA NADA PERO SI LOS QUITO ENTONCES LO QUE NO SIRVE ES EL VALIDATE

        },
        validate: {
            fundedCapital: value => value > 0 ? null : 'Funded capital must be greater than zero',
            currency: value => value.length > 0 ? null : "Currency must be selected",
            nominalInterestRate: value => value > 0 ? null : "Nominal annual interest rate must be greater than zero",
            amortizationPeriod: value => value > 0 ? null : "Amortization period must be greater than zero",
            amortizationSystem: value => value.length > 0 ? null : "Amortization system must be selected",

        }
    })
    const currencies = [
        {value: 'EUR', label: 'Euro'},
        {value: 'USD', label: 'Dollar'},
        {value: 'GBP', label: 'Pounds'},
    ]
    const amortizationSystems = [
        {value: 'FRENCH', label: 'French System'},
        {value: 'GERMAN', label: 'German System'},
        {value: 'AMERICAN', label: 'American System'},
    ]
return <div className="min-h-screen w-full bg-black flex items-center justify-center">
    <NavBarRegisteredUser/>
    <div className="flex flex-row items-center justify-center gap-12">
        <div className="text-white w-60">
            <Title size="30" c="white" className="mb-4 text-center">
                Report Generation
            </Title>
            <br/>
            <form onSubmit={form.onSubmit(props.handleReportGeneration)} className="mt-8 w-full">
                <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                    <Select
                        classNames={{options: 'text-black'}}
                        label={<Group><Tooltip label={'The currency in which the loan is to be repaid must be indicated here.'}><HelpCircle size="20"/></Tooltip>Currency</Group>}
                        placeholder="EUR"
                        data={currencies}
                        {...form.getInputProps("currency")}
                    />
                    <NumberInput
                        // TODO: ADD FORMAT NUMBER FOR ENGLISH AND SPANISH VERSION
                        className="w-60"
                        label={<Group><Tooltip label={'The amount of money lent by the bank must be indicated here.'}><HelpCircle size="20"/></Tooltip>Funded Capital</Group>}
                        placeholder="0.00"
                        allowDecimal={true}
                        decimalSeparator="."
                        hideControls={true}
                        {...form.getInputProps("fundedCapital")}
                    />
                    <NumberInput
                        // TODO: ADD FORMAT NUMBER FOR ENGLISH AND SPANISH VERSION
                        className="w-60"
                        label={<Group><Tooltip label={'Interest rate in years offered by the bank must be indicated here.'}><HelpCircle size="20"/></Tooltip>Nominal Interest Rate</Group>}
                        placeholder="0.0%"
                        min={0}
                        max={100}
                        decimalSeparator="."
                        allowDecimal={true}
                        hideControls={true}

                        {...form.getInputProps("nominalInterestRate")}
                    />
                    <NumberInput
                        // TODO: ADD FORMAT NUMBER FOR ENGLISH AND SPANISH VERSION
                        className="w-60"
                        label={<Group><Tooltip label={'The term in years of loan repayment must be indicated here.'}><HelpCircle size="20"/></Tooltip>Amortization Period</Group>}
                        placeholder="0"

                        {...form.getInputProps("amortizationPeriod")}
                    />
                    <Select
                        classNames={{options: 'text-black'}}
                        label={<Group><Tooltip label={'The loan repayment system must be indicated here.'}><HelpCircle size="20"/></Tooltip>Amortization System</Group>}
                        placeholder="French system"
                        data={amortizationSystems}
                        {...form.getInputProps("amortizationSystem")}
                    />
                    <Divider/>
                    <Button className="w-full" variant="filled" color="blue" radius="md" type="submit">
                        Generate Report
                    </Button>
                </Flex>
            </form>
        </div>
        <div className="flex-shrink-0">
            <Image
                src="/images/house.jpg"
                alt="Imagen central"
                width={750}
                height={500}
                style={{objectFit: "contain"}}
                priority
            />
        </div>
    </div>
</div>;
}
