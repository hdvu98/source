import React, { useState, useEffect } from 'react';
import $ from 'jquery';

function ScrollTop(props){
    const [showIcon, setShowIcon] = useState(false);

    useEffect(()=>{
      $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
         !showIcon &&setShowIcon(true);
        } else {
          showIcon && setShowIcon(false);
        }
      });
    })

    const scrollTop=()=>{
      $("html, body").animate({ scrollTop: 0 }, 800);
    }

    return (
      <div id="scroll-to-top" onClick={()=>{scrollTop()}} className={`scroll-btn text-center ${showIcon?"appear":"disapear"}`}>
        <i className="fas fa-angle-up up-arrow"></i>
      </div>
    )
}
export default ScrollTop;