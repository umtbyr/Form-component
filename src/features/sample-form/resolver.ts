import * as yup from "yup";

export const validationSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    rules: yup
        .array()
        .of(
            yup.object().shape({
                text: yup.string().required(),
                code: yup.string().required(),
            })
        )
        .required(),
});


