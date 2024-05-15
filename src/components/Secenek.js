import React, { useState } from 'react';

const Secenek = () => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Radio Buton Formu</h2>

        <form>
          <div className="mb-4">
            <input
              type="radio"
              id="option1"
              name="options"
              value="option1"
              checked={selectedOption === 'option1'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option1">Seçenek 1</label>
          </div>

          <div className="mb-4">
            <input
              type="radio"
              id="option2"
              name="options"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option2">Seçenek 2</label>
          </div>

          <div className="mb-4">
            <input
              type="radio"
              id="option3"
              name="options"
              value="option3"
              checked={selectedOption === 'option3'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="option3">Seçenek 3</label>
          </div>

          <button
            type="button"
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Secenek;
