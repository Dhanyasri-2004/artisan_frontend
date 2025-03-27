import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Ensure correct path for styles
import "../styles/DashboardUser.css";

const images = [
  "/images/18trades.jpg",
  "/images/carpenter.webp",
  "/images/basketweaver.webp",
  "/images/toymaker.webp",
];

const testimonials = [
    { img: "/images/18trades.jpg", text: "Viswakarma is known as the divine architect, representing 18 trades that form the backbone of traditional craftsmanship. These skilled artisans have preserved their heritage through intricate craftsmanship, building temples, tools, and fine artwork.", name: "Viswakarma" },
    { img: "/images/armourer.webp", text: "A master of forging protective gear, the armourer meticulously crafts shields, helmets, and body armor, ensuring strength and resilience in every piece for warriors and soldiers.", name: "Armourer" },
    { img: "/images/barber.webp", text: "The barber is more than just a hairdresser; they are traditional groomers who shape hairstyles, beards, and perform therapeutic massages, maintaining the cultural essence of personal care.", name: "Barber" },
    { img: "/images/basketweaver.webp", text: "With skillful hands, the basket weaver intricately interlaces natural fibers to create beautiful, durable baskets used for storage, farming, and decorative purposes.", name: "Basket Weaver" },
    { img: "/images/blacksmith.webp", text: "A master of fire and metal, the blacksmith hammers iron into tools, weapons, and essential household items, showcasing immense strength and artistry in forging.", name: "Blacksmith" },
    { img: "/images/boatmaker.webp", text: "Bridging tradition with function, the boat maker carefully carves and assembles sturdy wooden boats, ensuring they navigate waters with ease for fishing and transport.", name: "Boat Maker" },
    { img: "/images/carpenter.webp", text: "The carpenter shapes wood into functional and artistic pieces, from furniture to houses, bringing warmth and utility to living spaces through intricate joinery and craftsmanship.", name: "Carpenter" },
    { img: "/images/cobbler.webp", text: "More than just a shoe repairer, the cobbler breathes new life into worn-out footwear, skillfully stitching, mending, and crafting comfortable, long-lasting shoes.", name: " Cobbler" },
    { img: "/images/toymaker.webp", text: "Bringing joy to children, the toy maker carves and assembles playful, vibrant toys from wood and clay, preserving traditional storytelling and cultural heritage.", name: "Toy Maker" },
    { img: "/images/fishnet.webp", text: "Expertly weaving strong and fine nets, the fishing net maker ensures that fishermen can harvest bountiful catches, sustaining livelihoods and coastal traditions.", name: "Fishing Net Maker" },
    { img: "/images/garlandmaker.webp", text: "With fragrant flowers and meticulous hands, the garland maker strings together vibrant floral arrangements, adorning temples, celebrations, and rituals with beauty and devotion.", name: "Garland Maker" },
    { img: "/images/goldsmith.webp", text: "With patience and precision, the goldsmith shapes precious metals into exquisite jewelry, creating heirlooms that symbolize culture, tradition, and elegance.", name: "Goldsmith" },
    { img: "/images/toolkitmaker.webp", text: "A vital craftsman, the toolkit maker forges and assembles essential tools used in agriculture, construction, and handicrafts, empowering other trades with reliable instruments.", name: "Toolkit Maker" },
    { img: "/images/locksmith.webp", text: "Ensuring security and trust, the locksmith designs and constructs sturdy locks and keys, blending tradition with innovation in safeguarding homes and valuables.", name: "Locksmith" },
    { img: "/images/masons.webp", text: "With stones and mortar, the mason constructs resilient buildings, temples, and monuments, leaving behind structures that stand the test of time.", name: " Mason" },
    { img: "/images/.webp", text: "Transforming clay into art, the potter shapes elegant pots, vases, and utensils, blending functionality with cultural heritage through their hands and the spinning wheel.", name: "Potter" },
    { img: "/images/sculptor.webp", text: "With chisels and vision, the sculptor breathes life into stone and wood, crafting divine idols, intricate carvings, and breathtaking statues that tell timeless stories.", name: "Sculptor" },
    { img: "/images/tailor.webp", text: "The tailor meticulously stitches fabrics into perfectly fitted garments, weaving comfort and style into every piece, preserving the essence of traditional and modern fashion.", name: "Tailor" },
    { img: "/images/washerman.webp", text: "A guardian of cleanliness, the washerman tirelessly washes and presses clothes, ensuring fresh, crisp garments for families and communities, keeping traditions alive.", name: "Washerman" }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(autoSlide);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div>
<header>
  <nav className="navbar">
    <div className="logo">
      <img src="/images/logo.png" alt="Artisan Alley Logo" className="logo-img" />
      Artisan Alley
    </div>
    <div className="nav-container">
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">About</a></li>
      </ul>
      <button className="artisan-btn" onClick={() => navigate("/signup1")}>
          Artisan
        </button>
    </div>
  </nav>
</header>


      {/* Background Slideshow */}
      <section className="slideshow">
        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}vw)`, transition: "transform 1s ease-in-out" }}>
          {images.map((src, index) => (
            <div className="slide" key={index}>
              <img src={src} alt={`Handicrafts ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Dots for Image Indicators */}
      <div className="dots-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>

      {/* Overlay Section */}
      <div className="overlay">
        <h1>Unique Creations for Every Home</h1>
        <p>Beauty of Imperfection</p>
        <div className="auth-buttons">
        <button className="login2" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="signup2" onClick={() => navigate("/signup")}>
          Signup
        </button>
        </div>
      </div>

      <div className="home-container">
        {/* Testimonial Slider */}
        <section className="testimonial-slider">

          <div className="testimonial-container">
            <div className="testimonial-content">
              <img src={testimonials[testimonialIndex].img} alt={testimonials[testimonialIndex].name} />
              <div className="testimonial-text">
                <p>"{testimonials[testimonialIndex].text}"</p>
                <h3>{testimonials[testimonialIndex].name}</h3>
              </div>
            </div>
          </div>

        </section>

        {/* Handicraft Section */}
        <section className="handicraft-section">
          <div className="handicraft-container">
            <div className="handicraft-item1">
              <p className="handicraft-quote1">"Every handmade piece tells a story of tradition and passion."</p>
              <img src="/images/product1.jpg" alt="Handicraft Image 1" />
            </div>
            <div className="handicraft-item2">
              <img src="/images/product2.jpg" alt="Handicraft Image 2" />
              <p className="handicraft-quote2">"Handcrafts embody the beauty of tradition, creativity, and the human touch in every detail."</p>
            </div>
          </div>
        </section>

        {/* Trending Now Section */}
        <section className="trending-section">
          <h2 className="trending-title">TRENDING NOW</h2>
          <div className="trending-container">
            {[
              { img: "product3.jpg", hoverImg: "product3(1).jpg", name: "Vintiquewise Indoor", price: "$90.00" },
              { img: "product4.jpg", hoverImg: "product4(1).jpg", name: "Clove And Orange Candle", oldPrice: "$50.00", newPrice: "$40.00" },
              { img: "product5.jpg", hoverImg: "product5(1).jpg", name: "Cottage Beige Ceiling Lights", oldPrice: "$30.00", newPrice: "$15.00" },
              { img: "product6.jpg", hoverImg: "product6(1).jpg", name: "Wide Woven Basket", oldPrice: "$55.00", newPrice: "$40.00" },
            ].map((product, index) => (
              <div className="trending-item" key={index}>
                <div className="image-container">
                  <img src={`/images/${product.img}`} alt={product.name} className="default-img" />
                  <img src={`/images/${product.hoverImg}`} alt={`${product.name} Hover`} className="hover-img" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="price">
                    {product.oldPrice ? <span className="old-price">{product.oldPrice}</span> : null}
                    <span className="new-price">{product.newPrice || product.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Features Section */}
        <h1 className="services">Our Services</h1>
      <section className="features-section">
 
        <div className="feature">
          <img src="/images/traditional-dance.png" alt="Culturally Rich" />
          <h3>CULTURALLY RICH</h3>
          <p>The product has both practical value and the mark of the craftsman and the essence of a certain countryside.</p>
        </div>
        <div className="feature">
          <img src="/images/flower.png" alt="High Aesthetics" />
          <h3>HIGH AESTHETICS</h3>
          <p>Each handicraft product is a work of art, both of high practical value and aesthetic countryside value.</p>
        </div>
        <div className="feature">
          <img src="/images/individuality.png" alt="Individuality" />
          <h3>INDIVIDUALITY</h3>
          <p>Each handicraft has its own unique character and style of each unique craft village.</p>
        </div>
        <div className="feature">
          <img src="/images/inclusive.png" alt="Diversity" />
          <h3>DIVERSITY</h3>
          <p>Diversity is shown in the method and materials used to make the product.</p>
        </div>
      </section>
      <section className="contacthome">
  <div className="contact-content">
    {/* Left Section */}
    <div className="contact-left">
      <div className="contact-logo">
        <img src="/images/logo.png" alt="Artisan Alley Logo" className="contact-logo-img" />
        <span className="contact-logo-text">Artisan Alley</span>
      </div>
      <p className="contact-tagline">
        "Every handmade piece tells a story of tradition and passion."
      </p>
      <div className="contact-social-icons">
        <p><img src="/images/facebook.png" alt="Facebook" /> Facebook</p>
        <p><img src="/images/pintrest.png" alt="Pinterest" /> Pinterest</p>
        <p><img src="/images/instagram.png" alt="Instagram" /> Instagram</p>
      </div>
    </div>

    {/* Middle Section */}
    <div className="contact-middle">
      <h3>Contact Info</h3>
      <p><img src="/images/location.png" alt="Location" /> Andhra Pradesh, India</p>
      <p><img src="/images/phonecall.png" alt="Phone" /> (208) 555-0112</p>
      <p><img src="/images/mail.png" alt="Email" /> example@gmail.com</p>
    </div>

    {/* Right Section */}
    <div className="contact-right1">
      <h3>Contact Us</h3>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  
  </section>

  </div>
    </div>
  );
};

export default Home;
