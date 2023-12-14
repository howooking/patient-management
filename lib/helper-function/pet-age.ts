export default function calculateAge(inputDate: string) {
  const birthDate = new Date(inputDate);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - birthDate.getTime();
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let months = currentDate.getMonth() - birthDate.getMonth();
  const years = currentDate.getFullYear() - birthDate.getFullYear();

  if (days < 30) {
    return `${days}일`;
  }

  if (currentDate.getDate() < birthDate.getDate()) {
    months--;
  }

  months += months < 0 ? 12 : 0;

  const ageString = `${years}년${months > 0 ? ` ${months}개월` : ""}`;

  return ageString;
}
