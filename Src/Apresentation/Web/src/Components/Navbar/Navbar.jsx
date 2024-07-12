import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    const Navlinks = () => {
        return (
            <>
                <NavLink to="/">Network</NavLink>
                <NavLink to="/">Media</NavLink>
                <NavLink to="/">Empresas</NavLink>
            </>
        )
    }

   

    return (
        <>
            <header className="flex justify-between px-12 items-center py-6 bg-state-50 border-b-2 border-gray-500">
                <img src="https://i.postimg.cc/vB5MHPX1/DaeLink.png" className=' max-sm-logo w-40' />

                <nav className=" flex items-center gap-4">
                    <div className=" hidden md:flex items-center gap-4">
                        <Navlinks></Navlinks>

                    </div>
                    <IoSearch className='text-black text-2xl cursor-pointer iconhover' />
                    <Link to="/profile">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4V3cocSdopo5hP0mkgdw0NXemc_BRakHZOQ&s" className='w-8 h-8 rounded-full imgborder' alt="Profile" />
                    </Link>
                    <div className="flex  md:hidden">
                        <button onClick={toggleNavbar}>{isOpen ? <IoCloseOutline className='text-black text-2xl cursor-pointer' /> : <FiMenu className='text-black text-2xl cursor-pointer' />}</button>

                    </div>
                </nav>
            </header>
            <hr className="hr-bg h-2"></hr>
            {isOpen && (
                <div className=" md:hidden flex basis-full flex-col items-center gap-3 z-50 bg-state-50" >
                    <Navlinks></Navlinks>
                </div>
            )}
        </>
    );
}
