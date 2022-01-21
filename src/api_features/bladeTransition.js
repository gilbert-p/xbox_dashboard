const total_animation_duration = 900;

export function transitionBlade() {
    return new Promise((resolve) =>
      setTimeout(() => resolve(), total_animation_duration)
    );
  }
  