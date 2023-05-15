import React from 'react';

const TextField = () => {
    const handleChange = (e) => {
        console.log(e.target.value)
    }
    return (
        <>
            <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                Содержимое
            </label>
            <textarea
                onChange={(e) => handleChange(e)}
                id="content"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y resize  "
            />

            <textarea className="resize rounded-md"></textarea>

        </>
    );
};

export default TextField;
