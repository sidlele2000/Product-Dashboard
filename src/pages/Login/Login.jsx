import {Box,Button,Card,CardContent,Typography,Stack,} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
import loginimage from "../../assets/product-login-image.svg"

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (role) => {
        dispatch(login(role));
        navigate("/dashboard/products");
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt:5
            }}
        >
            <Card
                sx={{
                    width: { xs: "90vw", md: 900 },
                    height: { xs: "90vh", md: 500 },
                    borderRadius: 4,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                        bgcolor: "#e3ecff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                    }}
                >
                    <Box
                        component="img"
                        src={loginimage}
                        alt="Login image"
                        sx={{
                            width: "100%",
                            maxWidth: 900,
                            objectFit: "contain",
                        }}
                    />
                </Box>

                <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CardContent sx={{ p: { xs: 3, md: 5 }, width: "100%" }}>
                        <Typography variant="h4" fontWeight={700} mb={2}>
                            Welcome Back
                        </Typography>

                        <Typography variant="body1" color="text.secondary" mb={4}>
                            Select your role to access the product dashboard
                        </Typography>

                        <Stack spacing={3}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: "#2563eb",
                                    color: "#fff",
                                    fontWeight: 600,
                                    textTransform: "none",
                                    py: 1.5,
                                    "&:hover": { bgcolor: "#1e40af" },
                                }}
                                onClick={() => handleLogin("admin")}
                            >
                                Login as Admin
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    fontWeight: 600,
                                    textTransform: "none",
                                    py: 1.5,
                                    borderColor: "#2563eb",
                                    color: "#2563eb",
                                    "&:hover": { borderColor: "#1e40af", color: "#1e40af" },
                                }}
                                onClick={() => handleLogin("user")}
                            >
                                Login as User
                            </Button>
                        </Stack>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
}

export default Login;
