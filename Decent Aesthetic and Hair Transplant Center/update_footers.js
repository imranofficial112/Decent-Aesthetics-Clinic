const fs = require('fs');
const path = require('path');

const targetFiles = [
    'aesthetics.html',
    'blog.html',
    'contact.html',
    'gallery.html',
    'hair-transplant.html',
    'shop.html'
];

const fullFooter = `  <footer>
    <div class="container footer-grid">
      <div class="footer-col">
        <a href="index.html" class="logo" style="font-size:1.8rem;">DECENT<span>AESTHETICS</span></a>
        <p style="margin-top:1.5rem;">Premium Aesthetic & Hair Transplant Center offering world-class treatments.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="hair-transplant.html">Hair Transplant</a>
        <a href="aesthetics.html">Aesthetics</a>
        <a href="shop.html">Shop</a>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <p><i class="fa-solid fa-location-dot"></i> 123 Luxury Avenue, Premium District, Dubai</p>
        <p><i class="fa-solid fa-phone"></i> +971 50 123 4567</p>
        <p><i class="fa-solid fa-envelope"></i> info@decentaesthetics.com</p>
        <p><i class="fa-solid fa-clock"></i> Mon - Sat: 9:00 AM - 8:00 PM</p>
      </div>
      <div class="footer-col">
        <h4>Newsletter</h4>
        <p>Subscribe for updates and exclusive offers.</p>
        <form class="newsletter-form">
          <input type="email" placeholder="Your email address" style="padding:10px; width:70%; border:none; border-radius:4px 0 0 4px;">
          <button type="submit" style="padding:10px; background:var(--gold); color:white; border:none; border-radius:0 4px 4px 0; cursor:pointer;"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Decent Aesthetics Clinic. All Rights Reserved. Designed for premium experience.</p>
    </div>
  </footer>`;

targetFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Match from <footer to </footer> or to <script> if missing closing tag (safeguard)
        content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/, fullFooter);

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(\`Updated footer in \${file}\`);
    } else {
        console.log(\`File \${file} not found.\`);
    }
});
