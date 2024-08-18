import * as Yup from 'yup';

export const ticketSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().min(5).required("Description is required")
})