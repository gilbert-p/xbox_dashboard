

const total_animation_duration = 500;

// export function transitionBlade() {
//     return new Promise((resolve) =>
//       setTimeout(() => resolve(), total_animation_duration)
//     );
//   }
export const useTransitionBlade = () => {


  return async (dispatch) => {
    dispatch({ type: 'BLADE_TRANSITION_START' });
    await new Promise((resolve) =>
      setTimeout(() => resolve(), total_animation_duration)
    );

    dispatch({ type: 'BLADE_TRANSITION_END' });

  };
};