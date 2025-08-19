import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';
import MoveToTop from '../MoveToTop/MoveToTop';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum necessitatibus, ullam suscipit fugit recusandae aliquam laboriosam soluta perspiciatis cum, sit excepturi repellat? Ipsa provident iure ex praesentium, tenetur ipsam nisi.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>HOME</li>
                        <li>ABOUT US</li>
                        <li>DELIVERY</li>
                        <li>PRIVACY POLICY</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9342134106</li>
                        <li>conatct@tomato.com</li>
                    </ul>
            </div>
            <div className="move-to-top">
               <a href= '#navbar' > <MoveToTop/></a> 
            </div>
            
            
        </div>
        <hr />
        <p className='footer-copyright'>copyright 2024 @ Tomato.com - ALL RIGHTS RESERVED</p>
    </div>
  )
}

export default Footer