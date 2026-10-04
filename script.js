const DEFAULT_STATE = {
  userRole: null,
  activeNav: "browse",
  favorites: [
    { title: "School Uniform", icon: "👕", price: 500, rating: 4.8, reviews: 6, location: "Location" },
    { title: "Dress", icon: "👗", price: 600, rating: 4.5, reviews: 4, location: "Location" }
  ],
  reservations: [
    {
      title: "School Uniform",
      icon: "👕",
      start: "May 1, 2026",
      end: "May 2, 2026",
      branch: "Main Branch",
      price: 500,
      status: "Waiting for Pick-up",
      note: "Please pick up your item at the scheduled date."
    },
    {
      title: "Graduation Gown",
      icon: "🎓",
      start: "Apr 18, 2026",
      end: "Apr 20, 2026",
      branch: "Main Branch",
      price: 1000,
      status: "Received",
      note: "Item is currently received. Returned on Apr 20, 2026."
    }
  ],
  listings: [
    { title: "School Uniform", price: 500 },
    { title: "Graduation Gown", price: 1000 },
    { title: "Wedding Dress", price: 1500 }
  ]
};

const app = document.getElementById("app");

function loadState() {
  const saved = localStorage.getItem("rentalPlatformState");
  return saved ? JSON.parse(saved) : DEFAULT_STATE;
}

function saveState(state) {
  localStorage.setItem("rentalPlatformState", JSON.stringify(state));
}

function renderLogin() {
  app.innerHTML = `
    <div class="login-screen">
      <div class="login-panel">
        <div class="login-title">Choose your role</div>
        <div class="role-grid">
          <button class="role-btn" data-role="renter">Login as Renter</button>
          <button class="role-btn" data-role="lender">Login as Lender</button>
        </div>
      </div>
    </div>
  `;
}

function navItemsForRole(role) {
  return role === "renter"
    ? [
        { key: "browse", label: "Browse Rentals" },
        { key: "reservations", label: "My Reservations" },
        { key: "favorites", label: "Favorites" },
        { key: "messages", label: "Messages" },
        { key: "profile", label: "Profile" }
      ]
    : [
        { key: "listings", label: "My Listings" },
        { key: "rentals", label: "Rentals" },
        { key: "policies", label: "Rental Policies & Terms" },
        { key: "messages", label: "Messages" },
        { key: "profile", label: "Profile" }
      ];
}

