import { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, CircularProgress, Snackbar, Alert,} from "@mui/material";
import { fetchProducts } from "../../app/api";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../slices/orderSlice";
import { useNavigate } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleSelectChange = (product, selected, quantity) => {
    setSelectedProducts((prev) => ({ //select products 
      ...prev,
      [product.id]: { selected, quantity, product },
    }));
  };

  const handleOrderSelected = () => { //handling orders of multiselected products
    const items = Object.values(selectedProducts)
      .filter((i) => i.selected && i.quantity > 0)
      .map((i) => ({ product: i.product, quantity: i.quantity }));

    if (items.length === 0) return;

    dispatch(createOrder({ items })); // add 

    setSelectedProducts({});
    setSuccess(true);

    navigate("/dashboard/orders");
  };

  const hasSelected = Object.values(selectedProducts).some( //selecting at least one product
    (p) => p.selected && p.quantity > 0
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Our Products
      </Typography>

      {role === "admin" && (
        <Button
          variant="contained"
          sx={{ mb: 3 }}
          onClick={handleOrderSelected}
          disabled={!hasSelected || loading}
        >
          Order Selected Products
        </Button>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard
              product={product}
              onSelectChange={
                role === "admin" ? handleSelectChange : undefined
              }
              selectedItem={selectedProducts[product.id]}
            />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" variant="filled">
          order created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Products