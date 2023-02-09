import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, MenuItem, Modal, Button } from '@mui/material';
import { useParams } from 'react-router-dom';




export default function Buy() {
    const { key } = useParams()
    const [prod, setProd] = React.useState([]);

    React.useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${key}`)
            .then(res => res.json())
            .then(json => setProd(json))
    }, [])
    // console.log(prod)
    // const [pricing, setPricing] = React.useState('')
    return (
        <>
            <h1 style={{ textAlign: "center", fontSize: '25px' }}>Address</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        // id="outlined-required"
                        label="Name"
                    // defaultValue=""
                    />

                    <TextField
                        // id="outlined-password-input"
                        label="House Number"
                        type="text"
                    // autoComplete=""
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Village/Town"
                        // defaultValue=""
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        // id="outlined-number"
                        label="District and State"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField id="outlined-search" label="Search field" type="search" />
                    <TextField
                        id="outlined-helperText"
                        label="Mobile Number"
                        defaultValue=""
                        helperText=""
                    />
                </div>
                <h1 style={{ textAlign: "center", fontSize: '25px' }}>Product Details</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value='Size'
                        label="Size"
                    // onChange={handleChange}
                    >
                        <MenuItem value='S'>S</MenuItem>
                        <MenuItem value='M'>M</MenuItem>
                        <MenuItem value='L'>L</MenuItem>
                    </Select>
                    <h1 style={{ textAlign: "center", fontSize: '25px', fontStyle: 'italic' }}> Price: {prod.price}</h1>
                    {/* <h1 style={{ textAlign: "center", fontSize: '20px', fontStyle: 'italic' }}> Rating: {prod.rating.rate}/{prod.rating.total}</h1> */}
                    <button style={{ height: '50px', backgroundColor: 'rgb(25 118 210)' }} onClick={() => alert('Order has been Confirmed')}>Place Order</button>
                </FormControl>
            </Box>
        </>
    );
}
















