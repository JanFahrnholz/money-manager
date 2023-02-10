import User from "@/types/User";
import { FC } from "react";
import useSetting from "../hooks/useSetting";
import useUser from "../hooks/useUser";
import UserUpdateFieldBoolean from "./field-boolean";

interface Props {
    prop: keyof User;
    title?: string;
    subTitle?: string;
    placeholder?: string;
    helperText?: string;
}

const UserUpdateField: FC<Props> = ({ prop, title, subTitle, placeholder }) => {
    const { user } = useUser();
    const setting = useSetting(prop);
    if (!user) return <></>;

    // if (typeof user[prop] === "string")
    //     return (
    //         <UserUpdateFieldString
    //             prop={prop}
    //             title={title}
    //             subTitle={subTitle}
    //             placeholder={placeholder}
    //         />
    //     );

    if (typeof setting === "boolean")
        return (
            <UserUpdateFieldBoolean
                prop={prop}
                title={title}
                subTitle={subTitle}
            />
        );

    return (
        <>
            no {prop} {setting}
        </>
    );
};

export default UserUpdateField;
