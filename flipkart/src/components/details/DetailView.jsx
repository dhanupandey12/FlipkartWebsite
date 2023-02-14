import { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import {Box, Typography, Grid, styled} from '@mui/material';
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";

const Component = styled(Box)`
     background : #f2f2f2;
     margin-top : 55px;
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Rightcontainer = styled(Grid)
`
margin-top: 50px;

`

const DetailView = () => {

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    
    const dispatch = useDispatch();
    const {id}   = useParams();
   const {loading, product}  = useSelector((state) => state.getProductDetails)
    //const { products}  = useSelector(state => state.getProducts)

    
    
    //console.log("product1",product, loading, id);
    // useEffect(() => {
    //     if(product && id !== product.id)
    //     dispatch(getProductDetails(id))
    // }, [dispatch, id, product, loading])
    
    useEffect(() => { 

        dispatch(getProductDetails(id));
         
        // if(product && id !== product.id)
        // {
        //   dispatch(getProductDetails(id));
        // }
        
    }, [dispatch, id]);
     
    //console.log("product",product, loading, id);
    return (
        <Component>  

            {     
                product && Object.keys(product).length &&
                <Container container>
                    <Grid item lg = {4} md = {4} sm = {8} xs = {12}>
                     <ActionItem product = {product}/>
                    </Grid>
                    <Rightcontainer item lg = {8} md = {8} sm = {8} xs = {12}>
                    <Typography>{product.title.longTitle}</Typography>
                    <Typography style={{marginTop: 5, color: '#878787', fontSize: 14}}> 8 ratings & 1 review  
                      <Box component='span'>
                      <img src={fassured}  style= {{width: 77, marginLeft: 20}} alt="" />
                      </Box>
                      </Typography>
                      <Typography>
                            <span style={{ fontSize: 28 }}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>{product.price.discount} off</span>
                        </Typography>
                        <ProductDetail product = {product}/>
                    </Rightcontainer>
                </Container>
            }
        </Component>
    )
}


export default DetailView