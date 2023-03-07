import { OrderRecord } from "features/marketplace/types/Order";
import { client } from "lib/Pocketbase";
import {
	GetServerSideProps,
	GetStaticPaths,
	GetStaticProps,
	NextPage,
} from "next";
import { NextRouter, useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useMemo } from "react";

const OrderDetailsPage: NextPage = () => {
	const router: NextRouter = useRouter();
	const { id } = router.query as { id: string };

	const order = useMemo(async () => {
		const order = await client.collection("orders").getOne(id);
	}, [id]);

	if (!order) return <>error no order</>;

	return <>order details {order}</>;
};

export default OrderDetailsPage;
