import type { NextPage } from "next";
import Navigation from "../components/Navigation";
import People from "../components/people";
import Profile from "../components/profile";
import Tools from "../components/tools";
import Transactions from "../components/transactions";
import StyledAddToHomescreen from "../components/misc/StyledAddToHomescreen";

const Home: NextPage = () => {
    return (
        <>
            <Navigation
                tabs={[
                    <Transactions key={0} />,
                    <People key={1} />,
                    <Tools key={2} />,
                    <Profile key={3} />,
                ]}
            />
            <StyledAddToHomescreen />
        </>
    );
};

export default Home;
