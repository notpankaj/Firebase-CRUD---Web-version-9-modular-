import { useEffect, useState, useRef } from 'react';
import { db } from './firebase';
import './App.css';
import { collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc } from '@firebase/firestore';







const Dot = ({ color }) => {
  const style = {
    height: 25,
    width: 25,
    margin: '0 10px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
  }
  return (
    <span style={style}></span>
  )
}

function App() {

  const [colors, setColors] = useState([])
  
  const colorNameRef = useRef('')
  const colorValueRef = useRef('')

  const colorNameEditRef = useRef('')
  const colorValueEditRef = useRef('')
  const colorEditPopup = useRef('')
  const colorUpdateBtn = useRef('')

  

  console.log(colors);


  const addColor = () => {
    const colorName = colorNameRef.current.value;
    const colorValue = colorValueRef.current.value;
    if(colorName && colorValue){

      const docRef =  addDoc(collection(db, "colors"), {
          name: colorName,
          value: colorValue
        });
    }

    colorNameRef.current.value = '';
    colorValueRef.current.value = '';
    
    
  }

  const deleteColor = (colorId) => {
    const result = deleteDoc(doc(db, "colors", colorId));
    // console.log(result);
  }


  const editColor = (colorId,colorName = '',colorValue = '' ) => {
    if(!colorId) return;

    colorUpdateBtn.current.dataset.colorId = colorId;

    colorNameEditRef.current.value = colorName;
    colorValueEditRef.current.value = colorValue;

    colorEditPopup.current.style.display = 'block';
  }

  const updateColor = () => {
    const colorEditId = colorUpdateBtn.current.dataset.colorId;
    if(colorEditId){

      const colorRef = doc(db, "colors", colorEditId);
      updateDoc(colorRef, {
        name: colorNameEditRef.current.value,
        value: colorValueEditRef.current.value
      });
      
      closeEditPopup();

    }else{
      closeEditPopup();
    }

    
       
  }
  
  
  const closeEditPopup = () => {
    colorNameEditRef.current.value = '';
    colorValueEditRef.current.value = '';
    
    colorUpdateBtn.current.removeAttribute('data-color-id');
    
    colorEditPopup.current.style.display = 'none';

  }

  //everytime it unmount whe have to unsub the listener 
  // useEffect(()=>{
  //   const unsub = onSnapshot(collection(db,'colors'),(snapshot)=>{
  //     console.log(snapshot.docs.map(doc => doc.data()));
  //   })
  //   return unsub;
  // },[])

  // HOTSHOT
  useEffect(() => onSnapshot(collection(db, 'colors'), (snapshot) => {
    setColors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id}) ));
  }), [])


  return (
    <div className="root">

      <section ref={colorEditPopup} style={{ border: '2px solid black', padding:'10px', display: 'none' }}>
      <button onClick={closeEditPopup} > closePOPUP </button>
      
      <input type="text" ref={colorNameEditRef} placeholder="enter color name" />
      <input type="text" ref={colorValueEditRef} placeholder="enter color value" />
      <button ref={colorUpdateBtn} onClick={updateColor} > Update </button>
        
      </section>

      <input type="text" ref={colorNameRef} placeholder="enter color name" />
      <input type="text" ref={colorValueRef} placeholder="enter color value" />
      <button onClick={addColor} >New</button>
      <ul>
        {colors.map((color,i) => (
          <li 
            key={color.id}>
            <a href="#" onClick={() => editColor(color.id,color.name,color.value)} >edit <Dot  color={color.value} /> </a>
            {color.name}
            <a href='#' onClick={ ()=>{ deleteColor(color.id) } } >delete</a> </li>

        )) }

      </ul>
    </div>
  );
}

export default App;

