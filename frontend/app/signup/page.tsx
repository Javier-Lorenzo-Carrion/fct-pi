"use client";
import {useForm} from "@mantine/form";
import {SignupContainer, SignupFormValues} from "@/components/SignupContainer";
import {redirect} from "next/navigation";


export default function Signup() {
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

    async function handleSignup(values: SignupFormValues) {
        const response = await fetch ("http://localhost:8080/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })

        if(response.status !== 201) {
            console.log("Error creating user" + await response.json());
        } else {
            redirect("/login");
        }
    }

    return (
        <SignupContainer key={form.key("password")} form={form} handleSignup={handleSignup}/>
    );
}