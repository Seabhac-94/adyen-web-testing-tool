const icon = document.getElementById('infoIcon')
const infoPara = document.getElementById('infoPara')

icon.addEventListener('click', function () {

	infoPara.classList.toggle('hiddenForm')
	icon.classList.toggle('fa-angle-double-right')
	icon.classList.toggle('fa-angle-double-down')

})