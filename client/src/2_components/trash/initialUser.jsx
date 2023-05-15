import React from 'react';
import Button from "../../1_ui/button";
import authService from "../../servises/auth.service";

function InitialUser() {

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const arr = numbers.map(item => {
        return {
            name: 'Alex_' + item,
            email: `alex${item}@gmail.com`,
            password: "123456789",
        }
    })

    const func = async () => {
        for (const item of arr) {
            try {
                await authService.register(item);
                console.log(`Рождён ` + item.name)
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <Button name={'Initial'} onClick={func}/>
        </div>
    );
}

export default InitialUser;