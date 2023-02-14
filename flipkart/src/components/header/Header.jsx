import React from "react";
import { useState } from 'react';
import { AppBar, Toolbar, Box, styled, IconButton, Drawer, List, Typography } from "@mui/material";
import {Link} from 'react-router-dom';
import { Menu } from '@mui/icons-material';
//Components;
import Search from "./Search";
import CustomBottons from "./CustomBottons";


const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55x;
`;
const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  text-decoration: none;
  color: inherit;
`;
const Subheading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

const Plusimage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

const CustomBottonWrapper = styled('span')(({ theme }) => ({ 
  margin: '0 5% 0 auto', 
  [theme.breakpoints.down('sm')]: {
      display: 'none'
  }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
      display: 'block'
  }
}));

export default function Header() {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
      <Box style={{ width: 200 }} onClick={handleClose}>
          <List>
              <listItem button>
                  <CustomBottons />
              </listItem>
          </List>
      </Box>
  );

  return (
    <div>
      <StyledHeader>
        <Toolbar style={{ minHeight: 55 }}>
        <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>
                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>
          <Component to='/'>
            <img src={logoURL} alt="Logo" style={{ width: 75 }} />
            <Box style={{ display: "flex" }}>
              <Subheading>
                Explore&nbsp;
                <Box component="span" style={{ color: "#FFE500" }}>
                  {" "}
                  Plus{" "}
                </Box>{" "}
              </Subheading>
              <Plusimage src={subURL} alt="subURL" />
            </Box>
          </Component>
          <Search />
          <CustomBottonWrapper>
            <CustomBottons />
          </CustomBottonWrapper>
        </Toolbar>
      </StyledHeader>
    </div>
  );
}
