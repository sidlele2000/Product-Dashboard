import { Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
    const menuItems = [
        { text: "Products", path: "/dashboard/products" },
        { text: "Orders", path: "/dashboard/orders" },
    ];
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    bgcolor: "#1d3976",
                    color: "#fff",
                },
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Dashboard
                </Typography>
            </Toolbar>

            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            "&.active": { bgcolor: "#1e40af" },
                            color: "#fff",
                        }}
                    >
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}
