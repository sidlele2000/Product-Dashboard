import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsRow({ products, loading, error }) {
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" mt={5}>
        {error}
      </Typography>
    );

  if (products.length === 0)
    return <Typography mt={5}>No products found.</Typography>;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
