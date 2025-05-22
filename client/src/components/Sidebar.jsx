import   React, { useEffect, useState } from 'react'
import {
    Box,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    formLabelClasses,
    useTheme
} from "@mui/material";
import {
    AccountCircleOutlined,
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    AdminPanelSettings,
    AdminPanelSettingsOutlined,
    SupportAgentOutlined
} from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from '/src/assets/profile.jpeg';
const adminNavItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined/>,
    },
    {
        text: "Comptes Utilisateurs",
        icon: null,
    },
    {
        text: "Utilisateurs",
        icon: <AccountCircleOutlined/>,
    },
    {
        text: "Gerer Les Publications",
        icon: null,
    },
    {
        text: "Publications",
        icon: <SupportAgentOutlined/>
    },
    {
        text: "AjouterPost",
        icon: <SupportAgentOutlined/>
    },
    {
        text: "Modifier-Post",
        icon: <SupportAgentOutlined/>
    },
    {
        text: "Demandes",
        icon: null
    },
    {
        text: "Aperçu",
        icon: <PointOfSaleOutlined/>
    },
    {
        text: "Journalier",
        icon: <TodayOutlined/>
    },
    {
        text: "Mensuel",
        icon: <CalendarMonthOutlined/>
    },
    {
        text: "Analyse Détaillée",
        icon: <PieChartOutlined/>
    },
    {
        text: "Gestion",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined/>
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined/>
    },
];
const agentNavItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined/>,
    },
    // {
    //     text: "Comptes Utilisateurs",
    //     icon: null,
    // },
    {
        text: "Rendez-Vous",
        icon: <AccountCircleOutlined/>,
    },
    {
        text: "Gestion des demandes",
        icon: null,
    },
    {
        text: "Attestations Cadastrales",
        icon: <SupportAgentOutlined/>
    },
    {
        text: "Livrets Fonciers",
        icon: <SupportAgentOutlined/>
    },
    {
        text: "Enquêtes Foncières",
        icon: <SupportAgentOutlined/>
    },
    {
        text: "ZNC",
        icon: <SupportAgentOutlined/>
    },
    {
        text: "Inconnu",
        icon: <SupportAgentOutlined/>
    },
    // {
    //     text: "Demandes",
    //     icon: <SupportAgentOutlined/>
    // },
    {
        text: "Mon compte",
        icon: null
    },
    {
        text: "Profile",
        icon: <PointOfSaleOutlined/>
    },
    // {
    //     text: "Journalier",
    //     icon: <TodayOutlined/>
    // },
    // {
    //     text: "Mensuel",
    //     icon: <CalendarMonthOutlined/>
    // },
    // {
    //     text: "Analyse Détaillée",
    //     icon: <PieChartOutlined/>
    // },
    // {
    //     text: "Gestion",
    //     icon: null
    // },
    // {
    //     text: "Admin",
    //     icon: <AdminPanelSettingsOutlined/>
    // },
    // {
    //     text: "Performance",
    //     icon: <TrendingUpOutlined/>
    // },
]
// const navItems = [
//     {
//         text: "Dashboard",
//         icon: <HomeOutlined/>,
//     },
//     {
//         text: "Comptes Utilisateurs",
//         icon: null,
//     },
//     {
//         text: "Agent",
//         icon: <AccountCircleOutlined/>,
//     },
//     {
//         text: "comptes",
//         icon: <SupportAgentOutlined/>
//     },
//     {
//         text: "Publications",
//         icon: <ReceiptLongOutlined/>
//     },
//     {
//         text: "Geography",
//         icon: <PublicOutlined/>
//     },
//     {
//         text: "Sales",
//         icon: null
//     },
//     {
//         text: "Overview",
//         icon: <PointOfSaleOutlined/>
//     },
//     {
//         text: "Daily",
//         icon: <TodayOutlined/>
//     },
//     {
//         text: "Monthly",
//         icon: <CalendarMonthOutlined/>
//     },
//     {
//         text: "Breakdown",
//         icon: <PieChartOutlined/>
//     },
//     {
//         text: "Management",
//         icon: null
//     },
//     {
//         text: "Admin",
//         icon: <AdminPanelSettingsOutlined/>
//     },
//     {
//         text: "Performance",
//         icon: <TrendingUpOutlined/>
//     },
// ]

const Sidebar = ({
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const [navItems, setNavItems] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const user = JSON.parse(localStorage.getItem("currentUser"))
    useEffect(()=>{
        if(user.isAdmin){
            setNavItems(adminNavItems);
        }else{
            setNavItems(agentNavItems);
        }
    },[user])
    useEffect(()=>{
        setActive(pathname.substring(1));
    }, [pathname]);
    return (
        <Box component= "nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={()=>setIsSidebarOpen(false)}
                    variant = "persistent"
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h4' fontWeight="bold">
                                        DCCF
                                    </Typography>
                                </Box>
                                {!isNonMobile &&(
                                    <IconButton onClick={()=>setIsSidebarOpen(!isSidebarOpen)
                                    }>
                                        <ChevronLeft/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({text, icon})=>{
                                if(!icon){
                                    return (
                                        <Typography Key={text} sx={{m:"2.25rem 0 1rem 3rem"}}>
                                            {text}
                                        </Typography>
                                    )
                                }
                                const lcText = text.toLowerCase().replace(/\s/g, '');
                                return(
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton onClick={()=>{
                                            navigate(`/${lcText}`);
                                            setActive(lcText);
                                        }}
                                        sx={{
                                            backgroundColor:
                                              active === lcText
                                                ? theme.palette.secondary[300]
                                                : "transparent",
                                            color:
                                              active === lcText
                                                ? theme.palette.primary[600]
                                                : theme.palette.secondary[100],
                                        }}
                                        >

                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                      active === lcText
                                                        ? theme.palette.primary[600]
                                                        : theme.palette.secondary[200],
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ml: "auto"}}/>
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                        <Box m="2rem 0rem 2rem 0rem">
                            <Divider />
                            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                                <Box
                                    component="img"
                                    alt="profile"
                                    src={user.photo}
                                    height="40px"
                                    width="40px"
                                    borderRadius="50%"
                                    sx={{ objectFit: "cover" }}
                                />
                                <Box textAlign="left">
                                    <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                    >
                                    {user.name}
                                    </Typography>
                                    <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                    >
                                    {user.prénom}
                                    </Typography>
                                </Box>
                                <SettingsOutlined
                                    sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px ",
                                    }}
                                />
                            </FlexBetween>
                        </Box> 
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar
