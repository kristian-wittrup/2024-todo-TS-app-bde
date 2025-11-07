// colorPicker.ts
export const changeBackgroundColor = (color: string): void => {
    document.body.style.backgroundColor = color;
  };
  
  export const initializeColorPicker = (): void => {
    const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    if (!colorPicker) return;
  
    colorPicker.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  };
  