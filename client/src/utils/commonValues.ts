export const apiUrl = 'http://kyoungwoo.iptime.org:5000/api/v1/';
export const execUrl = 'http://kyoungwoo.iptime.org:5000/exec/';
export const fileUrl = 'http://kyoungwoo.iptime.org:5000/fdata/'

// 현재 버전
export const updateVersion = 'v1.0.0';

// export class Option {

//   static isSaas = 0;

//   static isGs = 0;

//   static isJapan = 0;

//   static isEdu = 0;

//   static isDeclare = 0;

//   static isEng = 1;
  
//   static isKNBank = 0;

//   static changeSaas = (saasValue: number) => {
//     Option.isSaas = saasValue;
//   };

//   static changeGS = (gsValue: number) => {
//     Option.isGs = gsValue;
//   };

//   static changeJapan = (value: number) => {
//     Option.isJapan = value;

//     if (value === 1) {
//       // ie에서 .jp로 접속 시 ja class 안들어가는 문제
//       if (localStorage.getItem('language') === 'ko') {
//         window.location.reload();
//         localStorage.setItem('language', 'ja');
//         document.body.classList.toggle('ja', true);
//       }
//     }
//   };

//   static changeEdu = (value: number) => {
//     Option.isEdu = value;
//   };

//   static changeDeclare = (value: number) => {
//     Option.isDeclare = value;
//   };

// }
