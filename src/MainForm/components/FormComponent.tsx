import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { countSquareBrackets } from "../utlis";
import * as yup from "yup";

type Props = {
    item: ItemType | undefined | null;
    onCloseHanlder: () => void;
    onSubmitHanlder: (item: ItemType) => void;
};

type ParamType = {
    param: number;
    order: number;
};

type ItemType = {
    text: string;
    code: string;
    params?: ParamType[];
};

type InputFields = {
    [key: string]: number;
};

const FormComponent: React.FC<Props> = ({
    item,
    onCloseHanlder,
    onSubmitHanlder,
}) => {
    if (!item || !item.text) {
        return <p>No items avaliable</p>;
    }

    const paramsLength = countSquareBrackets(item.text);
    const Inputs = Array.from(
        { length: paramsLength },
        (_, index) => `input${index + 1}`
    );
    const schema = yup.object().shape(
        Inputs.reduce((acc, inputName) => {
            acc[inputName] = yup
                .number()
                .required(`${inputName} is required`)
                .typeError(`${inputName} must be a number`);
            return acc;
        }, {} as Record<string, yup.Schema<number>>)
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputFields>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<InputFields> = (data) => {
        console.log(data);
        onSubmitHanlder(item);
        onCloseHanlder();
    };

    return (
        <>
            <div style={styles.overlay} onClick={onCloseHanlder}></div>

            <div style={styles.modal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p>{item.text}</p>
                    <div style={styles.inputContainer}>
                        {Inputs.map((name) => (
                            <div key={name}>
                                <input
                                    style={styles.input}
                                    {...register(name)}
                                    type="number"
                                    placeholder={name}
                                ></input>
                                {errors[name] && (
                                    <p style={styles.error}>
                                        {errors[name]?.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div style={styles.buttonContainer}>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={onCloseHanlder}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

const styles = {
    inputContainer: {
        display: "flex",
        backgrounColor: "red",
        padding: " 0 2rem",
    },

    input: {
        minWidth: "100px",
        minHeight: "40px",
        margin: "1rem",
    },

    overlay: {
        position: "fixed" as "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    },
    modal: {
        position: "fixed" as "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
        zIndex: 1001,
        minWidth: "300px",
        maxWidth: "80%",
        maxHeight: "80%",
        overflowY: "auto" as "auto",
    },
    error: {
        color: "red",
        fontSize: "12px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px",
    },
};

export default FormComponent;
