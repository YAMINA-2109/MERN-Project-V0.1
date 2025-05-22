import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import {services} from '../../assets/index.js'



const PostCard = ()=> {
    return (
    <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          
          title="titre du poste"
          subheader="Aout 14, 2023"
        />
        <Link to={''}>
            <CardMedia
            component="img"
            height="194"
            image={services}
            alt="Paella dish"
            />
        </Link>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions>
            <Box sx={{width: '100%', display:'flex', justifyContent: 'space-between'}}>
                <Box>
                    <IconButton aria-label="add to favorites">
                    <FavoriteBorderIcon sx={{color: 'red'}}/>
                    </IconButton>
                    2 Like(s)
                </Box>
                <Box>
                    <IconButton aria-label="share">
                        <CommentIcon/>
                    </IconButton>
                </Box>
            </Box>
        </CardActions>
    </Card>
    );
  }

export default PostCard ;