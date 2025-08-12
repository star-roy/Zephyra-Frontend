import { useState, useEffect } from "react";

export default function useGridColumnCount() {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    function updateColumns() {
      if (window.innerWidth >= 1280) { // xl
        setColumns(3);
      }
      else if (window.innerWidth >= 1024) { // lg
        setColumns(3);
      } else if (window.innerWidth >= 768) { // md
        setColumns(2);
      } else if (window.innerWidth >= 640) { // sm
        setColumns(2);
      } else {
        setColumns(1);
      }
    }
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}