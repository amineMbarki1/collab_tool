declare module "*.svg?react" {
  import React from "react";

  // The imported React component for the SVG file
  const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGSVGElement>
  >;

  export default ReactComponent;
}
