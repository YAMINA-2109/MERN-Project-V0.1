import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
// import { useGetAllusersQuery} from "/src/state/api";
import Header from "/src/components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { message } from "antd";
import axios from "axios";

const Allusers = () => {
  const theme = useTheme();
  const [cookie, setCookie] = useState();
  const [data , setData ] = useState();
  // console.log("data", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Nom",
      flex: 0.5,
    },
    {
      field: "prénom",
      headerName: "Prénom",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.6,
    },
    {
      field: "phone",
      headerName: "Numero Tel",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "pays",
      headerName: "Pays",
      flex: 0.5,
    },
    {
      field: "bio",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      flex: 0.5,
    },
    {
      field: "isAgent",
      headerName: "Agent",
      flex: 0.5,
    }
  ];

const getdata = async ()=>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        message.error("Vous ne pouvez pas prendre de rendez-vous ! Vous n'êtes pas authentifié !");
    }
    setCookie(JSON.parse(localStorage.getItem("currentUser")).token);
    const instance = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true
    });
    const cookies = {
        'access_token': cookie
    };
    const res = await instance.post('/api/users/getAllUsers', {},{
      headers: {
          Cookie: Object.entries(cookies).map(([key, value]) => `${key}=${value}`).join('; ')
      }
    })
    setData(res.data.users)
    console.log(res);
}
useEffect(() => {
  getdata()
},[]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Les Utilisateurs" subtitle="List des utilisateurs " />
      <Box
            mt="40px"
            height="75vh"
            sx={{
            "& .MuiDataGrid-root": {
                border: "none",
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
            },
            }}
        > 
            <DataGrid
                // loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
            />
        </Box>
    </Box>
  );
};

export default Allusers;