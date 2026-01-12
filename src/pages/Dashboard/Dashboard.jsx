import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";

const drawerWidth = 250;

export default function Dashboard() {
  const { role } = useSelector((state) => state.auth);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow:1,
          bgcolor: "#f0f4ff",
          width:100,
        }}
      >
        <Toolbar />
        <Header role={role} />
        <Outlet />
      </Box>
    </Box>
  );
}
