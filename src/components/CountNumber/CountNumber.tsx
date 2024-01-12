import { FC, useEffect, useState } from "react";

type Props = {
  endvalue: number;
  duration: number;
};
const CountNumber: FC<Props> = ({ endvalue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        setCount(Math.min(endvalue, (progress / duration) * endvalue));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(endvalue);
      }
    };
    animationFrameId = requestAnimationFrame(updateCount);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [endvalue, duration]);

  return (
    <>
      <p className="md:font-bold font-medium text-lg xl:text-5xl">
        {Math.round(count)}
      </p>
    </>
  );
};

export default CountNumber;
