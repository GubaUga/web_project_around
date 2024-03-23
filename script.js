const content = document.querySelector(".content");
const pageName = content.querySelector(".profile__info-name");
const pageDescription = content.querySelector(".profile__info-attribute");
const popup = document.querySelector(".popup");
const editButton = content.querySelector(".profile__info-edit-button");
const saveButton = document.querySelector(".popup__content-form-button");
const closeButton = document.querySelector(".popup__content-image");
const likeButtons = document.querySelectorAll(".pictures__card-like");

function showEditForm() {
  popup.classList.add("popup__opened");
  closeButton.addEventListener("click", hideEditForm);
  saveButton.addEventListener("click", (evt) => editInfo(evt));
}

function editInfo(evt) {
  evt.preventDefault();
  const newName = document.querySelector(".popup__content-form-name");
  const newDescription = document.querySelector(
    ".popup__content-form-description"
  );

  if (newName.value === "" || newName.value === null) {
    evt.preventDefault;
  } else {
    pageName.textContent = newName.value;
    pageDescription.textContent = newDescription.value;
    hideEditForm();
  }
}

function hideEditForm() {
  popup.classList.remove("popup__opened");
  closeButton.removeEventListener("click", hideEditForm);
  saveButton.removeEventListener("click", (evt) => editInfo(evt));
}

function giveLike(evt) {
  const heart = evt.target;

  if (heart.getAttribute("src") === "./images/Like.png") {
    return heart.setAttribute("src", "./images/FilledHeart.png");
  }
  return heart.setAttribute("src", "./images/Like.png");
}

likeButtons.forEach((likeButton) =>
  likeButton.addEventListener("click", (evt) => giveLike(evt))
);
editButton.addEventListener("click", showEditForm);
