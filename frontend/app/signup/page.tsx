"use client";
import {useForm} from "@mantine/form";
import {SignupContainer, SignupFormValues} from "@/components/SignupContainer";
import {useRouter} from "next/navigation";
import {httpClient} from "@/lib/httpclient";
import {useState} from "react";

export default function Signup() {
    const router = useRouter();
    const form = useForm<SignupFormValues>({
        mode: "uncontrolled",
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            birthDate:'',
            username: "",
            password: "",
        },
        validate: {
            name: (value) => (!!value.length ? null : "Name is required"),
            lastName: (value) => (!!value.length ? null : "Last name is required"),
            email: (value) => (!!value.length ? null : "Email is required"),
            birthDate: (value) => (!!value.length ? null : "Birth date is required"),
            password: (value) => (!!value.length ? null : "Password is required"),
            username: (value) => (!!value.length ? null : "Username is required"),
        },
    });
    const [loading, setLoading] = useState(false);
    async function handleSignup(values: SignupFormValues) {
        setLoading(true)
        try {
            const response = await httpClient("auth/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (response.status !== 201) {
                throw new Error('Error: ' + await response.json());
            } else {
                setLoading(false)
                router.push("/registeredUser");
            }
        } catch (e) {
            setLoading(false)
            throw e;
        }
    }
    return (<SignupContainer key={form.key("password")} form={form} handleSignup={handleSignup}/>);
}
