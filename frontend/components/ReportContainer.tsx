import NavbarAnonymousUser from "@/components/NavBarAnonymousUser";
import {Button, Divider, Flex, Group, NumberInput, Select, TextInput, Title, Tooltip} from "@mantine/core";
import Link from "next/link";
import {HelpCircle, Key, User} from "react-feather";
import Image from "next/image";
import {use} from "react";
import {useForm} from "@mantine/form";


interface ReportFormValues {
    fundedCapital: number;
    currency: string;


}

interface ReportContainerProps {
    handleReportGeneration: (values: ReportFormValues) => void;

}

export default function ReportContainer(props: ReportContainerProps){

    const form = useForm<ReportFormValues>({
        mode: "uncontrolled",
        initialValues: {
            fundedCapital: 0,
            currency: "EUR",
        },
        validate: {
            fundedCapital: value => value > 0 ? null : 'Funded capital must be greater than zero',
            currency: value => value.length > 0 ? null : "Currency must be selected",

        }
    })

return <div className="min-h-screen w-full bg-black flex items-center justify-center">
    <NavbarAnonymousUser/>
    <div className="flex flex-row items-center justify-center gap-12">
        <div className="text-white w-60">
            <Title size="lg" c="white" className="mb-4 text-center">
                Form Report Generation
            </Title>
            <br/>
            <form onSubmit={form.onSubmit(props.handleReportGeneration)} className="mt-8 w-full">
                <Flex className="w-full" gap="xl" direction="column" wrap="wrap">
                    <Select
                        classNames={{options: 'text-black'}}
                        label="Currency"
                        placeholder="EUR"
                        data={['EUR', 'USD', 'GBP']}
                        {...form.getInputProps("currency")}
                    />
                    <NumberInput
                        // TODO: ADD FORMAT NUMBER FOR ENGLISH AND SPANISH VERSION
                        className="w-60"
                        label={<Group><Tooltip label={'The amount of money lent by the bank must be indicated here.'}><HelpCircle size="20"/></Tooltip>Funded Capital</Group>}
                        placeholder="0.00"

                        {...form.getInputProps("fundedCapital")}
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
                src="/images/backgroundImage.jpg"
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