import React, { useState } from 'react';

const users = ['Patrick Chapple', 'Chantil Ferber', 'Scott Chapple'];

export default function RSVP() {
  const [names, setNames] = useState(['']);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedNames = [...names];
    updatedNames[index] = event.target.value;
    setNames(updatedNames);
  };

  const handleAddName = () => {
    setNames([...names, '']);
  };

  const handleRemoveName = (index: number) => {
    const updatedNames = [...names];
    updatedNames.splice(index, 1);
    setNames(updatedNames);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log('Names:', names);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8 text-primary">RSVP Page</h1>
      <form onSubmit={handleSubmit} className="mt-8">
        {names.map((name, index) => (
          <div className="mb-4" key={index}>
            <label htmlFor={`name${index}`} className="block text-lg">
              Name {index + 1}:
            </label>
            <div className="flex">
              <input
                type="text"
                id={`name${index}`}
                value={name}
                onChange={(event) => handleNameChange(event, index)}
                className="px-4 py-2 border border-gray-300 rounded"
                required
                autoComplete={`name-${index}`}
                list={`name-options-${index}`}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveName(index)}
                  className="bg-red-500 text-white py-2 px-4 rounded ml-2"
                >
                  Remove
                </button>
              )}
            </div>
            {name && (
              <datalist id={`name-options-${index}`}>
                {users
                  .filter((user) =>
                    user.toLowerCase().includes(name.toLowerCase())
                  )
                  .map((user, suggestionIndex) => (
                    <option key={suggestionIndex} value={user} />
                  ))}
              </datalist>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddName}
          className="bg-secondary text-white py-2 px-4 rounded"
        >
          Add Another Person
        </button>
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded mt-4"
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
}


