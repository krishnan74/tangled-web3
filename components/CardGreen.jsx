import React from "react";
import Image from "next/image";
import "./card.css";

const Card = (props) => {
  return (
    <div className="parent">
      <div className="card">
        <div className="logo">
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">
            <Image
              src="/brain_black.png"
              width={30}
              height={30}
              alt="Picture of the author"
            />
          </span>
        </div>
        <div className="glass"></div>
        <div className="content">
          <span className="title">{props.feature}</span>
          <span className="text">{props.description}</span>
        </div>
        <div className="bottom">
          <div className="social-buttons-container flex items-center">
            <button className="social-button .social-button1">
              <Image
                src={props.techstackimage}
                width={20}
                height={20}
                alt="Picture of the author"
              />
            </button>

            <p>{props.techstack}</p>
            {/* <button className="social-button .social-button2">
              <Image
                src={props.techstackimage}
                width={20}
                height={20}
                alt="Picture of the author"
              />
            </button>
            <button className="social-button .social-button3">
              <Image
                src={props.techstackimage}
                width={20}
                height={20}
                alt="Picture of the author"
              />
            </button> */}
          </div>
          <div className="view-more">
            {/*<button
              className="view-more-button"
              onClick={() => (window.location.href = props.link)}
            >
              Try Now
          </button>*/}

      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
