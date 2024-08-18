import * as Yup from 'yup'


export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(10).required("Please enter your name"),
    phone: Yup.string().min(10).required("Please enter your phone"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    role: Yup.string().required("Role is required")

    // confirm_password: Yup.string().required().oneOf([Yup.ref('password'), null], "password must match")
})