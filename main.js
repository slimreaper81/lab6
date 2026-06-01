import dayjs from 'dayjs'
import './style.css'

const form = document.getElementById('birthdayForm')
const dialog = document.getElementById('resultDialog')
const closeBtn = document.getElementById('closeDialog')
const dialogText = document.getElementById('dialogText')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const inputVal = document.getElementById('birthday').value
  if (!inputVal) return

  const today = dayjs()
  const input = dayjs(inputVal)

  const daysPassed = today.diff(input, 'days')

  const isBirthdayToday =
    today.date() === input.date() &&
    today.month() === input.month()

  let birthdayThisYear = today
    .date(input.date())
    .month(input.month())
    .startOf('day')

  if (birthdayThisYear.isBefore(today.startOf('day'))) {
    birthdayThisYear = birthdayThisYear.add(1, 'year')
  }

  const weeksUntilBirthday = birthdayThisYear.diff(today.startOf('day'), 'week')

  let message = `Od Twojej daty urodzenia minęło <strong>${daysPassed}</strong> dni.`

  if (isBirthdayToday) {
    message += `<br><br>🎉 Wszystkiego najlepszego!`
  } else {
    if (weeksUntilBirthday === 0) {
      message += `<br><br>🎂 Masz urodziny w tym tygodniu!`
    } else {
      message += `<br><br>Do Twoich urodzin pozostało <strong>${weeksUntilBirthday}</strong> tygodni.`
    }
  }

  dialogText.innerHTML = message
  dialog.showModal()
})

closeBtn.addEventListener('click', () => {
  dialog.close()
})