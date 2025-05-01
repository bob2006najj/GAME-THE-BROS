import React, { useState } from 'react';
import menuData from '../content/MenuChicken.json';
import meatMenudata from '../content/MenuMeat.json';
import smashedMenudata from '../content/MenuSmashed.json';
import './SpinnerGame.css';

function SpinnerGame() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activeMenu, setActiveMenu] = useState('chicken');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shuffledIngredients, setShuffledIngredients] = useState([]);

  const menuItems = {
    chicken: menuData,
    meat: meatMenudata,
    smashed: smashedMenudata
  };

  // Shuffle ingredients to randomize their positions
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const items = menuItems[activeMenu];
    const randomIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[randomIndex];
    
    const newRotation = rotation + 1800 + (randomIndex * (360 / items.length));
    setRotation(newRotation);
    
    // Shuffle ingredients when spinning
    const allIngredients = shuffleArray([
      ...(selectedItem.ingredients || []),
      'Extra Cheese',
      'Bacon',
      'Avocado',
      'Mushrooms',
      'Onion Rings',
      'Jalapeños',
      'BBQ Sauce',
      'Hot Sauce',
      'Mayonnaise',
      'Mustard'
    ]);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedItem(selectedItem);
      setShuffledIngredients(allIngredients);
      setShowQuiz(true);
      setShowResult(false);
      setSelectedIngredients([]);
      setIsCorrect(false);
    }, 4000);
  };

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      }
      return [...prev, ingredient];
    });
  };

  const checkAnswer = () => {
    if (!selectedItem || !selectedItem.ingredients) return false;
    
    const correctIngredients = selectedItem.ingredients;
    const hasAllCorrect = correctIngredients.every(ingredient => 
      selectedIngredients.includes(ingredient)
    );
    const noExtraIngredients = selectedIngredients.length === correctIngredients.length;
    
    const correct = hasAllCorrect && noExtraIngredients;
    setIsCorrect(correct);
    setShowResult(true);
    return correct;
  };

  const resetGame = () => {
    setSelectedItem(null);
    setShowQuiz(false);
    setSelectedIngredients([]);
    setShowResult(false);
    setIsCorrect(false);
    setRotation(0);
  };

  return (
    <>
      <div className="navbar_container">
        <nav className="navbar">
          <img src="/src/assets/the-bros-logo edit.png" alt="Logo" />
          <h1 style={{ color: '#FFD700' }}>Burger Quiz</h1>
          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/game" className="active">Game</a></li>
          </ul>
        </nav>
      </div>

      <div className="spinner-game-container">
        {!showQuiz ? (
          <>
            <div className="menu-selector">
              <button 
                className={activeMenu === 'chicken' ? 'active' : ''} 
                onClick={() => setActiveMenu('chicken')}
              >
                Chicken Menu
              </button>
              <button 
                className={activeMenu === 'meat' ? 'active' : ''} 
                onClick={() => setActiveMenu('meat')}
              >
                Meat Menu
              </button>
              <button 
                className={activeMenu === 'smashed' ? 'active' : ''} 
                onClick={() => setActiveMenu('smashed')}
              >
                Smashed Menu
              </button>
            </div>

            <div className="wheel-container">
              <div className="wheel-wrapper">
                <div 
                  className="wheel" 
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {menuItems[activeMenu].map((item, index) => {
                    const angle = (360 / menuItems[activeMenu].length) * index;
                    return (
                      <div
                        key={item.id}
                        className="wheel-section"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          background: `hsl(${angle}, 70%, 50%)`
                        }}
                      >
                        <div className="wheel-item-content">
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">${item.price}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="wheel-pointer"></div>
              </div>
              <button 
                className="spin-button" 
                onClick={handleSpin} 
                disabled={isSpinning}
              >
                {isSpinning ? 'Spinning...' : 'SPIN!'}
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-container">
            <div className="quiz-header">
              <h2>What's in your {selectedItem?.name}?</h2>
              <p className="quiz-instruction">Select all ingredients that are in this burger</p>
            </div>
            <div className="selected-item-preview">
              <h3>{selectedItem?.name}</h3>
              <p className="item-description">{selectedItem?.description}</p>
            </div>
            <div className="quiz-content">
              <div className="ingredients-list">
                {shuffledIngredients.map((ingredient, index) => (
                  <label key={index} className="ingredient-item">
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(ingredient)}
                      onChange={() => handleIngredientToggle(ingredient)}
                    />
                    <span>{ingredient}</span>
                  </label>
                ))}
              </div>
              
              {!showResult ? (
                <button 
                  className="check-answer-btn" 
                  onClick={checkAnswer}
                  disabled={selectedIngredients.length === 0}
                >
                  Check Answer
                </button>
              ) : (
                <div className="result-container">
                  <h3 className={isCorrect ? 'correct' : 'incorrect'}>
                    {isCorrect ? 'Correct! 🎉' : 'Not quite right. Try again! 😕'}
                  </h3>
                  <div className="correct-ingredients">
                    <h4>Correct ingredients for {selectedItem?.name}:</h4>
                    <ul>
                      {(selectedItem?.ingredients || []).map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="spin-again-btn" onClick={resetGame}>
                    Spin Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SpinnerGame;
