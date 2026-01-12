import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Chip, Button, } from "@mui/material";
import { updateOrderStatus } from "../../slices/orderSlice";

const pagesize = 5;

export default function Orders() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orders);
    const role = useSelector((state) => state.auth.role);
    const [page, setPage] = useState(0);

    const sortedOrders = useMemo(() => {
        return [...orders].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }, [orders]);

    const paginatedOrders = useMemo(() => {
        const start = page * pagesize;
        return sortedOrders.slice(start, start + pagesize);
    }, [page, sortedOrders]);

    const handleBuyNow = (orderId) => {
        if (role !== "admin") return;
        dispatch(updateOrderStatus({ orderId, status: "Completed" }));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" mb={3}>
                Orders
            </Typography>

            {orders.length === 0 ? (
                <Typography>No orders yet</Typography>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Created Date</TableCell>
                                <TableCell>Status</TableCell>

                                {role === "admin" && <TableCell>Action</TableCell>}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>

                                    <TableCell>
                                        {order.items.map((item) => (
                                            <Typography key={item.product.id} variant="body2">
                                                {item.product.name}{item.quantity}
                                            </Typography>
                                        ))}
                                    </TableCell>

                                    <TableCell>
                                        ${order.totalPrice.toFixed(2)}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            color={
                                                order.status === "Completed"
                                                    ? "success"
                                                    : order.status === "Pending"
                                                        ? "warning"
                                                        : "error"
                                            }
                                            size="small"
                                        />
                                    </TableCell>

                                    {role === "admin" && (
                                        <TableCell>
                                            {order.status === "Pending" && (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleBuyNow(order.id)}
                                                >
                                                    Buy Now
                                                </Button>
                                            )}
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <TablePagination
                        component="div"
                        count={sortedOrders.length}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPage={pagesize}
                        rowsPerPageOptions={[pagesize]}
                    />
                </>
            )}
        </Box>
    );
}
