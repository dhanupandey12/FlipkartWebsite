import React from "react";
import { useState, useEffect } from 'react';
import { InputBase, Box, List, ListItem, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from "../../redux/actions/productActions";
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
  background: #fff;
  width: 38%;
  border-radius: 2px;
  margin-left: 10px;
  display: flex;
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
  font-size: unset;
`;
const SearchiconWrapper = styled(Box)`
  color: blue;
  padding: 5px;
  display: flex;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;

export default function Search() {
  
  const [ text, setText ] = useState();
  const [ open, setOpen ] = useState(true)

  const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

  const getText = (text) => {
    setText(text);
    setOpen(false)
}

  return (
    <SearchContainer>
      <InputSearchBase placeholder="search for products brand and more" 
       onChange={(e) => getText(e.target.value)}
       value = {text}
      />
      <SearchiconWrapper>
        <SearchIcon />
      </SearchiconWrapper>
      {
              text && 
              <ListWrapper hidden={open}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem>
                      <Link 
                        to={`/product/${product.id}`} 
                        style={{ textDecoration:'none', color:'inherit'}}
                        onClick={() => setOpen(true) } 
                        
                      >
                        {product.title.longTitle}
                      </Link>
                    </ListItem>
                  ))
                }  
              </ListWrapper>
            }
    </SearchContainer>
  );
}
