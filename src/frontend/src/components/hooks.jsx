//import { useState } from 'react'

//function App() {

 // const [count, setCount] = useState(0)

  //useEffect(() => { console.log('Count has changed!') }, [count])

  //return (
   // <div className="App">
    //  <p>Count is: {count}</p>

    //  <div>
      //  <button onClick={() => setCount(count+1)}>Add 1</button>
       // <button onClick={() => setCount(count-1)}>Decrease 1</button>

   //     <button onClick={() => setCount(count+10)}>Add 10</button>
      //  <button onClick={() => setCount(count-10)}>Decrease 10</button>

      //  <button onClick={() => setCount(0)}>Reset count</button>
   //   </div>
  //  </div>
 // )
//}

//export default App 








import { useState } from 'react'

export default function Counter() {

    const [count, setCount] = useState(0)

    const handleIncrement = () => {
        console.log('Increment button clicked');
        console.log('Current count before increment:', count);
        setCount(count + 1);
        console.log('Count after increment:', count + 1);
    }

    const handleDecrement = () => {
        console.log('Decrement button clicked');
        console.log('Current count before decrement:', count);
        setCount(count - 1);
        console.log('Count after decrement:', count - 1);
    }

    return (
        <div className="App">
            <button 
                onClick={() => {
                    console.log('Increment button clicked (inline)');
                    handleIncrement();
                }}
            >
                Increment
            </button>
            
            <button 
                onClick={() => {
                    console.log('Decrement button clicked (inline)');
                    handleDecrement();
                }}
            >
                Decrement
            </button>

            <h2>{count}</h2>
        </div>                    
    )
}