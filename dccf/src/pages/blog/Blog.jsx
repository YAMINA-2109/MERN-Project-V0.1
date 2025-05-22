import React from 'react';
import PostCard from '../../components/posts/PostCard';
import PostCard2 from '../../components/posts/PostCard2';
import { Box, Container, Grid } from '@mui/material';
const Blog = () => {
  return (
    <>
    <Box sx={{bgcolor: '#fafafa', minHeight:'100vh', mt:'100px'}}>
      <Container sx={{pt: 5, pb: 5, minHeight: '83vh'}}>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            <Grid item xs={2} sm={4} md={4}>
              <PostCard />
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <PostCard2 />
            </Grid>
            
          </Grid>
        </Box>
      </Container>
    </Box>
      
    </>
  )
}

export default Blog
