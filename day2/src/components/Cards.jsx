import * as React from 'react';
import './Footer.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
export default function Cards() {
    const [prod, setProd] = React.useState([]);
    const [load, setLoad] = React.useState(false)
    React.useEffect(() => {
        setLoad(true)
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setLoad(false)
                setProd(json)
            })
    }, [])
    console.log(prod)


    const Wrapper = styled.div`
    padding: 4em;
    // background: papayawhip;
    // border: 1px solid red;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:20px
   @media (min-width:0px) and (max-width:480px) {
    border:2px solid red
   }
  `;
    if (load) {
        return
        <Skeleton variant="rectangular" width={210} height={118} />
    } else
        return (
            <div className='products' >

                {prod.map((e) => (


                    <Card sx={{ maxWidth: 345 }} key={e.id}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={e.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {e.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {e.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to={`/${e.id}`}>
                                <Button size="small" color="primary">
                                    know more...
                                </Button>
                            </Link>

                        </CardActions>
                    </Card>
                ))}
            </div>
        );
}