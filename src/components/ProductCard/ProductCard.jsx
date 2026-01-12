import { Card, CardMedia, CardContent, Typography, Box, Checkbox, TextField } from "@mui/material";

export default function ProductCard({ product, onSelectChange, selectedItem }) {
  if (!product) return null;

  const { id, image, title, category, price } = product;

  return (
    <Card
      sx={{
        width: 300,
        height: 380,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
        },
      }}
    >
      {image && (
        <CardMedia
          component="img"
          image={image}
          alt={title || "Product"}
          sx={{ height: 180, objectFit: "contain", p: 2, bgcolor: "#f9f9f9" }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
            {title || "No Title"}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
            {category || "Unknown Category"}
          </Typography>
          <Typography variant="h6" color="primary">
            ${price?.toFixed(2) || "0.00"}
          </Typography>
        </Box>

        {onSelectChange && (
          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Checkbox
              checked={selectedItem?.selected || false}
              onChange={(e) =>
                onSelectChange(product, e.target.checked, selectedItem?.quantity || 1)
              }
            />
            <TextField
              type="number"
              label="Qty"
              size="small"
              value={selectedItem?.quantity || 1}
              onChange={(e) =>
                onSelectChange(product, selectedItem?.selected || false, Number(e.target.value))
              }
              sx={{ width: "80px" }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
