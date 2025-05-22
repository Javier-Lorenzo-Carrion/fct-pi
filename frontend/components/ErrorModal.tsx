"use client"
import {JSX} from "react";
import {Modal, Text, Title} from "@mantine/core";
import {useError} from "@/error/context";
import {useTranslations} from "next-intl";
import {getLocaleOrDefault} from "@/i18n/config";

export function ErrorModal(): JSX.Element {
    const t = useTranslations("errors");
    const {error, clearError} = useError();

    return <Modal className="text-red-300" opened={Boolean(error)} onClose={clearError} title={<Title c="red" order={3}>{t(error?.title || 'unexpected.title')}</Title>} centered>
        <Text>{t(error?.description || 'unexpected.description')}</Text>
    </Modal>
}
