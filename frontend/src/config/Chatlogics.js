export const getsender = (loggeduser , users) => {
    return users[0]._id === loggeduser._id ? users[1]._id : users[0].name;
}