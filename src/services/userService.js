

export const getUsers = () => {
    fetch("http://localhost:3000/users")
        .then(response => console.log(response))
}