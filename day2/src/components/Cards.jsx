import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import styled from 'styled-components'
export default function Cards() {
    const [prod, setProd] = React.useState([]);
    React.useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProd(json))
    }, [])
    console.log(prod)


    const Wrapper = styled.div`
    padding: 4em;
    // background: papayawhip;
    // border: 1px solid red;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:20px
  `;

    return (
        <Wrapper >

            {prod.map((e) => (


                <Card sx={{ maxWidth: 345 }}>
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
                        <Button size="small" color="primary">
                            know more...
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Wrapper>
    );
}