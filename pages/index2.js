import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

export default function Home() {

  const [showpassword, setShowpassword] = useState('password')
  const [timer, setTimer] = useState('')
  const [showerror, setShowerror] = useState('')
  const [showinvalid, setShowInvalid] = useState(0)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [verify_otp, setVerifyOTP] = useState('')
  const [loginusername, setLoginUsername] = useState('')

  const country_code = '91'
  const user_type_id = 10
  const referred_code = 'qfoPWw'

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'mobile') {
      setMobile(e.target.value)
    }
    else if (e.target.name == 'verify_otp') {
      setVerifyOTP(e.target.value)
    }
  }

  const showPassword = () => {
    if (showpassword == 'password') {
      setShowpassword('text')
    }
    else {
      setShowpassword('password')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { name, password, mobile, country_code, user_type_id, verify_otp, referred_code }
    let res = await fetch('https://shyamplay.com/api/v1/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    let response = await res.json()
    console.log(response)
    setShowInvalid(2)
    if (response.message == 'Mobile no already taken') {
      setShowerror('Mobile No. Already Registered')
    }
    else if (response.message == 'Invalid OTP') {
      setShowerror('Invalid OTP')
    }
    else if (response.message == 'OTP Expired') {
      setShowerror('OTP Expired')
    }
    else if (response.message == 'User Register Successfully') {
      setShowerror('User Register Successfully')
      setLoginUsername(response.data.user_name)
    }
  }

  const sendOTP = async (e) => {
    if (mobile.length == 10) {
      setShowInvalid(0)
      e.preventDefault()
      const data = { mobile }
      let res = await fetch('https://shyamplay.com/api/v1/user/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      let response = await res.json()
      setInterval(() => {
        if (response.data.timer > 0) {
          response.data.timer = response.data.timer - 1
          setTimer(response.data.timer)
        }
      }, 1000)
    }
    else {
      setShowInvalid(1)
    }
  }

  return (
    <>
      {/* <!-- Meta Pixel Code --> */}
      <Script id="facebook-pixel">
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1200532971879771');
        fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" src="https://www.facebook.com/tr?id=417685067299751&ev=PageView&noscript=1" />
      </noscript>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZCL1QE0P7K" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-ZCL1QE0P7K');
        `}
      </Script>
      <div className="body">
        <div className="wrapper">
          <marquee width="100%" direction="left" height="80px" behavior='scroll'>
            <div className="marquee-content">
              <Image priority={true} src="/images/extra-deposit.png" width={200} height={200} alt="" />
              <Image priority={true} src="/images/instant-withdrawal.png" width={200} height={200} alt="" />
              <Image priority={true} src="/images/Instant-Deposit.png" width={200} height={200} alt="" />
              <Image priority={true} src="/images/refer-bonus.png" width={200} height={200} alt="" />
            </div>
          </marquee>
        </div>
        <div className="wrapper">
          <form className="form-gap" method='POST' onSubmit={handleSubmit}>
            <Image src="/images/logo.png" width={200} height={200} alt="" className="logo-img" />
            <h2 className='h2-title'>Register Now,</h2>
            {/* Mobile Number */}
            <div className="input-box">
              <label htmlFor="">Mobile Number</label>
              <div className='input-box-inner'>
                <i className="fa-solid fa-mobile-screen"></i>
                <p>+91</p>
              </div>
              <input type="number" placeholder="Mobile Number" name='mobile' value={mobile} onChange={handleChange} className='phone-input' required />
              <button onClick={sendOTP} disabled={timer > 0}>
                <p>OTP <i className="fa-solid fa-arrow-right"></i></p>
              </button>
              <button onClick={sendOTP} disabled={timer > 0} className="g-img">
                <Image src="/images/g-icon.png" width={200} height={200} alt="" />
              </button>
            </div>
            {showinvalid == 1 && <p className='red-error-text'>Invalid Valid Mobile Number</p>}
            {timer > 0 && <p>OTP Valid Upto {timer} Seconds</p>}
            {/* OTP */}
            <div className="input-box">
              <label htmlFor="">OTP</label>
              <i className="fa-solid fa-list-ol"></i>
              <input type="number" placeholder="Enter OTP" name='verify_otp' value={verify_otp} onChange={handleChange} required />
            </div>
            {/* Username */}
            <div className="input-box">
              <label htmlFor="">Your Name</label>
              <i className='bx bxs-user'></i>
              <input type="text" placeholder="Name" name='name' value={name} onChange={handleChange} required />
            </div>
            {/* Password */}
            <div className="input-box-2">
              <label htmlFor="">Password</label>
              <i className='bx bxs-lock-alt'></i>
              <input placeholder="Password" type={showpassword} name='password' value={password} onChange={handleChange} required />
              <a onClick={showPassword}>
                {showpassword == 'password' && <i className="fa-solid fa-eye"></i>}
                {showpassword == 'text' && <i className="fa-solid fa-eye-slash"></i>}
              </a>
            </div>
            {showinvalid == 2 && <p className='red-error-text'>{showerror}</p>}
            <button type="submit" className="btn">Join Now !</button>
            <div className="or-btn">
              <h4>OR</h4>
            </div>
            <Link href="https://wa.me/+918856958256">
              <h5 className="whatsApp-btn"><i className="fa-brands fa-whatsapp"></i>Get Instant ID On Whatsapp</h5>
            </Link>
          </form>
        </div>
      </div>

      {/* Popup Code */}
      {showerror == 'User Register Successfully' && <div className="popup-code">
        <div className="popup-main-box">
          <Image src="/images/ICONF.png" width={200} height={200} alt="" className="logo-img" />
          <div className="popup-middle-box">
            <p className='congrats-para'>Welcome To ShyamPlay!</p>
            <p className='won-para'>You Have Won</p>
            <p className='won-amount'>10<sup>%</sup></p>
            <p className='won-para'>Welcome Bouns</p>
            <p className='username-para'>Username - {loginusername}</p>
            <p className='username-para'>Password - {password}</p>
            <Link href="https://shyamplay.com/auth/login">
              <button>Claim Now</button>
            </Link>
            <p className='note-text'>Note* Take a screenshot of the above details</p>
          </div>
        </div>
      </div>}
    </>
  )
}
