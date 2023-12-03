import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from 'react-sidebar';
import './index.css';

const SideMenu = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const onSetSidebarOpen = (open) => {
        setSidebarOpen(open);
    };

    return (
        <Sidebar
            sidebar={
                <div className="side-menu">
                    <ul>
                        <li>
                            <Link to="/" onClick={() => onSetSidebarOpen(false)}>
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" onClick={() => onSetSidebarOpen(false)}>
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            }
            open={sidebarOpen}
            onSetOpen={onSetSidebarOpen}
        >
            <div className="menu-icon" onClick={() => onSetSidebarOpen(true)}>
                <FaBars />
            </div>
        </Sidebar>
    );
};

export default SideMenu;
