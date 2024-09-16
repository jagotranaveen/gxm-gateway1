import React, { useState, useRef, useEffect } from "react";
import "./Filter.scss";


const Filter = ({ FilterOptions, setSelectedFilters, selectedFilters }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleOptionSelect = (option) => {
    if(option?.name === selectedOption?.name){
      setIsVisible(false)
    }
    setSelectedOption(option);
    
    };
  

  const handleUpdateFilters = (suboption) => {
    const updated = selectedFilters[selectedOption.id].includes(suboption)
      ? selectedFilters[selectedOption.id].filter((item) => item !== suboption)
      : [...selectedFilters[selectedOption.id], suboption];
  setSelectedFilters((prevFilters) => ({
    ...prevFilters,
    [selectedOption?.id]: updated,
  }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsVisible(false);
        setSelectedOption(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="generic-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Filters
        <i className="pi pi-filter ml-2"></i>
      </button>
      {isVisible && (
        <div className="dropdown-container">
          <ul className="dropdown-menu">
            {FilterOptions.map((option) => {
               return(
                <div className="dropdown-main" key={option.name}>
                <li
                  className={`dropdown-item ${option.suboptions && "has-submenu" } ${selectedOption?.name === option.name && "selected-option" }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.name}
                  {option.suboptions.length ? (
                    <i className="pi pi-angle-right ml-2"></i>
                  ) : ""}
                </li>
              { selectedOption?.name === option.name &&   
                 <div className="submenu-container">
                    <ul className="submenu" >            
                    {option.suboptions?.map((suboption) => {
                      return (
                 suboption.name &&
                            <li key={suboption.code} className="submenu-item">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedFilters[selectedOption.id].includes(suboption.code)}
                                  onChange={() =>
                                    handleUpdateFilters(suboption.code)
                                  }
                                />
                                {suboption.name}
                              </label>
                            </li>
                      )
                          })
    
                      } 
                      </ul>
                 </div>
                }
                </div>
                )
            } )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
