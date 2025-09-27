document.addEventListener("DOMContentLoaded", () => {
  // Sections
  const welcomePage = document.getElementById("welcomePage");
  const homePage = document.getElementById("homePage");
  const profilePage = document.getElementById("profilePage");
  const textPage = document.getElementById("textPage");
  const encryptedPage = document.getElementById("encryptedPage");

  // Navigation
  document.getElementById("nextBtn").onclick = () => {
    welcomePage.style.display = "none";
    homePage.style.display = "block";
  };
  document.getElementById("profileBtn").onclick = () => {
    homePage.style.display = "none";
    profilePage.style.display = "block";
  };
  document.getElementById("textBtn").onclick = () => {
    homePage.style.display = "none";
    textPage.style.display = "block";
  };
  document.getElementById("encryptedBtn").onclick = () => {
    homePage.style.display = "none";
    encryptedPage.style.display = "block";
  };
  document.getElementById("homeBackBtn").onclick = () => {
    homePage.style.display = "none";
    welcomePage.style.display = "block";
  };
  document.getElementById("profileBackBtn").onclick = () => {
    profilePage.style.display = "none";
    homePage.style.display = "block";
  };
  document.getElementById("textBackBtn").onclick = () => {
    textPage.style.display = "none";
    homePage.style.display = "block";
  };
  document.getElementById("encryptedBackBtn").onclick = () => {
    encryptedPage.style.display = "none";
    homePage.style.display = "block";
  };

  /* ------------------ Profile QR Logic ------------------ */
  const profileForm = document.getElementById("profileForm");
  const about = document.getElementById("about");
  const aboutCounter = document.getElementById("aboutCounter");
  const qrcodeDiv = document.getElementById("qrcode");
  const downloadBtn = document.getElementById("downloadBtn");
  const profileError = document.getElementById("profileError");

  about.addEventListener("input", () => {
    aboutCounter.textContent = about.value.length;
  });

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileError.textContent = "";

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const aboutText = about.value.trim();

    if (!name && !phone && !email && !address && !aboutText) {
      profileError.textContent = "⚠ Please fill at least one field.";
      return;
    }

    let qrText = "";
    if (name) qrText += "Name: " + name + "\n";
    if (phone) qrText += "Phone: " + phone + "\n";
    if (email) qrText += "Email: " + email + "\n";
    if (address) qrText += "Address: " + address + "\n";
    if (aboutText) qrText += "About: " + aboutText;

    qrText = qrText.trim();

    try {
      qrcodeDiv.innerHTML = "";
      new QRCode(qrcodeDiv, {
        text: qrText,
        width: 250,
        height: 250,
        correctLevel: QRCode.CorrectLevel.L // Max capacity
      });
      downloadBtn.style.display = "inline-block";
    } catch (err) {
      profileError.textContent = "⚠ Data too large for QR code. Please shorten input.";
      qrcodeDiv.innerHTML = "";
      downloadBtn.style.display = "none";
    }
  });

  downloadBtn.addEventListener("click", () => {
    const canvas = qrcodeDiv.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "profile_qrcode.png";
      link.click();
    }
  });

  /* ------------------ Text QR Logic ------------------ */
  const textForm = document.getElementById("textForm");
  const textInput = document.getElementById("textInput");
  const textQRCode = document.getElementById("textQRCode");
  const textDownloadBtn = document.getElementById("textDownloadBtn");
  const textError = document.getElementById("textError");

  textForm.addEventListener("submit", (e) => {
    e.preventDefault();
    textError.textContent = "";

    const val = textInput.value.trim();
    if (!val) {
      textError.textContent = "⚠ Please enter some text.";
      return;
    }

    try {
      textQRCode.innerHTML = "";
      new QRCode(textQRCode, {
        text: val,
        width: 250,
        height: 250,
        correctLevel: QRCode.CorrectLevel.L
      });
      textDownloadBtn.style.display = "inline-block";
    } catch (err) {
      textError.textContent = "⚠ Data too large for QR code. Please shorten input.";
      textQRCode.innerHTML = "";
      textDownloadBtn.style.display = "none";
    }
  });

  textDownloadBtn.addEventListener("click", () => {
    const canvas = textQRCode.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "text_qrcode.png";
      link.click();
    }
  });
});
