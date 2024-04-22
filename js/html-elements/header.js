// Header HTML code

header = document.getElementById("header");
header.innerHTML = `
<div class="title-container">
  <img src="/images/ttlogo.png" class="logo"><a href="index.html"><h1>TENACIOUS <span class="secondary-color">TRAVELER</span></h1></a>
  <div class="link-container">
    <a href="blog.html"><h3>BLOG</h3></a>
    <a href="about.html"><h3>ABOUT</h3></a>
    <a href="contact.html"><h3>CONTACT</h3></a>
  </div>
  <form class="searchbar" action="search.html" method="get">
    <input type="text" placeholder="SEARCH" name="search" id="search-input">
      <button type="submit" id="search-button"><img  class="searchicon" src="images/search.svg" alt="Search button"></button>
  </form>
  <div class="mobile-menu">
    <input type="checkbox" id="menu-checkbox">
      <label for="menu-checkbox"><div class="mobile-menu-button"><div class="hamburger-menu"></div></div></label>
      <div id="mobile-dropdown-menu">
        <div class="menu-search">
          <form class="searchbar" action="search.html" method="get">
            <input type="text" placeholder="SEARCH" name="search" id="search-input">
            <button type="submit" id="search-button"><img  class="searchicon" src="images/search.svg" alt="Search button"></button>
          </form>
          </div>
        <ul>
          <li><a href="index.html"><div class="logo-container"><img class="menu-logo" src="images/ttlogo.png" alt="home icon"></div>HOME</a></li>
          <li><a href="blog.html"><div class="logo-container"><img class="menu-logo" src="images/bloglogo.png" alt=""></div>BLOG</a></li>
          <li><a href="about.html"><div class="logo-container"><img class="menu-logo" src="images/aboutlogo.png" alt=""></div>ABOUT</a></li>
          <li><a href="contact.html"><div class="logo-container"><img class="menu-logo" src="images/contactlogo.png" alt=""></div>CONTACT</a></li>
        </ul>
      </div>
  </div>
</div>

`;