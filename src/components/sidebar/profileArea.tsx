import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import PrIcon from '../common/PrIcon/PrIcon';
import PrIconV2 from '../common/PrIcon/PrIconV2';

const ProfileArea = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const anchorRef = React.useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen((prevOpen) => !prevOpen);
    };

    const handleLogout = () => {
        Cookies.remove('x-access-token');
        router.push('/');
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <div className="w-full h-[7rem] bg-white flex relative">
            <div
                className='w-[13rem] h-[4rem] mt-3 ml-auto mr-3 mb-3 rounded-full bg-[#EDF3FF] flex cursor-pointer'
                ref={anchorRef}
                onClick={toggleDropdown}
            >
                <IconButton
                    color="primary"
                    aria-label="account"
                    aria-controls={isDropdownOpen ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                >
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
                <div className='ml-2'>
                    <label className='text-black font-semibold text-[18px] p-1 mt-2'>Username</label><br />
                    <label>user@gmail.com</label>
                </div>
            </div>
            <Popper
                open={isDropdownOpen}
                anchorEl={anchorRef.current}
                transition
                placement='bottom'
                disablePortal
                style={{ zIndex:'999' }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={closeDropdown}>
                        <Fade {...TransitionProps}>
                            <Box className='w-48 mt-2'>
                                <Paper elevation={6}>
                                    <ul className='py-2'>
                      
                                        <li className='px-4 py-2 cursor-pointer hover:bg-blue-100 flex flex-row space-x-2 text-lg'>
                                            <PrIconV2 name={`AccountCircle`}/>
                                            <div>Profile</div>
                                        </li>
                                        <li className='px-4 py-2 cursor-pointer hover:bg-blue-100  flex flex-row space-x-2'>
                                        <PrIconV2 name={`Settings`}/>
                                            <div>Settings</div>
                                        </li>
                                        <li className='px-4 py-2 cursor-pointer hover:bg-blue-100 flex flex-row space-x-2' onClick={handleLogout}  >
                                            
                                        <PrIconV2 name={'Logout'}/>
                                            <div>Logout</div>
                                            
                                            </li>
                                    </ul>
                                </Paper>
                            </Box>
                        </Fade>
                    </ClickAwayListener>
                )}
            </Popper>
        </div>
    );
};

export default ProfileArea;
