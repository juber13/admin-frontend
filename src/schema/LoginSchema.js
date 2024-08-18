import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Email is equired"),
    password: Yup.string().required("Password is required"),
})