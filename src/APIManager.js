
const APIManager = Object.create({}, {

    //gett
    getUserByUserName: {
        value: (userName) => {
            return fetch(`http://localhost:5002/users?userName=${userName}`)
                .then(e => e.json())
        }
    },
    getIdOfCurrentUser: {
        value: () => {
        const databaseString = localStorage.getItem("credentials")
        const currentUserObject = JSON.parse(databaseString)
        // console.log("User stuff", currentUserObject)
        return currentUserObject.currentUserId
        }
    },
    gettingAllMealsFromDatabase: {
        value: () => {
            return fetch("http://localhost:5002/meals?userId=1")
                .then(e => e.json())
        }
    },
    addMeal: {
        value: (newObject) => {
            return fetch("http://localhost:5002/meals", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            })
                // When POST is finished, retrieve the new list of tasks   
                .then(a => a.json())
        }
    },
    deleteMeal: {
        value: (mealId) => {
            // Delete the specified meal
            return fetch(`http://localhost:5002/meals/${mealId}`, {
                method: "DELETE"
            })
                // When DELETE is finished, retrieve the new list of meals
                .then(() => {
                    // Remember you HAVE TO return this fetch to the subsequenet `then()`
                    return fetch("http://localhost:5002/meals")
                })
                // Once the new array of animals is retrieved, set the state
                .then(a => a.json())
        }
    },
})

export default APIManager