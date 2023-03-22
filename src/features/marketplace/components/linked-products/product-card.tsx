import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Divider,
    CardHeader,
} from "@mui/material";
import { ProductRecord } from "features/marketplace/types/Product";
import ProfileAvatar from "features/user-profiles/components/avatar";
import Username from "features/user-profiles/components/username";
import { FC } from "react";

interface ProductCardProps {
    product: ProductRecord;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return (
        <Card sx={{ backgroundColor: "secondary.main" }}>
            <CardHeader
                disableTypography
                sx={{ p: 1 }}
                title={<Username id={product.owner} />}
            />

            <CardMedia
                sx={{ height: 100 }}
                image="data:image/png;base64,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"
            />
            <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                    <br />
                    Price {product.price}€/{product.unit}
                </Typography>
            </CardContent>
            <CardActions sx={{ float: "right" }}>
                <Button size="small" variant="contained">
                    Order
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
