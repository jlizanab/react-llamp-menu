
# A simple lavalamp menu for React

#### Easily create a lavalamp style menu 

## Features
- Adds a modern style to your app/website
- Turn a simple HTML structure (ul/li/button) into a nice lavalamp-style menu
- Respect original structure
- Can be easily customized by adding CSS  


## Installation
```sh
npm i react-llamp-menu
```

## Usage

1 . import

```js
import {LavalampMenu} from 'react-llamp-menu';
```

2 . Add a menu structure

```jsx
<LavalampMenu className="optionsMenu">
    <ul>
      <li><button onClick={()=>console.log('option 1')}>First option</button></li>
      <li><button onClick={()=>console.log('option 2')}>Second option</button></li>
      <li><button onClick={()=>console.log('option 3')}>Third option</button></li>
    </ul>
</LavalampMenu>
```

3 . customize (example with SCSS)

```scss
.optionsMenu {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;

  button{
    height:45px;
    padding:0 20px;
    cursor: pointer;
    transition: all 0.5s;

    &.selected{color:white; font-weight: normal !important;}
  }
  
  /*marker*/
  .indicator{
    background-color:#d92a1c;
    border-radius:50px
  }
}

```

## Demo

[https://react-llamp-menu-demo.netlify.app](https://react-llamp-menu-demo.netlify.app/)


## License

MIT

