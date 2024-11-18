import { SetStateAction } from "react";

export type mainFormContextType = {
    formIsOpen: boolean;
    setFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isEditing: boolean;
    setIsEditing: React.Dispatch<SetStateAction<boolean>>;
    activeItem: ItemType | null | undefined;
    setActiveItem: React.Dispatch<SetStateAction<ItemType | null | undefined>>;
    consumerList: ItemType[];
    setConsumerList: React.Dispatch<SetStateAction<ItemType[]>>;
    rulesList: ItemType[];
    setRulesList: React.Dispatch<SetStateAction<ItemType[]>>;
};

export type ParamType = {
    param: number;
    order: number;
};

export type ItemType = {
    text: string;
    code: string;
    params?: ParamType[];
};

export type FormInputType = {
    title: string;
    description: string;
    consumer: ItemType[];
};

export type InputFields = {
    [key: string]: number;
};
