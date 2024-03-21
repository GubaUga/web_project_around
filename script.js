const content = document.querySelector(".content");
const pageName = content.querySelector(".profile__info-name");
const pageDescription = content.querySelector(".profile__info-attribute");
const popup = document.querySelector(".popup");
const editButton = content.querySelector(".profile__info_edit_button");
const saveButton = document.querySelector(".popup__content-form-button");
const closeButton = document.querySelector(".popup__content-image");
const likeButtons = document.querySelectorAll(".pictures__card-like");

function showEditForm() {
  popup.classList.add("popup__opened");
}

function editInfo(evt) {
  evt.preventDefault();
  let newName = document.querySelector(".popup__content-form-name");
  let newDescription = document.querySelector(
    ".popup__content-form-description"
  );

  pageName.textContent = newName.value;
  pageDescription.textContent = newDescription.value;
}

function hideEditForm() {
  popup.classList.remove("popup__opened");
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
saveButton.addEventListener("click", (evt) => editInfo(evt));
closeButton.addEventListener("click", hideEditForm);
