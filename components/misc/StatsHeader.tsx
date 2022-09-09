import { FC, useContext, useEffect } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { TransactionContext } from "../../context/TransactionContext";

const StatsHeader: FC = () => {
    const ctx = useContext(ProfileContext);

    const stats = [
        { name: "Balance", stat: ctx.profile.balance },
        { name: "Pending", stat: ctx.profile.pending },
    ];
    return (
        <>
            <dl className="grid grid-flow-col gap-2 p-2">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
                    >
                        <dt className="truncate text-sm font-medium text-gray-500">
                            {item.name}
                        </dt>
                        <dd className="m-0 mt-1 text-2xl font-semibold tracking-tight text-gray-900 text-left">
                            {item.stat}€
                        </dd>
                    </div>
                ))}
            </dl>
        </>
    );
};

export default StatsHeader;
