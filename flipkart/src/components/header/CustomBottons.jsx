import React from "react";
import { Box, Button, Typography, styled, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useSelector } from 'react-redux';

import LoginDialog from "../Login/LoginDialog";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";

// const Wraper = styled(Box)`
//   display: flex;
//   margin: 0 3% 0 auto;
//   & > button,
//   & > p,
//   & > div {
//     margin-right: 40px;
//     font-size: 14px;
//     align-items: center;
//   }
// `;
const Wraper = styled(Box)(({ theme }) => ({
  margin: '0 3% 0 auto',
  display: 'flex',
  '& > *': {
      marginRight: '40px !important',
      textDecoration: 'none',
      color: '#FFFFFF',
      fontSize: 12,
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
          color: '#2874f0',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 10
      }
  },
  [theme.breakpoints.down('sm')]: {
      display: 'block'
  }
}));

const Container = styled(Link)(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  color: 'inherit',
  [theme.breakpoints.down('sm')]: {
      display: 'block'
  }
}));

const LoginButton = styled(Button)`
  color: #2874f0;
  background: #ffffff;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
  margin-left: 40px;
`;
export default function CustomBottons() {
  const { account, setAccount } = useContext(DataContext);

  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };

  const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

  return (
    <Wraper>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton
          variant="contained"
          onClick={() => {
            openDialog();
          }}
        >
          Login
        </LoginButton>
      )}

      <Typography style={{ marginTop: 3, width: 135 }}>
        Become a Seller
      </Typography>
      <Typography style={{ marginTop: 3 }}>More</Typography>
      <Container to='/cart'>
      <Badge badgeContent={cartItems?.length} color="secondary">
        <ShoppingCartIcon />
        </Badge>
        <Typography style= {{margin : 10}}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wraper>
  );
}
