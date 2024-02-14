const passwordSpecialChars = `\\?@#$%^\`<>&+="!ºª·#~%&'¿¡€,:;*/+-.=_{}\\(\\)\\[\\]`
const passwordMinLength = 8
export const securePasswordRegex = `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[${passwordSpecialChars}])(?=\\S+$).{${passwordMinLength},}$`