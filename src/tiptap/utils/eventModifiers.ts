// Copyright (C) Jeet Ajaybhai Mandaliya - All Rights Reserved
// Unauthorized copying of this file or any file in notitap-pro(this project - https://github.com/notitap/notitap-pro), via any medium is strictly prohibited
// Proprietary and confidential
// Written by Jeet Ajaybhai Mandaliya <jeet.mandaliya7@gmail.com>, 17th July 2022

export const stopPrevent = <T extends Event>(e: T): T => {
  (e as Event).stopPropagation();
  (e as Event).preventDefault();

  return e;
};
