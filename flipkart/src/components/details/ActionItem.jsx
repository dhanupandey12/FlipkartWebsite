import {Box, Button, styled} from "@mui/material"
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useDispatch } from 'react-redux';


import { addToCart } from "../../redux/actions/cartAction";
import { payUsingPaytm } from "../../service/api";
import { post } from '../../utils/paytm';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}));

const Image = styled('img')({
    width : '90%',
    padding: '15px'

})

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    borderRadius: 2,
    height: 50,
    [theme.breakpoints.down('lg')]: {
        width: '46%'
    },
    [theme.breakpoints.down('lg')]: {
        width: '48%'
    }
    
}));;

const ActionItem = ({product}) =>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = product;
    const [quantity, setQuantity] = useState(1);

    const addItemToCart = () => {
         dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    const buyNow = async () => {
         let response = await payUsingPaytm({amount : 500, email:'dhanu@gmail.com'})
         let information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response  
         }
         post(information);
    }
 
    return (
        <LeftContainer>
              <Box style={{padding : '15px 20px', border : '1px solid #f0f0f0'}}>
              <Image src={product.detailUrl} alt="productdetail" />
              </Box>
           
            <StyledButton style={{marginRight: 10, background: '#ff9f00'}} onClick={() => addItemToCart()}  variant="contained"><Cart />Add to cart</StyledButton>
            <StyledButton  onClick = {() => buyNow()} style={{background: '#fb641b'}} variant="contained"><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;