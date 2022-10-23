
const generator = () => {
    const pattern = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    let id = '';
    for (let i = 0; i < 5; i++){
        id += pattern.charAt(Math.floor(Math.random() * pattern.length))
    }
    return id
}
export default generator;