function renderBrowseRentals() {
  const items = [
    { title: "School Uniform", price: "₱500", icon: "👕" },
    { title: "Graduation Gown", price: "₱1000", icon: "🎓" },
    { title: "Wedding Dress", price: "₱1500", icon: "👗" },
    { title: "Event Suit", price: "₱900", icon: "🧥" },
    { title: "School Blazer", price: "₱750", icon: "🧥" },
    { title: "Formal Dress", price: "₱650", icon: "👗" }
  ];

  return `
    <div class="grid-3">
      ${items.map(item => `
        <div class="card">
          <div>
            <div class="thumb-box">${item.icon}</div>
            <div class="item-title">${item.title}</div>
            <div class="meta-row"><span>⭐ 4.8</span><span>6 reviews</span></div>
            <div class="meta-row"><span>📍 Main Branch</span><span>${item.price}</span></div>
          </div>
          <button class="small-btn">View Details</button>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFavorites() {
  const state = loadState();
  return `
    <div class="favorites-list">
      ${state.favorites.map(item => `
        <div class="favorite-item">
          <div class="favorite-thumb">${item.icon}</div>
          <div class="favorite-main">
            <h3 class="favorite-title">${item.title}</h3>
            <div class="favorite-meta">
              <span>📍 ${item.location}</span>
              <span>⭐ ${item.rating}</span>
              <span>Reviews</span>
            </div>
            <div class="favorite-meta price-line">
              <span>₱ ${item.price}</span>
              <span>|</span>
              <span>${item.title.includes("Dress") ? "Available 2 sets" : "Available 8 sets"}</span>
            </div>
          </div>
          <div class="heart-box">
            <div class="heart red">♥</div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderReservations() {
  const state = loadState();
  return `
    <div>
      <div class="reservation-tabs">
        <div class="tab active">All 2</div>
        <div class="tab">Waiting for Pick-up</div>
        <div class="tab">Received 1</div>
        <div class="tab">Returned</div>
        <div class="tab">Refunded</div>
      </div>

      ${state.reservations.map(item => `
        <div class="reservation-card">
          <div class="reservation-main">
            <div class="reservation-thumb">${item.icon}</div>
            <div>
              <div class="reservation-title">${item.title}</div>
              <div class="list-attrs">
                <div>📅 ${item.start} - ${item.end}</div>
                <div>📍 ${item.branch}</div>
                <div>₱ ${item.price}</div>
              </div>
            </div>
          </div>

          <div class="reservation-side">
            <div class="status-label">${item.status === "Waiting for Pick-up" ? "Waiting for\nPick-up" : "Received"}</div>
            <div class="status-copy">${item.note}</div>
            <button class="reserve-btn">View Details</button>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderProfile(role) {
  if (role === "renter") {
    return `
      <div class="profile-layout">
        <div class="profile-left">
          <div class="avatar-large">👤</div>
          <div class="role-label">Renter</div>

          <div class="profile-meta">
            <div>Name</div>
            <div>Full Name:</div>
            <div>Email Address:</div>
            <div>Phone number:</div>
            <div>Location:</div>
          </div>

          <div class="stat-grid">
            <div class="stat-box">
              <div class="stat-label">Total Rentals</div>
              <div class="stat-value">12</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Average Rating</div>
              <div class="stat-value">4.8</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">Member Since</div>
              <div class="stat-value">Apr 12</div>
            </div>
          </div>

          <div class="role-label" style="text-align:left; margin-top:18px;">Rental History</div>

          <div class="history-box">
            <div class="history-thumb">🖼️</div>
            <div class="history-copy">
              <div>Item Name</div>
              <div class="history-status">Apr 20, 2026 - Apr 25, 2026</div>
              <div class="history-status">Completed</div>
            </div>
            <div>›</div>
          </div>

          <div class="history-box">
            <div class="history-thumb">🖼️</div>
            <div class="history-copy">
              <div>Item Name</div>
              <div class="history-status">Mar 20, 2026 - Mar 23, 2026</div>
              <div class="history-status">Completed</div>
            </div>
            <div>›</div>
          </div>
        </div>

        <div class="profile-center">
          <div class="about-head">
            <div style="font-size:1.3rem; font-weight:800;">About Me</div>
            <button class="edit-btn">Edit</button>
          </div>

          <div class="about-box">
            <div class="about-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div style="font-size:1.5rem; font-weight:800; margin:20px 0 12px;">Current Rentals</div>

          <div class="lender-grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="lender-card" style="min-height:120px;">
              <h3 style="font-size:1.2rem; margin-bottom:8px;">Ongoing Rentals</h3>
              <div style="font-size:1.2rem; font-weight:700;">1</div>
            </div>
            <div class="lender-card" style="min-height:120px;">
              <h3 style="font-size:1.2rem; margin-bottom:8px;">For Pickup</h3>
              <div style="font-size:1.2rem; font-weight:700;">1</div>
            </div>
          </div>

          <div style="margin-top:18px;">
            <button class="mini-btn" style="width:100%;">View all</button>
          </div>
        </div>

        <div class="profile-right">
          <div style="font-size:1.5rem; font-weight:800; margin:6px 0 18px;">Reviews</div>

          <div class="review-block">
            <div class="review-item">
              <div class="review-head">
                <div class="review-avatar">J</div>
                <div>
                  <div class="review-name">John D.</div>
                  <div class="review-stars">★★★★★</div>
                </div>
                <div class="review-date">Apr 20, 2026</div>
              </div>
              <div class="review-text">Very helpful and easy to deal with.</div>
            </div>

            <div class="review-item">
              <div class="review-head">
                <div class="review-avatar">M</div>
                <div>
                  <div class="review-name">Mark T.</div>
                  <div class="review-stars">★★★★★</div>
                </div>
                <div class="review-date">Mar 11, 2026</div>
              </div>
              <div class="review-text">Great service! Will rent again soon.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="main-panel">
      <div class="lender-grid">
        <div class="lender-card">
          <h3>My Listings</h3>
          <div class="list-rows">
            <div class="list-row"><span>School Uniform</span><span>₱500</span></div>
            <div class="list-row"><span>Graduation Gown</span><span>₱1000</span></div>
          </div>
        </div>

        <div class="lender-card">
          <h3>Rentals</h3>
          <div class="list-rows">
            <div class="list-row"><span>Active rentals</span><span>4</span></div>
            <div class="list-row"><span>Returned</span><span>2</span></div>
          </div>
        </div>
      </div>

      <div class="policy-box">
        <strong>Rental Policies & Terms</strong><br />
        1. Items must be returned in good condition.<br />
        2. Late returns incur a daily fee.<br />
        3. Security deposit is required before pickup.<br />
        4. Damaged items will be charged to the renter.
      </div>

      <div class="message-list">
        <div class="message-item"><span>New inquiry from Sarah</span><span>2m ago</span></div>
        <div class="message-item"><span>Pickup confirmed for Scholarship Gown</span><span>1h ago</span></div>
        <div class="message-item"><span>Profile update request</span><span>Today</span></div>
      </div>
    </div>
  `;
}

function renderContent(role, activeNav) {
  switch (activeNav) {
    case "browse":
      return renderBrowseRentals();
    case "reservations":
      return renderReservations();
    case "favorites":
      return renderFavorites();
    case "messages":
      return `
        <div class="main-panel">
          <div class="message-list">
            <div class="message-item"><span>Renter: Looking for a graduation gown</span><span>Now</span></div>
            <div class="message-item"><span>Renter: Can I pick up today?</span><span>3h ago</span></div>
            <div class="message-item"><span>System: Payment confirmed</span><span>Today</span></div>
          </div>
        </div>
      `;
    case "profile":
      return renderProfile(role);
    case "listings":
      return `
        <div class="main-panel">
          <div class="lender-grid">
            <div class="lender-card">
              <h3>My Listings</h3>
              <div class="list-rows">
                ${loadState().listings.map(item => `
                  <div class="list-row"><span>${item.title}</span><span>₱${item.price}</span></div>
                `).join("")}
              </div>
            </div>
            <div class="lender-card">
              <h3>Quick Summary</h3>
              <div class="list-rows">
                <div class="list-row"><span>Total listings</span><span>3</span></div>
                <div class="list-row"><span>Available</span><span>2</span></div>
                <div class="list-row"><span>Rented</span><span>1</span></div>
              </div>
            </div>
          </div>
        </div>
      `;
    case "rentals":
      return `
        <div class="main-panel">
          <div class="lender-grid">
            <div class="lender-card">
              <h3>Current Rentals</h3>
              <div class="list-rows">
                <div class="list-row"><span>School Uniform</span><span>May 1</span></div>
                <div class="list-row"><span>Graduation Gown</span><span>Apr 18</span></div>
              </div>
            </div>
            <div class="lender-card">
              <h3>Pending Returns</h3>
              <div class="list-rows">
                <div class="list-row"><span>Event Suit</span><span>1 due</span></div>
                <div class="list-row"><span>Wedding Dress</span><span>2 due</span></div>
              </div>
            </div>
          </div>
        </div>
      `;
    case "policies":
      return `
        <div class="main-panel">
          <div class="policy-box">
            <strong>Rental Policies & Terms</strong><br /><br />
            - All rentals require a valid ID and contact verification.<br />
            - Security deposit must be paid before pickup.<br />
            - Late returns are charged per day beyond the agreed schedule.<br />
            - Damages or missing items are subject to replacement fees.<br />
            - Booking cancellations are allowed up to 48 hours before pickup.
          </div>
        </div>
      `;
    default:
      return renderBrowseRentals();
  }
}

function getPageTitle(activeNav) {
  const titles = {
    browse: "Browse Rentals",
    reservations: "My Reservations",
    favorites: "Favorites",
    messages: "Messages",
    profile: "Profile",
    listings: "My Listings",
    rentals: "Rentals",
    policies: "Rental Policies & Terms"
  };
  return titles[activeNav] || "Browse Rentals";
}

function renderDashboard() {
  const state = loadState();
  const role = state.userRole;
  const activeNav = state.activeNav || (role === "renter" ? "browse" : "listings");
  const nav = navItemsForRole(role);

  app.innerHTML = `
    <div class="dashboard">
      <aside class="sidebar">
        <div class="brand">
          <div class="logo">Logo</div>
        </div>

        <div class="nav-list">
          ${nav.map(item => `
            <button class="nav-item ${item.key === activeNav ? "active" : ""}" data-nav="${item.key}">
              ${item.label}
            </button>
          `).join("")}
        </div>

        <div class="logout-wrap">
          <button class="logout-btn" data-action="logout">Logout</button>
        </div>
      </aside>

      <main class="content">
        <div class="header">
          <div class="page-title">${getPageTitle(activeNav)}</div>
          <div class="hamburger">☰</div>
        </div>

        ${renderContent(role, activeNav)}
      </main>
    </div>
  `;
}

document.addEventListener("click", (event) => {
  const roleBtn = event.target.closest("[data-role]");
  if (roleBtn) {
    const nextState = loadState();
    nextState.userRole = roleBtn.dataset.role;
    nextState.activeNav = nextState.userRole === "renter" ? "browse" : "listings";
    saveState(nextState);
    renderDashboard();
    return;
  }

  const navButton = event.target.closest("[data-nav]");
  if (navButton) {
    const nextState = loadState();
    nextState.activeNav = navButton.dataset.nav;
    saveState(nextState);
    renderDashboard();
    return;
  }

  const logoutButton = event.target.closest("[data-action='logout']");
  if (logoutButton) {
    const nextState = loadState();
    nextState.userRole = null;
    nextState.activeNav = "browse";
    saveState(nextState);
    renderLogin();
  }
});

renderLogin();
