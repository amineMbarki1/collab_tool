import { useEffect, useState } from "react";

export default function (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (isEnabled) document.documentElement.dataset.theme = "dark";
    else document.documentElement.dataset.theme = "";
  }, [isEnabled]);

  return [isEnabled, setIsEnabled];
}



