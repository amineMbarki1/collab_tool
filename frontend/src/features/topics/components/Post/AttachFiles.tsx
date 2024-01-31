import { ArrowContainer, Popover } from "react-tiny-popover";
import { useRef, useState } from "react";

import { Button, IconButton } from "@/components/Button";
import AttachFilesIcon from "@/assets/icons/attach-icon.svg?react";
import { Card, CardBody, CardHeader } from "@/components/Card";
import FileIcon from "@/assets/icons/generic-file-icon.svg?react";
import CloseIcon from "@/assets/icons/icon-close.svg?react";
import Loader from "@/components/Loader/Loader";

export default function AttachFiles() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Popover
      ref={ref}
      positions={["top", "bottom", "left", "right"]}
      isOpen={isOpen}
      containerStyle={{ zIndex: "2" }}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          popoverRect={popoverRect}
          position={position}
          childRect={childRect}
          arrowSize={10}
          arrowColor="white"
        >
          <Card>
            <CardHeader>
              <h4>Files</h4>
              <IconButton
                onClick={() => {
                  setIsOpen(false);
                }}
                icon={<CloseIcon />}
              />
            </CardHeader>
            <label htmlFor="">
              <CardBody>
                <ul>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 200,
                    }}
                  >
                    <FileIcon />
                    <h5 style={{ marginRight: "auto" }}>Life.pdf(47kb)</h5>
                    <Loader color="primary" />
                    <IconButton icon={<CloseIcon height={20} />} />
                  </li>
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: 200,
                    }}
                  >
                    <FileIcon />
                    <h5 style={{ marginRight: "auto" }}>Life.pdf(47kb)</h5>
                    <IconButton icon={<CloseIcon height={20} />} />
                  </li>
                </ul>
              </CardBody>
            </label>
            <input type="file" multiple/>
          </Card>
        </ArrowContainer>
      )}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        iconLeft={<AttachFilesIcon />}
      />
    </Popover>
  );
}
