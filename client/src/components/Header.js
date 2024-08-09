import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2C3E50", padding: 2 }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, color: "#ECF0F1", fontWeight: "bold" }}>
          Blogging Platform
        </Typography>
        {isLogin && (
          <Box display="flex" marginLeft="auto" marginRight="auto" alignItems="center">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              sx={{ borderBottom: "1px solid #BDC3C7" }}
            >
              <Tab
                icon={<HomeIcon />}
                label="Blogs"
                LinkComponent={Link}
                to="/blogs"
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                icon={<PersonIcon />}
                label="My Blogs"
                LinkComponent={Link}
                to="/my-blogs"
                sx={{ fontWeight: "bold" }}
              />
              <Tab
                icon={<NoteAddIcon />}
                label="Create Blog"
                LinkComponent={Link}
                to="/create-blog"
                sx={{ fontWeight: "bold" }}
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" alignItems="center" marginLeft="auto">
          {!isLogin ? (
            <>
              <Button
                sx={{
                  margin: 1,
                  color: "#ECF0F1",
                  border: "1px solid #BDC3C7",
                  borderRadius: "20px",
                  "&:hover": {
                    bgcolor: "#34495E",
                    borderColor: "#BDC3C7",
                  },
                }}
                LinkComponent={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{
                  margin: 1,
                  color: "#ECF0F1",
                  border: "1px solid #BDC3C7",
                  borderRadius: "20px",
                  "&:hover": {
                    bgcolor: "#34495E",
                    borderColor: "#BDC3C7",
                  },
                }}
                LinkComponent={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              sx={{
                margin: 1,
                color: "#ECF0F1",
                border: "1px solid #BDC3C7",
                borderRadius: "20px",
                "&:hover": {
                  bgcolor: "#C0392B",
                  borderColor: "#BDC3C7",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
