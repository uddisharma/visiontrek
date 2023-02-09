import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardActionArea from '@mui/material/CardActionArea';
export default function ImgMediaCard() {
    const { id } = useParams();
    const [prod, setProd] = React.useState([]);
    const [prods, setProds] = React.useState([]);
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
    React.useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(json => setProd(json))
    }, [])
    return (
        <div style={{ backgroundColor: 'rgb(25 118 210)' }}>
            <Card style={{ display: 'block', margin: 'auto' }} sx={{ maxWidth: "80%" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="340"
                    image={prod.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {prod.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {prod.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"> Price: {prod.price}</Button>
                    <Link to={`/${prod.id}/${prod.id}`}>
                        <Button backgroundColor="rgb(25 118 210)" size="small">Buy Now</Button>
                    </Link>
                </CardActions>
            </Card> <br /> <br />
            {prods.map((e) => (


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