import { Box, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authenticationSlice";
import { useNavigate } from "react-router-dom";

export default function Header({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="body1" component="span" sx={{ ml: 3}}>
          Role: {role.toUpperCase()}
        </Typography>
        <Button sx={{ml:2}} variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}
