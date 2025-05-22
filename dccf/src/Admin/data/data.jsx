import {HomeOutlined, LogoutOutlined, ProfileOutlined, UnorderedListOutlined, UserOutlined} from '@ant-design/icons';



export const SidebarMenu = [
    {
        id: 1,
        name: "Home",
        path: "/Homeadmin",
        icon: <HomeOutlined />,
    },
    {
        id: 2,
        name: "Rendez Vous",
        path: '/rendezVousAdmin',
        icon:<UnorderedListOutlined />,
    },
    {
        id: 3,
        name: "Utilisateurs",
        path: '/compteUtilisateurAdmin',
        icon: <UserOutlined />,
    },
    {
        id: 4,
        name: " Profile",
        path:'/profileAdmin',
        icon :<ProfileOutlined />
    },
    {
        id: 5,
        name: "Logout",
        path:'/LogoutAdmin',
        icon :<LogoutOutlined />
    }
]