import { Divider, IconButton, ListItem, ListItemText } from "@mui/material";
import { FC, useState } from "react";
import { ProductRecord } from "../../types/Product";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ActionMenu from "@/components/misc/ActionMenu";
import { client } from "lib/Pocketbase";
import { formatDailyDateTime } from "lib/Formatter";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import useUpdateProduct from "../../hooks/useUpdateProduct";

interface Props {
    product: ProductRecord;
}

const ProductItem: FC<Props> = ({ product }) => {
    const [open, setOpen] = useState(false);
    const remove = useDeleteProduct();
    const update = useUpdateProduct();

    const isOwner = client.authStore.model?.id == product.owner;

    const actions = [
        {
            name: `${product.name} ${product.price}€ per ${product.unit}`,
            action: undefined as undefined | Function,
            color: undefined as undefined | string,
        },
        {
            name: `Description: ${product.description}`,
            action: undefined as undefined | Function,
            color: undefined as undefined | string,
        },
    ];

    if (isOwner)
        actions.push({
            name: !product.disabled ? "Disable" : "Enable",
            action: () =>
                update({ id: product.id, disabled: !product.disabled }),
            color: "#ffd600",
        });

    if (isOwner)
        actions.push({
            name: "Delete",
            action: () => remove(product.id),
            color: "#ff1c1c",
        });

    return (
        <>
            <ListItem
                sx={{
                    mt: 1,
                    borderRadius: 1,
                    bgcolor: product.disabled
                        ? "secondary.dark"
                        : "secondary.main",
                }}
                onClick={() => setOpen(!open)}
                secondaryAction={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }
            >
                <ListItemText
                    sx={{
                        maxWidth: 150,
                    }}
                    primary={`${product.name}`}
                    secondary={`${product.price}€ per ${product.unit}`}
                />
                <ListItemText
                    primary={`${product.description}`}
                    secondary={`Stock: ${product.stock || 0}${product.unit}`}
                />
            </ListItem>
            <ActionMenu actions={actions} open={open} setOpen={setOpen} />
        </>
    );
};
export default ProductItem;
