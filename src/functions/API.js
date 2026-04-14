export const getItems = async () => {
    const response = await fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => data)
    return response;
}