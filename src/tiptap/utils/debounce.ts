// Copyright (C) Jeet Ajaybhai Mandaliya - All Rights Reserved
// Unauthorized copying of this file or any file in notitap-pro(this project - https://github.com/notitap/notitap-pro), via any medium is strictly prohibited
// Proprietary and confidential
// Written by Jeet Ajaybhai Mandaliya <jeet.mandaliya7@gmail.com>, 17th July 2022

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<T extends Function>(func: T, wait: number) {
  let h: NodeJS.Timeout;

  const callable = (...args: any) => {
    clearTimeout(h);
    h = setTimeout(() => func(...args), wait);
  };

  return <T>(<any>callable);
}
