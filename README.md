# Notes App

This is a simple notes app which i built using React. There are multiple versions of this app; a basic one without a backend, one with a backend API, and one which makes use of various hooks like useEffect(), useContext() and useCallback().

# Tweaks to part 2 of this project

- Install json-server using the command `npm i json-server`
- Create a `db.json` file to store data
- Open `package.json` to create a command to run json server. Ensure the "scripts": looks like this:

 ```
 "scripts": {
    "start": "react-scripts start",
    "server" :"json-server -p 3001 --watch db.json",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ```

- Run the server in another window/tab using the command `npm run server`.
Resources should run at http://localhost:3001/notes and the home route is http://localhost:3001


- Install a VS Code extension called REST Client. That will help you make requests to the API from VS Code itself.
- Have a play around with the api.http file and make some requests.

#### PRO TIP:
1. Variation 1: Using an empty array as the second argument of useEffect()
 ``` 
 useEffect(()=>{
    console.log("Called only once")
  },[]);  
  ```

  calls the function once and never again.
  
  2. Variation 2: Omitting the second argument of useEffect()


 ```
useEffect(()=>{
    console.log("Called on every rerender")
  });
  ```

  is called on every rerender.

3. Variation 3: Using a particular state variable as the second argument of useEffect()

```
useEffect(()=>{
    console.log("Counter One changed")
  },[counterOne]);
  ```

  is called everytime the state of counterOne is changed.
  
4. Variation 4: Combining the state variables as the second argument of useEffect()

 ``` 
useEffect(()=>{
    console.log("Counter One or Counter Two changed")
  },[counterOne,counterTwo]);
  ```

  is called everytime the state of counterOne or counterTwo is changed.

  References: https://codepen.io/sgrider/pen/BarEowz

# Back to useEffect

Upon every re-render, a new (different) variable with the same name and the correct value gets reassigned in memory.

```
import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    document.body.onclick = () => {
      console.log(counter);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>+ Increment</button>
      <div>Count: {counter}</div>
    </div>
  );
}

export default App;

```
Here, the counter variable is getting updated, but 0 is always getting console logged. Thisis because the values of the state variable `counter` and the one that is getting rerendered thanks to the `useEffect` are inconsistent. This is known as **stale variable reference**.
It is possible anytime your useEffect contains a function referring to a variable.

Even though the following may be a solution:

```
useEffect(() => {
    document.body.onclick = () => {
      console.log(counter);
    };
  }, [counter]);

```
a brand new function is created which refers to the state variable in memory. Don't just blindly follow ESLint's rule because it may lead to bugs.


Reference: https://codesandbox.io/s/hungry-fog-0ev1ec

# useCallBack() hook
A hook that returns the function ou put in the first parameter, it is a reference to the exact same function in the memory.

The behaviour is different after the first render. If second argument is an empty array, it gives you the original function from first render. If the second argument has elements that have changed since last render, useCallback gives you the new version of that function.

#### useEffect tips:
- Cannot return numbers or strings.
```
function App(){
  useEffect(()=>{
    return 'Hello'
  },[])
}
```
- Cannot use async/await
```
function App(){
  useEffect(async()=>{
    const res=await axios.get(<link>)
  },[])
}
```
- Can return a function

```
function App(){
  useEffect(()=>{
    return ()=>{
      console.log("Hi")
    }
  },[])
}
```

# The purpose behind cleanup functions

Consider this code snippet.

```
import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    // document.body.onclick = () => {
    //   console.log(counter);
    // };

    const listener = () => {
      console.log(counter);
    };

    document.body.addEventListener("click", listener);

    const cleanUp = () => {
      console.log("Clean up!");
    };
    return cleanUp;
  }, [counter]);

  //Cleanup will only be called if the arrow func (of useEffect) will be called again

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>+ Increment</button>
      <div>Count: {counter}</div>
    </div>
  );
}

export default App;
```

When you click the button, it console logs the values all the way from 0 to the current count value. This is because even the listener function is being recreated with change in state. This is why we need to clean up the last event handler.

Fix:

```
const cleanUp = () => {
      console.log("Clean up!");
      document.body.removeEventListener("click", listener);
    };
```