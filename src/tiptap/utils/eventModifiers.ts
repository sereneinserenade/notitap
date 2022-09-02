export const stopPrevent = <T extends Event>(e: T): T => {
  (e as Event).stopPropagation();
  (e as Event).preventDefault();

  return e;
};
