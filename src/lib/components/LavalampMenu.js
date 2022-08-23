import React, { useState, useLayoutEffect, useEffect } from 'react';
import './lavalampMenu.css';

const LavalampMenu = (props) => {

    const makeid=(length)=> {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    const useWindowSize=()=> {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const [clonedUl, setClonedUl] = useState(null); 
    const [currentId, setCurrentId] = useState(); 
    const [indicatorStyles, setIndicatorStyles] = useState(null); 
    const [currentSelectedOption, setCurrentSelectedOption] = useState(null); 
    const [width, height] = useWindowSize();

    const selectInitialIndicator=()=>{
        if(currentSelectedOption===null){
            let firstButton=document.querySelector(`#ll${currentId}.lavalampMenu ul li button`);
            if(firstButton){
                setIndicatorStyles({left:firstButton.offsetLeft + "px", width:firstButton.clientWidth + "px"});
                clearAllAndSelectOne(firstButton, currentId);
            }
        } else {
            let allButtons=document.querySelectorAll(`#ll${currentId}.lavalampMenu ul li button`);
            setIndicatorStyles({left:allButtons[currentSelectedOption].offsetLeft + "px", width:allButtons[currentSelectedOption].clientWidth + "px"});
            clearAllAndSelectOne(allButtons[currentSelectedOption], currentId);
        }
    }

    const clearAllAndSelectOne=(selectedButton, cId)=>{
        document.querySelectorAll(`#ll${cId}.lavalampMenu ul li button`).forEach((el) => {
            el.classList.remove('selected');
        });
        selectedButton.classList.add('selected');
    }

    useEffect(() => {
        let clonedButton=null;
        let clonedLi=null;
        let clonedUll=null;
        let liArray=[];

        let cId=makeid(10);
        setCurrentId(cId);

        let originalUl=props.children;
        if(originalUl.type==='ul'){
            let liChildren=originalUl.props.children;
            if(liChildren){ 
                liChildren.forEach((element, index) => {
                    let buttonChildren=element.props.children;
                    if(buttonChildren){
                        const originalClick=(e)=>{
                            
                            setIndicatorStyles({left:e.target.offsetLeft + "px", width:e.target.clientWidth + "px"});
                            clearAllAndSelectOne(e.target, cId);
                            setCurrentSelectedOption(index);

                            if(buttonChildren.props.onClick){
                                buttonChildren.props.onClick();
                            }
                        }
                        clonedButton=React.cloneElement(buttonChildren, {onClick:originalClick});
                    }

                    clonedLi=React.cloneElement(element, {key:`li${index}`},clonedButton);
                    liArray.push(clonedLi);
                    clonedUll=React.cloneElement(originalUl, {key:`ul${index}`}, liArray);
                });
            }

            setClonedUl(clonedUll);
        }

    }, [width, height]);


    useEffect(() => {
        if(clonedUl){
            selectInitialIndicator();
        }
    }, [clonedUl]);

    
    return (
        <div id={"ll"+currentId} className={props.className?'lavalampMenu'+' '+props.className:'lavalampMenu'}>  
            {clonedUl}
            <div className="indicator" style={indicatorStyles}></div>
        </div>
    );
    
}

export default LavalampMenu;