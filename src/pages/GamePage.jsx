import React from 'react';
import SpinnerGame from '../components/SpinnerGame';
import './GamePage.css';

const GamePage = () => {
    return (
        <div className="game-page">
            <div className="game-container">
                <h1>Spin & Win Game</h1>
                <p className="game-description">
                    Spin the wheel to win a random item from our menu! 
                    Each spin will give you one item from our chicken, meat, or smashed burger menu.
                </p>
                <SpinnerGame />
            </div>
        </div>
    );
};

export default GamePage;



