import React from "react";

const Hero = ({ onChange }) => {
    console.log('child render');
    
    //call api
    return (
       <>
        <h3>Hello</h3>
        <button onClick={() => {
            onChange('123')
        }}>Click</button>
       </>
    )
}
export default Hero;