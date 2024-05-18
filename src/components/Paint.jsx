import { useState, useCallback } from "react";
import useEyeDropper from "use-eye-dropper";
import EyeDropperImg from "../images/eye-dropper.svg";

const Paint = ({className, handleClose}) => {
  const { open, close, isSupported } = useEyeDropper();
  const [color, setColor] = useState("#fff");
  const pickColor = useCallback(() => {
    const openPicker = async () => {
      try {
        const color = await open();
        setColor(color.sRGBHex);
        handleClose(color.sRGBHex)
      } catch (e) {
        console.log(e);
        if (!e.canceled) setError(e);
      }
    };
    openPicker();
  }, [open]);
  return (
    <>
      {isSupported() ? (
        <div
          onClick={pickColor}
          className={className}
        >
          <img className="w-5 h-5" src={EyeDropperImg} alt="" />
        </div>
      ) : (
        ""
        
      )}
    </>
  );
};

export default Paint;
