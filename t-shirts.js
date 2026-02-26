const tshirts = [
  { title: 'Blue T-Shirt', image: 'Images/blue-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { title: 'Bright Purple T-Shirt', image: 'Images/bright-purple-t-shirt.jpg', price: 5.99, stock: 1, quantity: 1 },
  { title: 'Cobalt Blue T-Shirt', image: 'Images/cobalt-blue-t-shirt.jpg', price: 9.99, stock: 5, quantity: 1 },
  { title: 'Green T-Shirt', image: 'Images/green-t-shirt.jpg', price: 6.99, stock: 0, quantity: 1 },
  { title: 'Grey T-Shirt', image: 'Images/grey-t-shirt.jpg', price: 4.99, stock: 2, quantity: 1 },
  { title: 'Light Green T-Shirt', image: 'Images/light-green-t-shirt.jpg', price: 7.99, stock: 4, quantity: 1 },
  { title: 'Purple T-Shirt', image: 'Images/purple-t-shirt.jpg', price: 7.99, stock: 0, quantity: 1 },
  { title: 'Red T-Shirt', image: 'Images/red-t-shirt.jpg', price: 6.99, stock: 3, quantity: 1 },
  { title: 'Teal T-Shirt', image: 'Images/teal-t-shirt.jpg', price: 7.99, stock: 2, quantity: 1 }
]

function TShirt(props) {

  const shirt = props.shirt

  function handleQuantityChange(e) {
    props.onQuantityChange(shirt.title, Number(e.target.value))
  }

  function handleBuy() {
    props.onBuy(shirt.title)
  }

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px", width: "200px" }}>
      
      <h3>{shirt.title}</h3>

      <img 
        src={shirt.image} 
        alt={shirt.title} 
        style={{ width: "150px" }}
      />

      <p>Price: ${shirt.price.toFixed(2)}</p>

      <p>Remaining Stock: {shirt.stock}</p>

      {shirt.stock === 0 && <p><strong>Out of Stock</strong></p>}

      {shirt.stock > 0 && (
        <div>
          <select value={shirt.quantity} onChange={handleQuantityChange}>
            {
              [...Array(shirt.stock)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))
            }
          </select>

          <button onClick={handleBuy}>
            Buy
          </button>
        </div>
      )}

    </div>
  )
}

function App() {

  const [products, setProducts] = React.useState(tshirts)

  function handleQuantityChange(title, newQuantity) {
    setProducts(prev =>
      prev.map(shirt =>
        shirt.title === title
          ? { ...shirt, quantity: newQuantity }
          : shirt
      )
    )
  }

  function handleBuy(title) {
    setProducts(prev =>
      prev.map(shirt =>
        shirt.title === title
          ? { ...shirt, stock: shirt.stock - shirt.quantity }
          : shirt
      )
    )
  }

  return (
    <div>
      <h1>T-Shirt Store</h1>

      {products.map(shirt => (
        <TShirt
          key={shirt.title}
          shirt={shirt}
          onBuy={handleBuy}
          onQuantityChange={handleQuantityChange}
        />
      ))}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)