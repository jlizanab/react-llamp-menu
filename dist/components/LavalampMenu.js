"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

require("./lavalampMenu.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const LavalampMenu = props => {
  const makeid = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const useWindowSize = () => {
    const [size, setSize] = (0, _react.useState)([0, 0]);
    (0, _react.useLayoutEffect)(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }

      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  };

  const [clonedUl, setClonedUl] = (0, _react.useState)(null);
  const [currentId, setCurrentId] = (0, _react.useState)();
  const [indicatorStyles, setIndicatorStyles] = (0, _react.useState)(null);
  const [currentSelectedOption, setCurrentSelectedOption] = (0, _react.useState)(null);
  const [width, height] = useWindowSize();
  setCurrentId(makeid(10));

  const selectInitialIndicator = () => {
    if (currentSelectedOption === null) {
      let firstButton = document.querySelector(".lavalampMenu ul li button");

      if (firstButton) {
        setIndicatorStyles({
          left: firstButton.offsetLeft + "px",
          width: firstButton.clientWidth + "px"
        });
        clearAllAndSelectOne(firstButton);
      }
    } else {
      let allButtons = document.querySelectorAll(".lavalampMenu ul li button");
      setIndicatorStyles({
        left: allButtons[currentSelectedOption].offsetLeft + "px",
        width: allButtons[currentSelectedOption].clientWidth + "px"
      });
      clearAllAndSelectOne(allButtons[currentSelectedOption]);
    }
  };

  const clearAllAndSelectOne = selectedButton => {
    document.querySelectorAll(".lavalampMenu ul li button").forEach(el => {
      el.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
  };

  (0, _react.useEffect)(() => {
    let clonedButton = null;
    let clonedLi = null;
    let clonedUll = null;
    let liArray = []; //let localCurrentId=;
    //setCurrentId(localCurrentId);

    let originalUl = props.children;

    if (originalUl.type === 'ul') {
      let liChildren = originalUl.props.children;

      if (liChildren) {
        liChildren.forEach((element, index) => {
          let buttonChildren = element.props.children;

          if (buttonChildren) {
            const originalClick = e => {
              if (buttonChildren.props.onClick) {
                buttonChildren.props.onClick();
              }

              setIndicatorStyles({
                left: e.target.offsetLeft + "px",
                width: e.target.clientWidth + "px"
              });
              clearAllAndSelectOne(e.target);
              setCurrentSelectedOption(index);
            };

            clonedButton = /*#__PURE__*/_react.default.cloneElement(buttonChildren, {
              onClick: originalClick
            });
          }

          clonedLi = /*#__PURE__*/_react.default.cloneElement(element, {
            key: "li".concat(index)
          }, clonedButton);
          liArray.push(clonedLi);
          clonedUll = /*#__PURE__*/_react.default.cloneElement(originalUl, {
            key: "ul".concat(index)
          }, liArray);
        });
      }

      setClonedUl(clonedUll);
    }
  }, [width, height]);
  (0, _react.useEffect)(() => {
    if (clonedUl) {
      selectInitialIndicator();
    }
  }, [clonedUl]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: props.className ? 'lavalampMenu' + ' ' + props.className : 'lavalampMenu'
  }, clonedUl, /*#__PURE__*/_react.default.createElement("div", {
    className: "indicator",
    style: indicatorStyles
  }, currentId));
};

var _default = LavalampMenu;
exports.default = _default;