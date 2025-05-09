"use client";
import {useForm} from "@mantine/form";
import {SignupContainer, SignupFormValues} from "@/components/SignupContainer";


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

    function handleSignup(values: SignupFormValues) {
        console.log(values.name);
        console.log(values.lastName);
        console.log(values.email);
        console.log(values.birthDate);
        console.log(values.username);
        console.log(values.password);
        console.log("Registro de usuario");
    }

    return (
        <SignupContainer key={form.key("password")} form={form} handleSignup={handleSignup}/>
    );
}