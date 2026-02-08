function loadPage(page) {
  fetch(page)
    .then((res) => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then((html) => {
      document.getElementById("content").innerHTML = html;

      // Bind GST calculator AFTER page loads
      if (page.includes("gst.html")) {
        bindGSTCalculator();
      }
    })
    .catch((err) => {
      document.getElementById("content").innerHTML =
        "<h3>Error loading page</h3><p>" + err.message + "</p>";
    });
}

// Bind GST logic
function bindGSTCalculator() {
  const btn = document.getElementById("calculateBtn");
  if (!btn) return;

  btn.addEventListener("click", calculateGST);
}

// GST calculation logic
function calculateGST() {
  const amount = parseFloat(document.getElementById("amount").value) || 0;
  const rate = parseFloat(document.getElementById("gstRate").value);
  const gstType = document.getElementById("gstType").value;

  let gstAmount, actualAmount, totalAmount;

  if (gstType === "exclusive") {
    gstAmount = (amount * rate) / 100;
    actualAmount = amount;
    totalAmount = amount + gstAmount;
  } else {
    gstAmount = (amount * rate) / (100 + rate);
    totalAmount = amount;
    actualAmount = amount - gstAmount;
  }

  document.getElementById("actualAmount").innerText =
    `₹${actualAmount.toFixed(2)}`;
  document.getElementById("gstAmount").innerText = `₹${gstAmount.toFixed(2)}`;
  document.getElementById("totalAmount").innerText =
    `₹${totalAmount.toFixed(2)}`;
}

// Load default page
loadPage("pages/gst.html");
