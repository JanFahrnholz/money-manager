import type { NextPage } from "next";
import Navigation from "../components/Navigation";
import People from "../components/people";
import Profile from "../components/profile";
import Transactions from "../components/transactions";

const Home: NextPage = () => {
    return (
        <Navigation
            tabs={[
                <Transactions key={0} />,
                <People key={1} />,
                <Profile key={2} />,
            ]}
        />
    );
};

export default Home;
