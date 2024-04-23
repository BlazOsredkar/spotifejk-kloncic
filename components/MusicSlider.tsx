// Import React
import React from "react";

// Import Radix Slider components
import * as RadixSlider from "@radix-ui/react-slider";

// Define the MusicSliderProps interface
interface MusicSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  duration?: number; // Add duration prop to calculate the seek position
  disabled?: boolean;
}

// Define the MusicSlider component
const MusicSlider: React.FC<MusicSliderProps> = ({
  value = 0,
  onChange,
  duration,
  disabled = false,
}) => {
  // Handle change in slider value
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  const handleDisabled = () => {
    return disabled;
  }

  // Handle click on the slider to seek
  const handleSliderClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!duration) return;
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const percentage = offsetX / boundingRect.width;
    const newPosition = duration * percentage;
    // Update the seek position without skipping the song
    onChange?.(newPosition);
  };


  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      max={duration || 1} // Use duration as max value if available
      step={0.01}
      aria-label="Music Progress"
      onClick={handleSliderClick} // Handle click event
      disabled={handleDisabled()}
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="bg-white absolute rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

// Export the MusicSlider component
export default MusicSlider;
