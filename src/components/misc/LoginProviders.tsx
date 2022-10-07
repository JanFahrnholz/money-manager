import { Divider } from "@mui/material";
import { FC, ReactElement, useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import { UserContext } from "../../context/UserContext";

type Card = {
    icon: ReactElement;
    onClick: Function;
};

const LoginProvider: FC = () => {
    const { loginGoogle } = useContext(UserContext);

    const cards: Card[] = [
        {
            icon: <GoogleIcon />,
            onClick: () => loginGoogle(),
        },
        {
            icon: <AppleIcon />,
            onClick: () => console.log("apple id"),
        },
    ];

    return (
        <div className="mt-6">
            <Divider>or continue with</Divider>
            <div className="mt-6 grid grid-cols-2 gap-3">
                {cards.map((c, i) => (
                    <div
                        key={i}
                        onClick={() => c.onClick()}
                        className="border border-primary"
                    >
                        <a
                            href="#"
                            className="inline-flex w-full justify-center rounded-md  bg-dark-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-dark-900"
                        >
                            {c.icon}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoginProvider;
