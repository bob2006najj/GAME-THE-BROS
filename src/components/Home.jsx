import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'remixicon/fonts/remixicon.css';
import logo from '../assets/the-bros-logo edit.png';
import heroBg from '../assets/buger bro.PNG';
import menuData from '../content/MenuChicken.json';
import meatMenudata from '../content/MenuMeat.json';    
import smashedMenudata from '../content/MenuSmashed.json';

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    const goToGame = () => {
        navigate('/game');
        setIsOpen(false);
    };

    return (
        <>
            <div className="navbar_container">
                <div className="navbar">
                    <img src={logo} alt="The Bros Logo" />
                    <h1>THE BROS</h1>
                
                    <button className="menu-btn" onClick={toggleMenu}>
                        <i className="ri-menu-line"></i>
                    </button>
                
                    <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                        <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
                        <li><a href="#chicken-menu" onClick={() => scrollToSection('chicken-menu')}>Chicken Menu</a></li>
                        <li><a href="#meat-menu" onClick={() => scrollToSection('meat-menu')}>Meat Menu</a></li>
                        <li><a href="#smashed-menu" onClick={() => scrollToSection('smashed-menu')}>Smashed Menu</a></li>
                        <li><button onClick={goToGame} className="nav-game-btn">Play Game</button></li>
                    </ul>
                </div>
            </div>

            <div id='home' className="hero-div" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="hero-content">
                    <h1>Welcome to the paradise burger</h1>
                    <button onClick={goToGame} className="hero-btn">Play & Win</button>
                </div>
            </div>

            <div id='chicken-menu' className="chicken-menu-section">
                <h2>Chicken Menu</h2>
                <div className="chicken-menu-grid">
                    {menuData.map((item) => (
                        <div key={item.id} className="chicken-menu-card">
                            <div className="chicken-card-image">
                                <img src={logo} alt={item.name} />
                            </div>
                            <div className="chicken-card-content">
                                <h3>{item.name}</h3>
                                <p className="chicken-price">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id='meat-menu' className="chicken-menu-section">
                <h2>Meat Menu</h2>
                <div className="chicken-menu-grid">
                    {meatMenudata.map((item)=>(
                        <div key={item.id} className="chicken-menu-card">
                            <div className="chicken-card-image">
                                <img src={logo} alt={item.name} />
                            </div>
                            <div className="chicken-card-content">
                                <h3>{item.name}</h3>
                                <p className="chicken-price">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div id='smashed-menu' className="smashed-menu-section">
                <h2>Smashed Menu</h2>
                <div className="smashed-menu-grid">
                    {smashedMenudata.map((item)=>(
                        <div key={item.id} className="smashed-menu-card">
                            <div className="smashed-card-image">
                                <img src={logo} alt={item.name} />
                            </div>
                            <div className="smashed-card-content">
                                <h3>{item.name}</h3>
                                <p className="smashed-price">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;