import React, {useState} from 'react';
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '/src/state';
import profileImage from '/src/assets/profile.jpeg'
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';
const Navbar = ({
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const dispatch = useDispatch();
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event)=> setAnchorEl(event.currentTarget)
    const handleClose = ()=>setAnchorEl(null);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const handelLogeOut = async()=>{
        
        try {
            await newRequest.get('/logout');
            localStorage.setItem("currentUser", null);
            // navigate('/')
            navigate('/login');
          } catch (error) {
            console.log(error);
          }
    }

  return (
        <AppBar
            sx = {{
                position:"static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar sx = {{justifyContent: "space-between"}}>
                {/* LEFT SIDE */}
                <FlexBetween>
                    <IconButton onClick = {()=>setIsSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon/>
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.alt}
                        borderRadius="9px"
                        gap="3rem"
                        p="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
                {/* RIGHT SIDE */}
                <FlexBetween gap = "1.5rem">
                    <IconButton onClick = {()=>dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{ fontSize: "25px"}}/>
                        ): (
                            <LightModeOutlined sx={{ fontSize: "25px"}}/>
                        )}
                        
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px"}}/>
                    </IconButton>

                    <FlexBetween>
                        <Button onClick={handleClick} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem"}}>
                            <Box
                                component="img"
                                alt="profile"
                                src={user.photo}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                            />
                            <Box textAlign="left">
                                    <Typography
                                    fontWeight="bold"
                                    fontSize="0.85rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                    >
                                    {user.name}
                                    </Typography>
                                    <Typography
                                    fontSize="0.75rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                    >
                                    {user.prénom}
                                    </Typography>
                                </Box>
                                <ArrowDropDownOutlined sx={{color: theme.palette.secondary[300], fontSize: '25px'}}/>
                        </Button>
                        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                            <MenuItem  onClick={handleClose}>
                                <Button
                                    sx={{
                                        color:'#fff',
                                        fontWeight:600,
                                    }}
                                    onClick={handelLogeOut}
                                >Loge Out</Button>
                            </MenuItem >
                        </Menu>
                    </FlexBetween>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
